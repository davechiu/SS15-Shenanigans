'use strict';

var APP = window.APP = window.APP || {};

APP.related = (function(){

    var markVideoAsPlaying = function($item){
        $item.addClass('playing');
        $item.find('a').removeAttr('href');
    };
    var init = function() {
        console.log('APP.related');

        markVideoAsPlaying($('.related ul li:first-child'));
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
