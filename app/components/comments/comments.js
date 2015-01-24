'use strict';

var APP = window.APP = window.APP || {};

APP.comments = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.comments');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
