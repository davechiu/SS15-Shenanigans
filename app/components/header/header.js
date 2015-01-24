'use strict';

var APP = window.APP = window.APP || {};

APP.header = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.header');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
