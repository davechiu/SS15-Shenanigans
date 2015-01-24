/* global Firebase */
'use strict';

var APP = window.APP = window.APP || {};

APP.comments = (function(){
    var videoId;
    var commentRef = new Firebase(APP.db.getFbBase() + '/comments');

    var setup = function(){
        // get or create video record on FB
        commentRef.once('value', function(snapshot){
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

    var initPostForm = function(){
        $('input#posting-as').val(APP.user.getName());
        $('form.comment-form').on('submit', function(e){
            e.preventDefault();

            console.log('submit comment');
            // DO COMMENT SUBMISSION
        });

        $('input#posting-as').on('change', function(){
            APP.user.setName($('input#posting-as').val());
        });

        // $('label[for="posting-as"]').animate({'margin-left': -1 * $('label[for="posting-as"]').width()});
    };

    var init = function() {
        console.log('APP.comments');
        bindEventsToUI();
        getVideoId();
        setup();
        setName();
        initPostForm();

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
