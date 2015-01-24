'use strict';

var APP = window.APP = window.APP || {};

APP.navigation = (function(){
    var $menuOpenLink = $('.menu_link--js_open'),
        $menuCloseLink = $('.menu_link--js_close'),
        $nav = $('.navigation ul');

    var menuOpen = function(){
        $nav.slideDown();
        $menuOpenLink.hide();
        $menuCloseLink.show();
    };

    var menuClose = function(){
        $nav.slideUp();
        $menuOpenLink.show();
        $menuCloseLink.hide();
    };

    var bindEventsToUI = function() {
        $menuOpenLink.on('click',function(event){
            event.preventDefault();
            menuOpen();
        });
        $menuCloseLink.on('click',function(event){
            event.preventDefault();
            menuClose();
        });
    };

    var init = function() {
        console.log('APP.navigation');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
