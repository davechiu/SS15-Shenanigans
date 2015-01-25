'use strict';

var APP = window.APP = window.APP || {};

APP.error = (function(){

    var bindEventsToUI = function() {
        // ...
    };

    var init = function() {
        console.log('APP.error');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());