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
        $('a.mobileSubmit').on('click',function(e){
            e.preventDefault();
            // submit button for mobile, this is not the input[type=submit] becuase we want a nice icon, can't do ::before in an input.
            $('form#postcomment').trigger('submit');
            $('input#post-comment').focus();
        });

        $('input#posting-as').on('change', function(){
            APP.user.setName($('input#posting-as').val());
            console.log('name changed');
            window.ga('send', 'event', 'comment', 'name change');
        });

        // $('label[for="posting-as"]').animate({'margin-left': -1 * $('label[for="posting-as"]').width()});
    };

    var loadFeed = function(){
        var commentFeedRef = new Firebase(APP.db.getFbBase() + '/comments/'+videoId);
        // 1. load all comments
        commentFeedRef.on('child_added', function(allCommentsSnapshot) {
            // 2. handle each comment individually
            allCommentsSnapshot.forEach(function(commentSnapshot) {
                // 3. extract values from children
                var key = commentSnapshot.key();
                var val = commentSnapshot.val();
                /*
                console.log(key+': ');
                console.log('load comment: '+val.comment);
                console.log('load time: '+val.time);
                console.log('load dt: '+val.dt);
                */

                if(val.comment !== undefined && val.comment !== '' && val.comment !== null){
                    var li = '<li class="comment new" data-cuid="'+key+'" data-time="'+val.time+'" data-dt="'+val.dt+'"><div class="wrapper"><div class="byline">'+val.name+' @'+window.millisecToSec(val.time)+'sec</div><div class="comment">'+val.comment+'</div></div></li>';

                    $('.comment-feed ul').prepend(li);
                    setTimeout(function(){
                        $('.comment-feed ul li.new').removeClass('new');
                    }, 150);
                }
            });
        });
    };

    var getCommentObj = function(interval, comment) {
        var dataObj = {};
        var getID = APP.user.getUUID();
        var getName = APP.user.getName();
        dataObj = {
            uuid: getID,
            name: getName,
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
        window.ga('send', 'event', 'comment', 'post');
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
