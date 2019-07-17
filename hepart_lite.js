(function() {
  try {
    ga('create', 'UA-117936283-1', 'auto', 'hepart');
    ga('hepart.send', 'pageview');
    ga('hepart.set', 'checkProtocolTask', function() {});
    ga('hepart.require', 'displayfeatures');
  } catch (err) {}

  var siteUrl = window.location.origin;

  function getLotId() {
    var url = window.location.href.replace(/\/$/, '');
    return parseInt(url.substr(url.lastIndexOf('/') + 1));
  }

  function getStaticData(lotId) {
    return $.ajax({
      contentType: 'application/json',
      dataType: 'json',
      beforeSend: function(request) {
        request.setRequestHeader('X-XSRF-TOKEN', window.appInit.csrfToken);
      },
      processData: false,
      type: 'GET',
      url: `${siteUrl}/public/data/lotdetails/solr/` + lotId
    });
  }

  function getSearchData(params) {
    if (params.vin.includes('*')) {
      params.vin = params.vin.substring(0, 11)
    }
    var ps_vin_number = "ps_vin_number:" + params.vin;
    var reqData = {
      filter: {
        MISC: [ps_vin_number]
      },
      size: 2000
    };

    return fetch(`${siteUrl}/public/lots/number/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(reqData)
    })
  }

  function getDuplicatesByVin(params) {
    if (params.vin) {
      getSearchData(params)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var theData = data.data.results.content;
          if (data.data && theData.length != 0) {
            console.log(theData.length);
            var theLot = _.findWhere(theData, {
              lu: params.lu,
              ln: params.lotId
            });
            if (theLot && theLot.fv) {
              let sellerTypeRow = document.querySelectorAll('[data-uname~="lotdetailSeller"]');
              var isSellerTypeRowDataNeeded = sellerTypeRow.length === 0 && (theLot.snm || theLot.scn);
              var sellerName = theLot.snm || theLot.scn;
              var userLang = getCookie('userLang') || 'en';

              var ifInLangList = ['ru', 'en'].includes(userLang);
              userLang = ifInLangList ? userLang : 'en';

              if (isSellerTypeRowDataNeeded) {
                let container = $(document.querySelectorAll('[data-uname~="lotdetailPrimarydamage"]'));
                container = container.parent().parent();
                let tmpl = `<div id='hepart_seller_name'><div class='details hepart_row'><label>${tranlations[userLang].hepart_seller_name}</label><span  class='lot-details-desc col-md-6'>${sellerName}</span></div></div>`;
                container.prepend($(tmpl));
              }

              if (theLot.std) {
                let container = $(document.querySelectorAll('[data-uname~="lotdetailPrimarydamage"]'));
                container = container.parent().parent();
                let tmpl = `<div id='hepart_seller_type'><div class='details hepart_row'><label>${tranlations[userLang].hepart_seller_type}</label><span class='lot-details-desc col-md-6'>${theLot.std}</span></div></div>`;
                container.prepend($(tmpl));
              }

            }

            if (!theLot.lotNumberStr) return;

            (theLot.ess.toLowerCase() == 'sold') && getSoldLotData(theLot.lotNumberStr)
              .then(response => {
                if (response && response.price && response.price !== 0) {
                  var container = $(document.querySelector('.disclaimer p')).parent();
                  let tmpl = `<div id='hepart_final_price' class='sold hepart_final_price'>${tranlations[userLang].hepart_final_price} ${response.price} </div>`;
                  container.after($(tmpl));
                }
              });
          }
        })
        .catch((error) => console.error(`Error: ${error}`));
    } else {
      throw new Error('Wrong vin!');
    }
  }

  function getLotinfoById() {
    let lotId = getLotId();
    if (lotId && !Number.isNaN(lotId)) {
      getStaticData(lotId)
        .then(data => {
          if (data && data.data.lotDetails) {
            let theData = data.data.lotDetails;
            return theData;
          } else {
            return {};
          }
        })
        .then(data => {
          getDuplicatesByVin({
            vin: data.fv,
            lotId: lotId,
            lu: data.lu
          });
          insertTableRows(data);
        });

    } else {
      throw new Error('Wrong lot id!');
    }
  }

  function getSoldLotData(id) {
    return $.ajax({
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      type: 'GET',
      url: 'https://dataminer-71b3c.firebaseapp.com/price/' + id
    });
  }

  function insertTableRows(data) {
    var sellerRow = document.querySelectorAll('[data-uname~="lotdetailSeller"]');
    var isSellerRowDataAvailable = sellerRow.length === 0 && (data.snm || data.scn);

    var isRepairCostDataAvailable = data.rc;
    var isFinalPriceDataAvailable = data.lotSold && data.awardedHighBid && data.awardedHighBid !== 0;

    var userLang = getCookie('userLang') || 'en';
    var ifInLangList = ['ru', 'en'].includes(userLang);
    userLang = ifInLangList ? userLang : 'en';

    if (isSellerRowDataAvailable) {
      let sellerName = data.snm || data.scn;
      removeEl('hepart_seller_type');
      removeEl('hepart_seller_name');
      let container = $(document.querySelectorAll('[data-uname~="lotdetailPrimarydamage"]'));
      container = container.parent().parent();
      let tmpl = `<div id='hepart_seller_name'><div class='details hepart_row'><label>${tranlations[userLang].hepart_seller_name}</label><span  class='lot-details-desc col-md-6'>${sellerName}</span></div></div>`;
      container.prepend($(tmpl));
    }

    if (data.std) {
      let container = $(document.querySelectorAll('[data-uname~="lotdetailPrimarydamage"]'));
      container = container.parent().parent();
      let tmpl = `<div id='hepart_seller_type'><div class='details hepart_row'><label>${tranlations[userLang].hepart_seller_type}</label><span class='lot-details-desc col-md-6'>${data.std}</span></div></div>`;
      if (data.std.toLowerCase().includes('dealer') && !data.isSold) {
        if (data.auctionDate) {
          ga('hepart.send', 'event', 'lot', 'storeDealerLotWithTime', data.lotId + '_' + data.auctionDate);
        } else {
          ga('hepart.send', 'event', 'lot', 'storeDealerLot', data.lotId);
        }
      }
      container.prepend($(tmpl));
    }

    if (data.rc) {
      removeEl('hepart_repair_cost');
      var container = $(document.querySelectorAll('[data-uname~="lotdetailVin"]'));
      container = container.parent().parent();
      var tmpl = `<div id='hepart_repair_cost'><div class='details hepart_row'><label>${tranlations[userLang].hepart_repair_cost}</label><span class='lot-details-desc col-md-6'>${formatter.format(data.rc)} ${data.cuc}</span></div></div>`;
      container.prepend($(tmpl));
    }
    if (!isSellerRowDataAvailable && !isRepairCostDataAvailable && !isFinalPriceDataAvailable && !data.ifs) {
      removeEl('hepart_no_data');
      let container = $(document.querySelector('.watch-btn'));
      let tmpl = `<span id='hepart_no_data'>${tranlations[userLang].hepart_no_data}</span>`;
      container.before($(tmpl));
    }
  }

  function removeEl(id) {
    while (div = document.querySelector(id)) {
      div.parentNode.removeChild(div);
    }
  }

  function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  var tranlations = {
    ru: {
      hepart_no_data: 'Ничего нового',
      hepart_final_price: 'Продано за ',
      hepart_repair_cost: 'Оценочная стоимость ремонта:',
      hepart_seller_name: 'Продавец:',
      hepart_seller_type: 'Тип продавца:'
    },
    en: {
      hepart_no_data: 'No useful data available',
      hepart_final_price: 'Sold for ',
      hepart_repair_cost: 'Est. Repair Cost:',
      hepart_seller_name: 'Seller:',
      hepart_seller_type: 'Seller type:'
    }
  };

  getLotinfoById();

})()
