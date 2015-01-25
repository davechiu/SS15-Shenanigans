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
    var transformedArr = [];

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

            window.ga('send', 'event', 'vote', ((tempVoteValue > 0)?'positive':'negative'), APP.video.getVideoId());
        });

    };

    // var calculateDataPoint = function(objs) {};
    // var formatChartData = function(){};

    var getChartData = function(){
        var playerDataUrl = APP.db.getFbBase() + '/videos/' + APP.video.getVideoId();
        playerData = new Firebase(playerDataUrl);
        // 1. load all data
        playerData.on('child_added', function(playerDataSnapshot) {

            _.transform(playerDataSnapshot.val(), function(result, num, key){
                var arrIndex = _.findIndex(cleanPlayerData, {'x':parseInt(num.time)});
                if(arrIndex === -1) {
                    // create new
                    cleanPlayerData.push({'x':parseInt(num.time), 'y':parseInt(num.value)});
                } else {
                    // already exists, add to it
                    cleanPlayerData[arrIndex].y = cleanPlayerData[arrIndex].y + num.value;
                }
            });
        });
    };

    var getCleanPlayerData = function(){
        return cleanPlayerData;
    };

    var initChart = function() {
        //getChartData();
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
                        console.log("chart event load", this.series[0],getCleanPlayerData());
                        // set up the updating of the chart each second
                        // var series = this.series[0];
                        // setInterval(function () {
                        //     //DOUBLE CHECK YOUTUBE STATE (THAT IT'S PLAY/ ELSE DON'T DO THIS?)
                        //     var x = (new Date()).getTime(), // current time
                        //         y = Math.random();
                        //     series.addPoint([x, y], true, true);
                        // }, 1000);
                    }
                }
            },
            title: {
                text: '' // don't need this.
            },
            xAxis: {
                type: 'linear',
                tickPixelInterval: 150,
                labels: {
                    enabled: false
                },
                lineColor: '#EEEEEE',
                tickWidth: 0
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#999999'
                },{
                    value: -1,
                    width: 1,
                    color: '#EFEFEF'
                },{
                    value: 1,
                    width: 1,
                    color: '#EFEFEF'
                }],
                gridLineWidth: 0,
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
                // http://api.highcharts.com/highcharts#Series.data
                name: 'stuff',
                data: getCleanPlayerData()
            }],
            // series: [{
            //     name: 'Random data',
            //     data: (function () {
            //         // generate an array of random data
            //         var data = [],
            //             time = (new Date()).getTime(),
            //             i;

            //         for (i = -19; i <= 0; i += 1) {
            //             data.push({
            //                 x: time + i * 1000,
            //                 y: Math.random()
            //             });
            //         }
            //         return data;
            //     }())
            // }],
            credits: {
                enabled: false
            }
        });
    };

    var getTransformedArr = function() {
        return transformedArr;
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
        getChartData();
        window.asdf = setTimeout(function(){initChart();}, 1500);
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
        postVote: postVote,
        getTransformedArr: getTransformedArr
    };

}());
