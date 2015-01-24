'use strict';

var APP = window.APP = window.APP || {};

APP.video = (function(){
    var videoId;
    var videoService;
    var videoRatio = 390/640;

    var initYouTube = function(){

        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        //window.player;

        var videoWidth = $('.content .video').width();
        var videoHeight = $('.content .video').width() * videoRatio;

        window.onYouTubeIframeAPIReady = function() {
            window.player = new window.YT.Player('player', {
                height: videoHeight,
                width: videoWidth,
                videoId: APP.video.getVideoId(),
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
        window.onPlayerStateChange = function(event) {

            if (event.data === window.YT.PlayerState.PLAYING) {
                window.refreshIntervalId = setInterval(function () {
                    var duration = window.player.getDuration();
                    var currentTime = window.player.getCurrentTime();
                    //console.log(current_time);
                    $.publish("/video/currentTime", window.secToMillisec(currentTime));
                }, 500);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                clearInterval(window.refreshIntervalId);
            }
        };
        window.stopVideo = function() {
            window.player.stopVideo();
        };

        $(window).on('resize', function(){
            APP.video.resizeVideo($('.content .card .video iframe'));
        });
    };

    var resizeVideo = function($video) {
        var videoWidth = $('.content .video').width();
        var videoHeight = $('.content .video').width() * videoRatio;

        $video.css({
            height: videoHeight,
            width: videoWidth
        });
    };

    var getVideoId = function( ){
        return videoId;
    };

    var setVideoId = function(id) {
        videoId = id;
    };

    var getVideoService = function(){
        return videoService;
    };

    var setVideoService = function(str) {
        videoService = str;
    };

    var getVideoRatio = function() {
        return videoRatio;
    };

    var setVideoRatio = function(float) {
        videoRatio = float;
    };

    var init = function() {
        console.log('APP.video');

        if(videoService === 'yt') {
            //initYouTube();
        }
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init,
        setVideoId: setVideoId,
        getVideoId: getVideoId,
        setVideoService: setVideoService,
        getVideoService: getVideoService,
        resizeVideo: resizeVideo
    };

}());
