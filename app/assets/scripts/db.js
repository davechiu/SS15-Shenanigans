/* global Firebase */

'use strict';

var APP = window.APP = window.APP || {};

APP.db = (function(){
    var fbRef = new Firebase('https://shenanigans.firebaseio.com/');
    var userRef = new Firebase('https://shenanigans.firebaseio.com/users');
    var mediaRef = new Firebase('https://shenanigans.firebaseio.com/media');

    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };
    
    var set = function(ref, value) {
        ref.set({
            media: {
                id: value
            }
        }, onComplete);
    };

    var init = function() {
        // basic connection proven
        set(fbRef, 'newtest');

        // WORK IN PROGRESS 
        /* 
        building a test query... wip
        var query = {
            APP.video.getVideoId
        } ;
        set(mediaRef, );
        */

    };

    /**
    * interfaces to public functions
    */
    return {
        init: init,
        userRef: userRef,
        mediaRef: mediaRef
    };

}());
