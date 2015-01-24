'use strict';

var APP = window.APP = window.APP || {};

APP.sentiment = (function(){

    var bindVote = function(){
        $('.sentiment [data-value]').on('click', function(){
            console.log('vote!');
            $.subscribe('/video/currentTime', APP.db.postVote);
        });
    };

    var init = function() {
        console.log('APP.sentiment');
        bindVote();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
