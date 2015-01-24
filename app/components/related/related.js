'use strict';

var APP = window.APP = window.APP || {};

APP.related = (function(){

    var markVideoAsPlaying = function($item){
        $item.addClass('playing');
        $item.find('a').removeAttr('href');
    };
    var init = function() {
        console.log('APP.related');

        $('.related ul li a').each(function(){
            if($(this).data('videoid') === APP.video.getVideoId()) {
                markVideoAsPlaying($(this).parent());
            }
        });
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
