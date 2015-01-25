'use strict';

var APP = window.APP = window.APP || {};

APP.global = (function(){

    var refresh = 200; //global refresh rate

    var splitVideoParams = function(str) {
        var vidStr = str.match(/^\w{2}_/);
        if(vidStr) {
            APP.video.setVideoService(vidStr[0].slice(0, -1)); //yt
            APP.video.setVideoId(str.substr(3, str.length )); //ytId
            //once I know the vidStr, talk to firebase
            APP.db.init();
        }
    };

    var easterEgg = function(){
        var kkeys = [];
        var bananas = "66,65,78,65,78,65,83";

        $(document).keydown(function(e) {
            if (!$(e.target).is('input, textarea')) {
                kkeys.push( e.keyCode );
                if ( kkeys.toString().indexOf( bananas ) >= 0 ){
                    $(document).unbind('keydown');
                    window.location = '?v=yt_nBJV56WUDng';
                }
            }
        });

    };

    var getRefresh = function() {
        return refresh;
    };

    var initGlobalComponents = function() {
        APP.user.init();
        APP.video.init();
        APP.sentiment.init();
        APP.related.init();
        APP.notification.init();
        APP.modal.init();
    };

    var initPageComponents = function() {
        APP.core.controller.init();
    };

    var init = function() {

        var defaultVideoId = 'yt_VWf8CXwPoqI';
        splitVideoParams( (window.getURLParameter('v')) ? window.getURLParameter('v') : defaultVideoId );

        initGlobalComponents();

        initPageComponents();

        easterEgg();

        if (APP.notification.checkIfRead('explainer') === -1) {
            var notificaitonHtml = $(document.createElement('p')).text('Watch, vote, and comment on videos; see reactions and voting come in as if it were a live event, even though it\'s not.');
            APP.notification.createNotification('explainer', notificaitonHtml);
        }
    };

    return {
        init: init,
        getRefresh: getRefresh
    };

}());

$( document ).ready( APP.global.init );
