setTimeout(function() {
    document.dispatchEvent(new CustomEvent('GLOBAL_DATA', {
        detail: window.appInit
    }));
}, 0);
