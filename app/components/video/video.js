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

        initYouTube();
    };

    var initYouTube = function(){
        console.log(defaultVideoId);

        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        //window.player;

        window.onYouTubeIframeAPIReady = function() {
            window.player = new window.YT.Player('player', {
                height: '390',
                width: '640',
                videoId: 'M7lc1UVf-VE',
                events: {
                    'onReady': window.onPlayerReady,
                    'onStateChange': window.onPlayerStateChange
                }
            });
        };

        // 4. The API will call this function when the video player is ready.
        window.onPlayerReady = function(event) {
            event.target.playVideo();
        };

        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;
        window.onPlayerStateChange = function(event) {
            if (event.data === window.YT.PlayerState.PLAYING && !done) {
                setTimeout(window.stopVideo, 6000);
                done = true;
            }
        };
        window.stopVideo = function() {
            window.player.stopVideo();
        };
    }

    /**
     * interfaces to public functions
     */
    return {
        init: init,
        setVideoId: setVideoId,
        getVideoId: getVideoId
    };

}());
