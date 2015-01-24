/* global Firebase */
'use strict';

var APP = window.APP = window.APP || {};

APP.comments = (function(){
    var videoId;
    var commentRef = new Firebase(APP.db.getFbBase() + '/comments');

    var setup = function(){
        // get or create video record on FB
        commentRef.once('value', function(snapshot){
            window.alert('videoId: '+videoId);
            var exists = snapshot.child(videoId).exists();
            if(exists) {
                // store the entire object in the APP.db name
                APP.db.setDataObj(exists);
            } else {
                // create a new empty data structure based on new video Id
                var vidId = APP.video.getVideoId();
                var dataObj = {};
                var intervalObj = APP.sentiment.getIntervalObj(0,0);
                dataObj[vidId] = {'comments': intervalObj};
                APP.db.set(commentRef, dataObj);
            }
        });
    };


    var bindEventsToUI = function() {
        var test;
    };
    var setName = function() {
        if(APP.user.getName()){
            $('.post__wrapper').attr('data-name', APP.user.getName()+' says:');
        }else{
            console.log('Error getting username');
        }
    };

    var getVideoId = function() {
        setVideoId(APP.video.getVideoId());
    };

    var setVideoId = function(getVideoId) {
        videoId = getVideoId;
    };

    var init = function() {
        console.log('APP.comments');
        bindEventsToUI();
        getVideoId();
        setup();
        setName();

    };

    /**
     * interfaces to public functions
     */
    return {
        init: init,
        setup: setup,
        setName: setName
    };

}());
