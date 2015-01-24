'use strict';

var APP = window.APP = window.APP || {};

APP.global = (function(){

    var splitVideoParams = function(str) {
        var vidStr = str.match(/^\w{2}_/);
        if(vidStr) {
            APP.video.setVideoService(vidStr[0].replace('_','')); //yt
            APP.video.setVideoId(str.substr(3, str.length )); //
            console.log(str.substr(vidStr[0].length, str.length ));
        }
    };

    var initGlobalComponents = function() {
        // APP.navigation.init();
        // APP.footer.init();
        APP.video.init();
    };

    var initPageComponents = function() {
        APP.core.controller.init();
    };

    var init = function() {

        var defaultVideoId = 'yt_M7lc1UVf-VE';
        splitVideoParams( (window.getURLParameter('videoId')) ? window.getURLParameter('videoId') : defaultVideoId );
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
