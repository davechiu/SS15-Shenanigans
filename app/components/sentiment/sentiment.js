'use strict';

var APP = window.APP = window.APP || {};

APP.sentiment = (function(){


    var newDataObj = {};

    var getNewDataObj = function() {
        var vidId = APP.video.getVideoId();
        newDataObj[vidId] = {votes: null};
        return newDataObj;
    };

    var getIntervalObj = function(interval, vote) {
        var dataObj = {};
        dataObj[interval] = vote;
        return dataObj;
    };

    //
    // template
    var voteObj = {
        value: 0,
        rT: 0, //relativeTime,
        eT: (new Date()).getTime() //epochTime
    };

    //triggered from $.subscribe vote event
    var postVote = function(event, value) {
        console.log(event, value);
        //SEND THIS VOTE OFF TO FIREBASE
        $.unsubscribe('/video/currentTime', postVote);
    };

    var bindVote = function(){
        $('.sentiment [data-value]').on('click', function(e){
            e.preventDefault();
            $.subscribe('/video/currentTime', APP.sentiment.postVote);
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
        init: init,
        getNewDataObj: getNewDataObj,
        getIntervalObj: getIntervalObj,
        postVote: postVote
    };

}());
