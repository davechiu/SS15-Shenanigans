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
        commentRef.child(videoId).once('value', function(snapshot){
            var exists = snapshot.exists();
            if(exists) {
                var commentsData = {};
                commentsData.comments = {};
                commentsData.comments[videoId] = snapshot.val();
                APP.db.setDataObj(commentsData);
            } else {
                var commentObj = getCommentObj(0, 0);
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
        var commentFeedRef = new Firebase(APP.db.getFbBase() + '/comments/'+videoId);
        // 1. load all comments
        commentFeedRef.once('value', function(allCommentsSnapshot) {
            // 2. handle each comment individually
            allCommentsSnapshot.forEach(function(commentSnapshot) {
                // 3. extrac values from children
                var comment = commentSnapshot.val();
                $.each(comment, function(uid,val){
                    if(val.comment !== undefined && val.comment !== '' && val.comment !== null){
                        // 4. do something with them
                        /*
                        console.log('this id: '+uid);
                        console.log('load comment: '+val.comment);
                        console.log('load time: '+val.time);
                        console.log('load dt: '+val.dt);
                        */
                        var li = '<li class="comment" data-uid="'+uid+'" data-time="'+val.time+'" data-dt="'+val.dt+'">'+val.comment+'</li>';
                        $('.comment-feed ul').prepend(li);
                    }
                });
            });
            watchFeedForUpdates();
        });
    };

    var watchFeedForUpdates = function() {
        var commentFeedRef = new Firebase(APP.db.getFbBase() + '/comments/'+videoId);
        // 1. watch for new comments
        commentFeedRef.on('child_changed', function(childSnapshot, prevChildName) {
            // code to handle new child.
            console.log('child has been added');
            //console.log('prev: '+prevChildName.val());
            //console.log('new: '+childSnapshot.val());
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
