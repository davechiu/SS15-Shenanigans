'use strict';

var APP = window.APP = window.APP || {};

APP.postComment = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.postComment');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
