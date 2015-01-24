'use strict';

var APP = window.APP = window.APP || {};

APP.notification = (function(){
    var _ = window._;
    var messagesSeen = [];

    var markAsRead = function(messageId) {
        console.log(_.indexOf(messagesSeen, messageId), messagesSeen, messageId);
        if (_.indexOf(messagesSeen, messageId) === -1) {
            messagesSeen.push(messageId);

            $.cookie('messagesSeen', messagesSeen.join(','));
        }
    };

    var checkIfRead = function(messageId) {
        return _.indexOf(messagesSeen, messageId);
    };

    var createNotification = function(messageId, html) {
        var notification =
        $(document.createElement('div')).addClass('card').append(
            $(document.createElement('div')).addClass('notification').data('messageId', messageId).append(
                $(document.createElement('div')).addClass('wrapper').append(
                    $(document.createElement('a')).addClass('close fa fa-times').attr('href','#').on('click', function(e){
                        e.preventDefault();

                        var $notificationObj = $(this).closest('.notification');

                        APP.notification.markAsRead($notificationObj.data('messageId'));
                        $notificationObj.slideUp('fast');
                    }),
                    $(html)
                )
            )
        );

        $('.content').prepend(notification);
    };

    var init = function() {
        console.log('APP.notification');

        if($.cookie('messagesSeen')) {
            messagesSeen = $.cookie('messagesSeen').split(',');
        }

    };

    /**
     * interfaces to public functions
     */
    return {
        init: init,
        createNotification: createNotification,
        markAsRead: markAsRead,
        checkIfRead: checkIfRead
    };

}());
