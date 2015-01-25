/* global Firebase */

'use strict';

var APP = window.APP = window.APP || {};

APP.db = (function(){

    // var base = 'https://shenanigans.firebaseio.com';
    var base = 'https://shenanigans-kb.firebaseio.com';
    // var base = 'https://shenan-athon.firebaseio.com/';
    // var fbRef = new Firebase(base);
    // var votesRef = new Firebase(base + '/votes');
    // var userRef = new Firebase(base + '/users');

    // load / create, this will hold the big massive record on pageload: APP.db.getDataObj()
    var dataObj = {};

    var featuredVideos = [
        {
            "videoId": "VWf8CXwPoqI",
            "title": "PEOPLE ARE AWESOME 2014",
            "source": "People are Awesome",
            "sentiment": {
                "question": "Is this awesome?",
                "positive": "Wicked!",
                "negative": "Meh"
            }
        },
        {
            "videoId": "kxIGlMrrhQM",
            "title": "50 Common Misconceptions",
            "source": "mental_floss",
            "sentiment": {
                "question": "Did you know that?",
                "positive": "No, crazy!",
                "negative": "Everyone knows that"
            }
        },
        {
            "videoId": "cse5cCGuHmE",
            "title": "President Obama's 2015 State of the Union Address",
            "source": "The White House",
            "sentiment": {
                "question": "Do you agree with the President?",
                "positive": "Yes",
                "negative": "No"
            }
        }
    ];

    var getFeaturedVideoObj = function() {
        return featuredVideos;
    };

    var update = function(ref, value) {
        ref.update(value, onComplete);
    };

    var set = function(ref, value) {
        ref.set(value, onComplete);
    };

    var push = function(ref, value) {
        ref.push(value, onComplete);
    };

    var getFbBase = function() {
        return base;
    };

    var getDataObj = function() {
        return dataObj;
    };

    var setDataObj = function(obj) {
        // dataObj = obj;
        console.log(obj);
        $.extend(dataObj, obj);
    };

    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };

    var init = function() {
        APP.video.setup();
    };

    /**
    * interfaces to public functions
    */
    return {
        init: init,
        getFbBase: getFbBase,
        setDataObj: setDataObj,
        getDataObj: getDataObj,
        getFeaturedVideoObj: getFeaturedVideoObj,
        set: set,
        push: push,
        update: update
    };

}());
