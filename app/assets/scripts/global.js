'use strict';

var APP = window.APP = window.APP || {};

APP.global = (function(){

    var initGlobalComponents = function() {
        APP.navigation.init();
        // APP.footer.init();
    };

    var initPageComponents = function() {
        APP.core.controller.init();
    };

    var init = function() {

        var defaultVideoId = '0x0x0';
        var videoId = (window.getURLParameter('videoId')) ? window.getURLParameter('videoId') : defaultVideoId;

        APP.video.setVideoId(videoId);
        /**
        * initialize global components
        */
        initGlobalComponents();

        /**
        * initialize components for the current page
        */
        initPageComponents();
    };

    /**
    * interfaces to public functions
    */
    return {
        init: init
    };

}());

$( document ).ready( APP.global.init );
