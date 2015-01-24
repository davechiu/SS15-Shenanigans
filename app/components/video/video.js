'use strict';

var APP = window.APP = window.APP || {};

APP.video = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.video');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
