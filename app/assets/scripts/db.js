/* global Firebase */

'use strict';

var APP = window.APP = window.APP || {};

APP.db = (function(){
    var base = 'https://shenanigans.firebaseio.com/';
    var fbRef = new Firebase(base);
    // var userRef = new Firebase(base + '/users');

    // load / create
    var dataObj = {};

    // template
    var voteObj = {
        value: 0,
        rT: 0, //relativeTime,
        eT: (new Date()).getTime() //epochTime
    };

    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };

    var set = function(ref, value) {
        ref.set(value, onComplete);
    };

    var getDataObj = function() {
        return dataObj;
    };

    var setDataObj = function(obj) {
        dataObj = obj;
    };

    var init = function() {

        var vId = APP.video.getVideoId();
        fbRef.once('value', function(snapshot){
            var exists = snapshot.child(vId).exists();

            if(exists) {
                // store the entire object in the APP.db name
            } else {
                // create a new empty data structure based on new video Id
            }

        });
        // basic connection proven
        // set(fbRef, data);

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
        init: init
    };

}());
