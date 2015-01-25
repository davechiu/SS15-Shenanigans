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