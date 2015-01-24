'use strict';

var APP = window.APP = window.APP || {};

APP.commentFeed = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.commentFeed');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
