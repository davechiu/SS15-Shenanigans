'use strict';

var APP = window.APP = window.APP || {};

APP.sentiment = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.sentiment');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
