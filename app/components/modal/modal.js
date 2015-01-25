'use strict';

var APP = window.APP = window.APP || {};

APP.modal = (function(){

    var openModal = function() {
        $('.modal').fadeIn(150);
    };
    var closeModal = function() {
        $('.modal').fadeOut(150);
    };
    var createModal = function(_title, _body, _cancelText, _okText, _okCallback) {
        $('.modal .heading p strong').text(_title);
        $('.modal .copy p').text(_body);
        $('.modal .actions a.cancel').text(_cancelText);
        $('.modal .actions a.ok').text(_okText);

        $('.modal .actions a.ok').off('click');
        $('.modal .actions a.ok').data('onclick', null);

        if( typeof _okCallback === 'function') {
            $('.modal .actions a.ok').data('onclick', _okCallback);
            $('.modal .actions a.ok').on('click', function(e){
                e.preventDefault();

                if( $(this).data('onclick') !== null ) {
                    $(this).data('onclick').call(this, e);
                }
                window.ga('send', 'event', 'modal', 'ok: ' + $(this).text());
                APP.modal.closeModal();
            });
        } else {
            $('.modal .actions a.ok').on('click', function(e){
                e.preventDefault();
                APP.modal.closeModal();
                window.ga('send', 'event', 'modal', 'ok: ' + $(this).text());
            });
        }

        // setup complete, go.
        openModal();
    };

    var init = function() {
        console.log('APP.modal');

        $('.modal .actions a.cancel').on('click', function(e){
            e.preventDefault();
            APP.modal.closeModal();
            window.ga('send', 'event', 'modal', 'cancel: ' + $(this).text());
        });
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init,
        createModal: createModal,
        closeModal: closeModal
    };

}());
