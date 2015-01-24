/* global Firebase */

'use strict';

var APP = window.APP = window.APP || {};

APP.db = (function(){
    var base = 'https://shenanigans.firebaseio.com/';
    // var base = 'https://shenanigans-kb.firebaseio.com/';
    var fbRef = new Firebase(base);
    var votesRef = new Firebase(base + '/votes');
    // var userRef = new Firebase(base + '/users');

    // load / create, this will hold the big massive record on pageload: APP.db.getDataObj()
    var dataObj = {};

    var set = function(ref, value) {
        ref.set(value, onComplete);
    };

    var getBase = function() {
        return base;
    };

    var getDataObj = function() {
        return dataObj;
    };

    var setDataObj = function(obj) {
        dataObj = obj;
    };

    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };

    var init = function() {

        //check to see if there is a new video - not pushing data yet.
        var vId = APP.video.getVideoId();
        fbRef.once('value', function(snapshot){
            var exists = snapshot.child(vId).exists();
            if(exists) {
                // store the entire object in the APP.db name
                setDataObj(exists);
            } else {
                // create a new empty data structure based on new video Id
                var vidId = APP.video.getVideoId();
                var dataObj = {};
                dataObj[vidId] = {};
                set(fbRef, dataObj);
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
        init: init,
        getBase: getBase,
        setDataObj: setDataObj,
        getDataObj: getDataObj,
        postVote: postVote,
        set: set
    };

}());
