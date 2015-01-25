/* global Firebase */

'use strict';

var APP = window.APP = window.APP || {};

APP.sentiment = (function(){

    var _ = window._;

    var newDataObj = {};
    var tempVoteValue;
    var videosRef = new Firebase(APP.db.getFbBase() + '/videos');
    var playerData;
    var cleanPlayerData = [];

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
        // console.log(event, value);
        // console.log(refVoteUrl);
        $.unsubscribe('/video/currentTime', APP.sentiment.postVote);
        APP.db.push(refVote, getVoteObj(interval, tempVoteValue));
    };

    var bindVote = function(){
        $('.sentiment [data-value]').on('click', function(e){
            e.preventDefault();
            tempVoteValue = $(this).data('value');
            $.subscribe('/video/currentTime', APP.sentiment.postVote);
            // toggle questions after a delay
            clearTimeout(window.t);
            window.t = setTimeout(function(){$('h1').toggleClass('alt');}, 2750);
        });

    };

    var calculateDataPoint = function(objs) {

    };

    var formatChartData = function(){};

    var movement = function(a,b){
        return (a > 0) ? a + b : a - b;
    };

    var getChartData = function(){
        var playerDataUrl = APP.db.getFbBase() + '/videos/' + APP.video.getVideoId();
        playerData = new Firebase(playerDataUrl);
        // 1. load all data
        playerData.on('child_added', function(playerDataSnapshot) {
            console.log(playerDataSnapshot.val(),'psd val');
            // 2. handle each interval individually
            var i = 0;
            $.each(playerDataSnapshot.val(), function(name, elem){
                console.log(elem, i);
                //check for repeats
                var data = {x: null, y: null};
                if(i > 0) {
                } else {
                }
                cleanPlayerData.push(data);
                i++;
            // playerDataSnapshot.forEach(function(snapshot){ //:-| wtf w/ these params... (useless but required?)
            // for(var i = 0, len = playerDataSnapshot.length; i < len; i++) {
            //     // debugger;
            //     // console.log(i, elem.time, elem.value, elem, arr);
            //     var elem = this.val();
            //     var key = this.key();
            //     // console.log(elem, key);
            //     console.log(this, i);
            //     for(var j = 0, len = this.length; j < len; j++) {

            //         console.log(this, j);
            //         // if( --i > 0 && cleanPlayerData[--i].x === elem.time) {
            //         //     //look to last index to see if we can consolidate the data points together
            //         //     cleanPlayerData[i].x = elem.time;
            //         //     cleanPlayerData[i].y = movement(cleanPlayerData[--i].value, elem.value);
            //         // } else if( --i > 0 && cleanPlayerData[--i].x !== elem.time) {
            //         //     cleanPlayerData[i].x = elem.time;
            //         //     cleanPlayerData[i].y = elem.value;
            //         // } else {
            //         //     var data = {x: elem.time, y: elem.value};
            //         //     cleanPlayerData.push(data);
            //         // }
            //     }

            // };
            // playerDataSnapshot.forEach(function(snapshot) {
            //     // 3. extract values from children
            //     var key = snapshot.key();
            //     var val = snapshot.val();
            //     console.log(key, val, 'keyval');
            });
        });
    };

    var getCleanPlayerData = function(){
        return cleanPlayerData;
    };

    var initChart = function() {
        getChartData();
        window.Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#chart').highcharts({
            chart: {
                type: 'spline',
                animation: window.Highcharts.svg, // don't animate in old IE
                marginRight: 0,
                marginLeft: 0,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            //DOUBLE CHECK YOUTUBE STATE (THAT IT'S PLAY/ ELSE DON'T DO THIS?)
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
                tickPixelInterval: 150,
                labels: {
                    enabled: false
                }
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
            // series: [{
            //     // http://api.highcharts.com/highcharts#Series.data
            //     data: [x: time, y:value]
            // }],
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
                    // debugger;
                    return data;
                }())
            }],
            credits: {
                enabled: false
            }
        });
    };

    var initQnA = function() {
        var featuredIndex = _.findIndex(APP.db.getFeaturedVideosArr(),{"videoId":APP.video.getVideoId()});
        if (featuredIndex > -1) {
            var thisVideoObj = APP.db.getFeaturedVideosArr()[featuredIndex];
            $('.sentiment h1 .pri').text(thisVideoObj.sentiment.question);
            $('.sentiment h1 .alt').text(thisVideoObj.sentiment.questalt);
            $('.sentiment .actions a i.fa').remove();
            $('.sentiment .actions a.positive').text(thisVideoObj.sentiment.positive);
            $('.sentiment .actions a.negative').text(thisVideoObj.sentiment.negative);
        }
    };

    var init = function() {
        console.log('APP.sentiment');
        bindVote();
        initChart();
        initQnA();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init,
        getNewDataObj: getNewDataObj,
        getVoteObj: getVoteObj,
        getCleanPlayerData: getCleanPlayerData,
        postVote: postVote
    };

}());
