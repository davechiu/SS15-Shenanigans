'use strict';

var APP = window.APP = window.APP || {};

APP.related = (function(){

    var buildMarkup = function(){
        var featuredVideosArr = APP.db.getFeaturedVideosArr();
        var html = '';
        var playing = '';
        var href = '';
        $.each(featuredVideosArr, function(i, elem){
            href = '?v=yt_'+elem.videoId; //default

            if (elem.videoId === APP.video.getVideoId()) {
                // debugger;
                playing = 'class="playing"';
                href = '#';
            }
            html += '<li '+playing+' style="background-image: url(http://img.youtube.com/vi/'+elem.videoId+'/0.jpg);">';
            html += '<a href="'+href+'" data-videoid="'+elem.videoId+'">';
            html += '<i class="fa fa-youtube-play"></i>';
            html += '<div class="title">'+elem.title+'</div>';
            html += '<div class="source">'+elem.source+'</div></a>';
            html += '</li>';
            playing = '';
        });
        return html;
    };

    var renderRelated = function(){
        $('.related ul').html(buildMarkup());

        $('.related ul li a').on('click', function(){
            window.ga('send', 'event', 'related', 'click', $(this).data('videoid'));
        });
    };

    var init = function() {
        console.log('APP.related');

        renderRelated();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
