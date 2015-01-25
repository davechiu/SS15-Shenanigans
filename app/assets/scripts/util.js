// Avoid `console` errors in browsers that lack a console.
'use strict';
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//used in reactions and trending for various things.
function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}

// seconds to milliseconds
var secToMillisec = function(sec) {
    return (sec * 1000).toFixed(0);
};
// milliseconds to seconds
var millisecToSec = function(msec) {
    return (msec / 1000).toFixed(0);
};
// sec to friendlyTime
var secToMHS = function(sec) {
    var newTime = new Date(0, 0, 0, 0, 0, 0, 0);
    newTime.setSeconds(sec);

    var output = newTime.getHours() + ':' + ((newTime.getMinutes() < 10)?'0':'') + newTime.getMinutes() + ':' + ((newTime.getSeconds() < 10)?'0':'') + newTime.getSeconds();

    // do we need days as units? if so, refactor.
    return output;
};

var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var countUp = function(_elements, _numeral, _duration) {
    $(_elements).each(function() {
        var $this = $(this);
        $({
            counter: 0
        }).animate({
            counter: _numeral
        }, {
            duration: _duration,
            easing: 'linear',
            step: function() {
                $this.text( ((typeof $this.data('prefix') !== 'undefined')?$this.data('prefix'):'') + ( (this.counter < 10)?0:'') + Math.ceil(this.counter));
            },
            complete: function() {
                // on larger counts, the animation will result close-to but not at the final number, swap final number in on-complete.
                $this.text( ((typeof $this.data('prefix') !== 'undefined')?$this.data('prefix'):'') + _numeral );
            }
        });
    });
};
var countDown = function(_elements, _numeral, _duration) {
    $(_elements).each(function() {
        var $this = $(this);
        $({
            counter: _numeral
        }).animate({
            counter: 0
        }, {
            duration: _duration,
            easing: 'linear',
            step: function() {
                $this.text( ((typeof $this.data('prefix') !== 'undefined')?$this.data('prefix'):'') + ( (Math.ceil(this.counter) < 10)?0:'') + Math.ceil(this.counter));
            },
            complete: function() {
                // on larger counts, the animation will result close-to but not at the final number, swap final number in on-complete.
                $this.text( ((typeof $this.data('prefix') !== 'undefined')?$this.data('prefix'):'') + "00");
            }
        });
    });
};

var howLongAgoWasThisEpoch = function(_epoch) {
    var diffInMillisec = new Date().getTime() - _epoch; // milliseconds since the input

    var dateDiff = {
        inSeconds: parseInt(diffInMillisec/(1000)),
        inMinutes: parseInt(diffInMillisec/(60*1000)),
        inHours: parseInt(diffInMillisec/(3600*1000)),
        inDays: parseInt(diffInMillisec/(24*3600*1000)),
        inWeeks: parseInt(diffInMillisec/(24*3600*1000*7)),
        inMonths: parseInt(diffInMillisec/(24*3600*1000*30)),
        inYears: parseInt(diffInMillisec/(24*3600*1000*365)),
        inEnglish: ''
    };
    var humanReadableOutput;
    if (dateDiff.inSeconds < 30) {
        humanReadableOutput = 'just now';
    } else if (dateDiff.inSeconds > 30 && dateDiff.inMinutes === 0) {
        humanReadableOutput = dateDiff.inSeconds + ' seconds ago';
    } else if (dateDiff.inMinutes > 0 && dateDiff.inHours === 0) {
        humanReadableOutput = dateDiff.inMinutes + ' minutes ago';
    } else if (dateDiff.inHours > 0 && dateDiff.inDays === 0) {
        humanReadableOutput = dateDiff.inHours + ' hours ago';
    } else if (dateDiff.inDays > 0 && dateDiff.inWeeks === 0) {
        humanReadableOutput = 'about ' + dateDiff.inDays + ' days ago';
    } else if (dateDiff.inWeeks > 0 && dateDiff.inMonths === 0) {
        humanReadableOutput = 'about ' + dateDiff.inWeeks + ' weeks ago';
    } else if (dateDiff.inMonths > 0 && dateDiff.inYears === 0) {
        humanReadableOutput = 'about ' + dateDiff.inMonths + ' months ago';
    } else if (dateDiff.inYears > 0) {
        humanReadableOutput = 'about ' + dateDiff.inYears + ' years ago';
    } else {
        humanReadableOutput = 'a long, long time ago.';
    }
    dateDiff.inEnglish = humanReadableOutput;

    return dateDiff;
};