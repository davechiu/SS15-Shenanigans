'use strict';

var APP = window.APP = window.APP || {};

APP.comments = (function(){

    var bindEventsToUI = function() {

    };

    var init = function() {
        console.log('APP.comments');
        bindEventsToUI();
        console.log('name: '+APP.user.getName());
        if(APP.user.getName()){
            $('.post__wrapper').attr('data-name', APP.user.getName);
        }else{
            $('.post__wrapper').attr('data-name', 'default');
        }
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
