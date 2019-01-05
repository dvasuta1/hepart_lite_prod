(function() {
    ga('create', 'UA-117936283-1', 'auto', 'hepart');
    ga('hepart.send', 'pageview');
    ga('hepart.set', 'checkProtocolTask', function() {});
    ga('hepart.require', 'displayfeatures');

  function getLotId() {
    var url = window.location.href.replace(/\/$/, '');
    return parseInt(url.substr(url.lastIndexOf('/') + 1));
  }

function getStaticData(lotId) {
    return $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('X-XSRF-TOKEN', window.appInit.csrfToken);
        },
        processData: false,
        type: 'GET',
        url: 'https://www.copart.com/public/data/lotdetails/solr/' + lotId
    });
}
function getDynamicData(lotId) {
    return $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('X-XSRF-TOKEN', window.appInit.csrfToken);
        },
        processData: false,
        type: 'GET',
        url: 'https://www.copart.com/data/lotdetails/dynamic/' + lotId
    });
}
function getLotinfoById() {
    let lotId = getLotId();
    if (lotId && !Number.isNaN(lotId)) {
debugger;
        getStaticData(lotId)
            .then(data => {
              debugger;
                if (data && data.data.lotDetails) {
                    let theData = data.data.lotDetails;
                    if (typeof callback === "function") {
                        callback(theData);
                    }
                    return theData;
                }
            })
            .then(data => {
                getDynamicData(lotId)
                    .then((response) => {
                        debugger;

                        if (!response.data.lotDetails) {
                            return;
                        }
                        let resp = response.data.lotDetails;
                        let theData = {};
                        theData.awardedHighBid = resp.currentBid || 0;
                        theData.lotSold = resp.lotSold || false;
                        theData.cuc = data.cuc || 'USD';
                        insertTableRows(theData);
                    })
            });

    } else {
        throw new Error('Wrong lot id!');
    }
};

  function insertTableRows(data) {
    var sellerRow = document.querySelectorAll('[data-uname~="lotdetailSeller"]');
    var isSellerRowDataAvailable = sellerRow.length === 0 && data.std && data.snm;
    var isRepairCostDataAvailable = data.rc;
    var (function() {
    ga('create', 'UA-117936283-1', 'auto', 'hepart');
    ga('hepart.send', 'pageview');
    ga('hepart.set', 'checkProtocolTask', function() {});
    ga('hepart.require', 'displayfeatures');

  function getLotId() {
    var url = window.location.href.replace(/\/$/, '');
    return parseInt(url.substr(url.lastIndexOf('/') + 1));
  }

function getStaticData(lotId) {
    return $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('X-XSRF-TOKEN', window.appInit.csrfToken);
        },
        processData: false,
        type: 'GET',
        url: 'https://www.copart.com/public/data/lotdetails/solr/' + lotId
    });
}
function getDynamicData(lotId) {
    return $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('X-XSRF-TOKEN', window.appInit.csrfToken);
        },
        processData: false,
        type: 'GET',
        url: 'https://www.copart.com/data/lotdetails/dynamic/' + lotId
    });
}

/*
 function getLotinfoById() {
   var lotId = getLotId();
   if (lotId && !Number.isNaN(lotId)) {
     var getDynamicData = fetch("https://www.copart.com/public/data/lotdetails/dynamic/" + lotId);
     fetch("https://www.copart.com/public/data/lotdetails/solr/" + lotId)
       .then((response) => {
         return response.json();
       })
       .then((data) => {
         var theData = data.data.lotDetails;
         if (!theData.awardedHighBid) {
           getDynamicData.then((response) => {
             return response.json();
           }).then(function(resp) {
             theData.awardedHighBid = resp.data.lotDetails.currentBid ? resp.data.lotDetails.currentBid : 0;
             theData.lotSold = resp.data.lotDetails.lotSold || false;
             insertTableRows(theData);
           });
         } else {
           data && data.data.lotDetails && insertTableRows(data.data.lotDetails);
         }
       })
       .catch((error) => console.error(`Error: ${error}`));
   } else {
     throw new Error('Wrong lot id!');
   }
 }
*/
function getLotinfoById() {
    let lotId = getLotId();
    if (lotId && !Number.isNaN(lotId)) {
debugger;
        getStaticData(lotId)
            .then(data => {
              debugger;
                if (data && data.data.lotDetails) {
                    let theData = data.data.lotDetails;
                    if (typeof callback === "function") {
                        callback(theData);
                    }
                    return theData;
                }
            })
            .then(data => {
                getDynamicData(lotId)
                    .then((response) => {
                        debugger;

                        if (!response.data.lotDetails) {
                            return;
                        }
                        let resp = response.data.lotDetails;
                        let theData = {};
                        theData.awardedHighBid = resp.currentBid || 0;
                        theData.lotSold = resp.lotSold || false;
                        theData.cuc = data.cuc || 'USD';
                        insertTableRows(theData);
                    })
            });

    } else {
        throw new Error('Wrong lot id!');
    }
};

  function insertTableRows(data) {
    var sellerRow = document.querySelectorAll('[data-uname~="lotdetailSeller"]');
    var isSellerRowDataAvailable = sellerRow.length === 0 && data.std && data.snm;
    var isRepairCostDataAvailable = data.rc;
    var isFinalPriceDataAvailable = data.lotSold && data.awardedHighBid && data.awardedHighBid !== 0;

    var userLang = getCookie('userLang') || 'en';
    userLang = userLang === 'ru' ? 'ru' : 'en';

    if (isSellerRowDataAvailable) {
      removeEl('hepart_seller_type');
      removeEl('hepart_seller_name');
      var container = $(document.querySelectorAll('[data-uname~="lotdetailPrimarydamage"]'));
      container = container.parent().parent();
      var tmpl = `<div id='hepart_seller_type'><div class='details hepart_row'><label>${tranlations[userLang].hepart_seller_type}</label><span class='lot-details-desc col-md-6'>${data.std}</span></div></div>`;
      tmpl += `<div id='hepart_seller_name'><div class='details hepart_row'><label>${tranlations[userLang].hepart_seller_name}</label><span  class='lot-details-desc col-md-6'>${data.snm}</span></div></div>`;
      container.prepend($(tmpl));
      if (data.std.toLowerCase().includes('dealer') && !request.isSold) {
          if (request.auctionDate) {
            ga('hepart.send', 'event', 'lot', 'storeDealerLotWithTime', data.lotId + '_' + data.auctionDate);
          } else {
            ga('hepart.send', 'event', 'lot', 'storeDealerLot', data.lotId);
          }
        }
    }
    if (data.rc) {
      removeEl('hepart_repair_cost');
      var container = $(document.querySelectorAll('[data-uname~="lotdetailVin"]'));
      container = container.parent().parent();
      var tmpl = `<div id='hepart_repair_cost'><div class='details hepart_row'><label>${tranlations[userLang].hepart_repair_cost}</label><span class='lot-details-desc col-md-6'>${formatter.format(data.rc)} ${data.cuc}</span></div></div>`;
      container.prepend($(tmpl));
    }
    if (isFinalPriceDataAvailable) {
      removeEl('hepart_final_price');
      var container = $(document.querySelector('.disclaimer p')).parent(); 
      var tmpl = `<div id='hepart_final_price' class='sold hepart_final_price'>${tranlations[userLang].hepart_final_price} ${formatter.format(data.awardedHighBid)} ${data.cuc} </div>`;
      container.after($(tmpl));
    }
    if (!isSellerRowDataAvailable && !isRepairCostDataAvailable && !isFinalPriceDataAvailable && !data.ifs) {
      removeEl('hepart_no_data');
      var container = $(document.querySelector('.watch-btn'));
      var tmpl = `<span id='hepart_no_data'>${tranlations[userLang].hepart_no_data}</span>`;
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
    },

  };

  getLotinfoById();

})()
 = data.awardedHighBid && data.awardedHighBid !== 0;

    var userLang = getCookie('userLang') || 'en';
    userLang = userLang === 'ru' ? 'ru' : 'en';

    if (isSellerRowDataAvailable) {
      removeEl('hepart_seller_type');
      removeEl('hepart_seller_name');
      var container = $(document.querySelectorAll('[data-uname~="lotdetailPrimarydamage"]'));
      container = container.parent().parent();
      var tmpl = `<div id='hepart_seller_type'><div class='details hepart_row'><label>${tranlations[userLang].hepart_seller_type}</label><span class='lot-details-desc col-md-6'>${data.std}</span></div></div>`;
      tmpl += `<div id='hepart_seller_name'><div class='details hepart_row'><label>${tranlations[userLang].hepart_seller_name}</label><span  class='lot-details-desc col-md-6'>${data.snm}</span></div></div>`;
      container.prepend($(tmpl));
      if (data.std.toLowerCase().includes('dealer') && !request.isSold) {
          if (request.auctionDate) {
            ga('hepart.send', 'event', 'lot', 'storeDealerLotWithTime', data.lotId + '_' + data.auctionDate);
          } else {
            ga('hepart.send', 'event', 'lot', 'storeDealerLot', data.lotId);
          }
        }
    }
    if (data.rc) {
      removeEl('hepart_repair_cost');
      var container = $(document.querySelectorAll('[data-uname~="lotdetailVin"]'));
      container = container.parent().parent();
      var tmpl = `<div id='hepart_repair_cost'><div class='details hepart_row'><label>${tranlations[userLang].hepart_repair_cost}</label><span class='lot-details-desc col-md-6'>${formatter.format(data.rc)} ${data.cuc}</span></div></div>`;
      container.prepend($(tmpl));
    }
    if (isFinalPriceDataAvailable) {
      removeEl('hepart_final_price');
      var container = $(document.querySelector('.disclaimer p')).parent(); 
      var tmpl = `<div id='hepart_final_price' class='sold hepart_final_price'>${tranlations[userLang].hepart_final_price} ${formatter.format(data.awardedHighBid)} ${data.cuc} </div>`;
      container.after($(tmpl));
    }
    if (!isSellerRowDataAvailable && !isRepairCostDataAvailable && !isFinalPriceDataAvailable && !data.ifs) {
      removeEl('hepart_no_data');
      var container = $(document.querySelector('.watch-btn'));
      var tmpl = `<span id='hepart_no_data'>${tranlations[userLang].hepart_no_data}</span>`;
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
    },

  };

  getLotinfoById();

})()
