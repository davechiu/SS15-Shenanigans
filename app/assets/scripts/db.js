/* global Firebase */

'use strict';

var APP = window.APP = window.APP || {};

APP.db = (function(){
    var fbref = new Firebase('https://shenanigans.firebaseio.com/');
    var userRef = new Firebase('https://shenanigans.firebaseio.com/users');
    var mediaRef = new Firebase('https://shenanigans.firebaseio.com/media');

    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };

    var init = function() {
        APP.fbref.set({
            media: {
                id: 'asdf'
            },
            users: {
                id: 'one'
            },
        }, onComplete);
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
