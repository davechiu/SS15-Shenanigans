/* global Firebase */

'use strict';

var APP = window.APP = window.APP || {};

APP.sentiment = (function(){

    var newDataObj = {};
    var tempVoteValue;
    var videosRef = new Firebase(APP.db.getFbBase() + '/videos');

    var getNewDataObj = function() {
        var vidId = APP.video.getVideoId();
        newDataObj[vidId] = {votes: null};
        return newDataObj;
    };

    var getIntervalObj = function(interval, vote) {
        var dataObj = {};
        dataObj[interval] = {
            value: vote,
            // uid: userID,
            time: interval,
            dt: (new Date()).getTime()
        };
        return dataObj;
    };

    //triggered from $.subscribe vote event
    var postVote = function(event, value) {
        var refVoteUrl = APP.db.getFbBase() + '/videos/' + APP.video.getVideoId() + '/votes';
        var refVote = new Firebase(refVoteUrl);
        console.log(event, value);
        console.log(refVoteUrl);
        APP.db.update(refVote, getIntervalObj(1000, tempVoteValue));
        $.unsubscribe('/video/currentTime', postVote);
    };

    var bindVote = function(){
        $('.sentiment [data-value]').on('click', function(e){
            e.preventDefault();
            tempVoteValue = $(this).data('value');
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
