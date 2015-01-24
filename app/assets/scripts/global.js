'use strict';

var APP = window.APP = window.APP || {};

APP.global = (function(){

    var splitVideoParams = function(str) {
        var vidStr = str.match(/^\w{2}_/);
        if(vidStr) {
            APP.video.setVideoService(vidStr[0].slice(0, -1)); //yt
            APP.video.setVideoId(str.substr(3, str.length )); //
            APP.db.init();
            console.log(str.substr(vidStr[0].length, str.length ));
        }
        //once I know the vidStr, talk to firebase
    };

    var easterEgg = function(){
        var kkeys = [];
        var bananas = "66,65,78,65,78,65,83";

        $(document).keydown(function(e) {
            kkeys.push( e.keyCode );
            if ( kkeys.toString().indexOf( bananas ) >= 0 ){
                $(document).unbind('keydown');
                window.location = '?v=yt_nBJV56WUDng';
            }
        });

    };

    var initGlobalComponents = function() {
        // APP.navigation.init();
        // APP.footer.init();
        APP.video.init();
        APP.sentiment.init();
        // APP.db.init();
    };

    var initPageComponents = function() {
        APP.core.controller.init();
    };

    var init = function() {

        var defaultVideoId = 'yt_M7lc1UVf-VE';
        splitVideoParams( (window.getURLParameter('v')) ? window.getURLParameter('v') : defaultVideoId );
        /**
        * initialize global components
        */
        initGlobalComponents();

        /**
        * initialize components for the current page
        */
        initPageComponents();

        easterEgg();
    };

    /**
    * interfaces to public functions
    */
    return {
        init: init
    };

}());

$( document ).ready( APP.global.init );
