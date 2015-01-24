/* global Firebase */
'use strict';

var APP = window.APP = window.APP || {};

APP.comments = (function(){
    var videoId,
        tempCommentValue,
        tempNameValue,
        commentRef = new Firebase(APP.db.getFbBase() + '/comments');

    var setup = function(){
        // get or create video record on FB
        commentRef.once('value', function(snapshot){
            var exists = snapshot.child(videoId).exists();
            if(exists) {
                APP.db.setDataObj(exists);
            } else {
                var commentObj = APP.sentiment.getVoteObj(0, 0);
                var commentVideoRef = new Firebase(APP.db.getFbBase() + '/comments/' + videoId + '/0');
                APP.db.push(commentVideoRef, commentObj);
            }
            loadFeed();
        });
    };

    var bindEventsToUI = function() {
        //...
        clearComment();
    };

    var clearComment = function() {
        $('#post-comment').val('');
    };

    var initPostForm = function(){
        if(APP.user.getName() !== null && APP.user.getName().length) {
            $('input#posting-as').val(APP.user.getName());
        }
        $('form.comment-form').on('submit', function(e){
            e.preventDefault();

            console.log('submit comment');
            // DO COMMENT SUBMISSION
        });

        $('input#posting-as').on('change', function(){
            APP.user.setName($('input#posting-as').val());
            console.log('name changed');
        });

        // $('label[for="posting-as"]').animate({'margin-left': -1 * $('label[for="posting-as"]').width()});
    };

    var loadFeed = function(){
        commentRef.once('value', function(allMessagesSnapshot) {
            allMessagesSnapshot.forEach(function(messageSnapshot) {
                // Will be called with a messageSnapshot for each message under message_list.
                var userId = messageSnapshot.child('user_id').val();
                var text = messageSnapshot.child('text').val();
                // Do something with message.

            });
        });
    };

    var getCommentObj = function(interval, comment) {
        var dataObj = {};
        dataObj = {
            // uid: userID,
            comment: comment,
            time: interval,
            dt: (new Date()).getTime()
        };
        return dataObj;
    };

    //triggered from $.subscribe vote event
    var postComment = function(event, value) {
        var interval = value;
        var commentRefUrl = APP.db.getFbBase() + '/comments/' + videoId + '/' + interval;
        var refComment = new Firebase(commentRefUrl);
        //just track the sum?
        $.unsubscribe('/video/currentTime', postComment);
        // push and clear
        APP.db.push(refComment, getCommentObj(interval, tempCommentValue));
        clearComment();
    };

    var bindComment = function(){
        $('form#postcomment').submit(function(event){
            event.preventDefault();
            tempCommentValue = $('#post-comment').val();
            $.subscribe('/video/currentTime', APP.comments.postComment);
        });

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
        bindComment();
        initPostForm();

    };

    /**
     * interfaces to public functions
     */
    return {
        init: init,
        setup: setup,
        postComment: postComment
    };

}());
