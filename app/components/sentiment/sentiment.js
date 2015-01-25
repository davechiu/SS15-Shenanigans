/* global Firebase */

'use strict';

var APP = window.APP = window.APP || {};

APP.sentiment = (function(){

    var newDataObj = {};
    var tempVoteValue;
    var videosRef = new Firebase(APP.db.getFbBase() + '/videos');

    var getNewDataObj = function() {
        var vidId = APP.video.getVideoId();
        newDataObj[vidId] = {votes: null};
        return newDataObj;
    };

    var getVoteObj = function(interval, vote) {
        var dataObj = {};
        dataObj = {
            value: vote,
            // uid: userID,
            time: interval,
            dt: (new Date()).getTime()
        };
        return dataObj;
    };

    //triggered from $.subscribe vote event
    var postVote = function(event, value) {
        var interval = value;
        var refVoteUrl = APP.db.getFbBase() + '/videos/' + APP.video.getVideoId() + '/' + interval;
        var refVote = new Firebase(refVoteUrl);
        console.log(event, value);
        console.log(refVoteUrl);
        $.unsubscribe('/video/currentTime', APP.sentiment.postVote);
        APP.db.push(refVote, getVoteObj(interval, tempVoteValue));
    };

    var bindVote = function(){
        $('.sentiment [data-value]').on('click', function(e){
            e.preventDefault();
            tempVoteValue = $(this).data('value');
            $.subscribe('/video/currentTime', APP.sentiment.postVote);
        });

    };

    var initChart = function() {

        window.Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#chart').highcharts({
            chart: {
                type: 'spline',
                animation: window.Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: '' // don't need this.
            },
            xAxis: {
                type: '',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                labels: {
                    enabled: false
                },
                tickPositioner: function () {
                    var maxDeviation = Math.ceil(Math.max(Math.abs(this.dataMax), Math.abs(this.dataMin)));
                    var halfMaxDeviation = Math.ceil(maxDeviation / 2);
                    return [-maxDeviation, -halfMaxDeviation, 0, halfMaxDeviation, maxDeviation];
                }

            },
            tooltip: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }],
            credits: {
                enabled: false
            }
        });
    };

    var init = function() {
        console.log('APP.sentiment');
        bindVote();
        initChart();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init,
        getNewDataObj: getNewDataObj,
        getVoteObj: getVoteObj,
        postVote: postVote
    };

}());
