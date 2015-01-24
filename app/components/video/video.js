'use strict';

var APP = window.APP = window.APP || {};

APP.video = (function(){

    var videoId;

    var getVideoId = function(){
        return videoId;
    }

    var setVideoId = function(id) {
        videoId = id;
    };

    var init = function() {
        console.log('APP.video');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init,
        setVideoId: setVideoId,
        getVideoId: getVideoId
    };

}());
