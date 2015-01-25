(function ($) {
    'use strict';

    var Share = window.Share || {};

    Share = (function() {

        var instanceId = 0;

        function Share(element, settings) {

            // Static method default options.
            this.defaultOptions = {
                // dom element setup
                wrapper: 'ul',
                itemWrapper: 'li',

                // defaults regarding link to share
                link: location.href,
                title: document.title,
                description: ($('meta[name=description]').length)?$('meta[name=description]').attr('content'):'',
                image: ($('meta[property="og:image"]').length)?$('meta[property="og:image"]').attr('content'):'',

                // popup or regular link opening in new tab
                type: null,

                // include a label?
                shareBarLabel: null,

                // do we want to include sharecounts?
                showShareCount: true,
                shareCountThreshold: 0,

                // setup the callbacks
                onclick: null,
                oncomplete: null,

                // ADA related
                adaClassName: 'accessibility-hidden',
                adaText: ', link will open in a new window.',

                // network related
                networks: [
                    {
                        network: 'facebook'
                    },
                    {
                        network: 'twitter'
                    },
                    {
                        network: 'linkedin'
                    },
                    {
                        network: 'pinterest'
                    }
                ],
            };

            // network options
            this.networkDefaults = {
                facebook: {
                    network: 'facebook',
                    display: 'Facebook',
                    name: 'facebook',
                    shareLinkTemplate: 'https://www.facebook.com/sharer.php?u={link}'
                },
                twitter: {
                    tweet: document.title + ' ',
                    network: 'twitter',
                    display: 'Twitter',
                    name: 'twitter',
                    shareLinkTemplate: 'https://twitter.com/intent/tweet?source=webclient&text={tweet}'
                },
                linkedin: {
                    network: 'linkedin',
                    display: 'LinkedIn',
                    name: 'linkedin',
                    shareLinkTemplate: 'https://www.linkedin.com/shareArticle?summary={description}&title={title}&mini=true&url={link}&source=Bank+of+America'
                },
                pinterest: {
                    network: 'pinterest',
                    display: 'Pinterest',
                    name: 'pinterest',
                    shareLinkTemplate: 'http://pinterest.com/pin/create/button/?url={link}&media={imageUrl}&description={description}'
                }
            };

            this.$sharebar = $(element);

            this.instanceId = instanceId++;
            this.init(settings);
        }

        return Share;

    }());

    Share.prototype.init = function(settings) {
        // init share bar

        if (!$(this.$sharebar).hasClass('flag-share')) {

            $(this.$sharebar).addClass('flag-share').data('shareInstanceId', this.instanceId);
            this.buildLinks(settings);

        }

    };

    Share.prototype.buildLinks = function(settings) {
        // merge user settings and defaults
        var buildOptions = $.extend({}, this.defaultOptions, settings);
        var defaultNetworkOptions = this.networkDefaults;

        // build container to hold share items
        var shareBar = $(document.createElement(buildOptions.wrapper)).addClass('flag-share__share-bar');

        // build a label if needed
        if (buildOptions.shareBarLabel !== null) {
            // get text based display ready to go
            if (typeof buildOptions.shareBarLabel === 'string') {
                buildOptions.shareBarLabel = $(document.createTextNode(buildOptions.shareBarLabel));
            }

            var shareLabel = $(document.createElement(buildOptions.itemWrapper)).addClass('flag-share__item flag-share__item--label').append(
                $(document.createElement('span')).addClass('flag-share__label').append(buildOptions.shareBarLabel.clone())
            );

            shareBar.append(shareLabel);
        }

        // prep networks, incase shorthand was used, turn into array of objects
        if(typeof buildOptions.networks === 'string') {
            var newPrimaryNetworksObj = [];
            var primaryNetworkList = buildOptions.networks.split(',');
            for (var i = 0; i < primaryNetworkList.length; ++i) {
                newPrimaryNetworksObj.push({network: $.trim(primaryNetworkList[i])});
            }

            buildOptions.networks = newPrimaryNetworksObj;
        }

        // loop through desired networks and build items
        $(buildOptions.networks).each(function(){

            var networkParameters = $.extend({}, defaultNetworkOptions[this.network], this);

            // get text based display ready to go
            if (typeof networkParameters.display === 'string') {
                networkParameters.display = $(document.createTextNode(networkParameters.display));
            }

            var $shareItem = $(document.createElement(buildOptions.itemWrapper)).addClass('flag-share__item ' + 'flag-share__item--'+this.network);
            var $shareLink = $(document.createElement('a'))
                                .addClass('flag-share__link ' + 'flag-share__link--'+this.network)
                                .attr({
                                    name: networkParameters.name,
                                    href: networkParameters.shareLinkTemplate
                                            .replace(/{link}/g, encodeURIComponent(buildOptions.link))
                                            .replace(/{tweet}/g, encodeURI( ((networkParameters !== null && typeof networkParameters.tweet !== 'undefined')?( $.trim(networkParameters.tweet)+' '):'') ).replace("#", "%23") + encodeURIComponent(buildOptions.link))
                                            .replace(/{title}/g, encodeURI(buildOptions.title))
                                            .replace(/{imageUrl}/g, encodeURIComponent(buildOptions.image))
                                            .replace(/{description}/g, encodeURI(buildOptions.description)),
                                    target: '_blank'
                                })
                                .data({
                                    // save the link off to data, so we can look for it and replace it later with a short url
                                    link: buildOptions.link,
                                    onclick: buildOptions.onclick,
                                    type: buildOptions.type
                                })
                                .append(
                                    $(document.createElement('span')).addClass('flag-share__count').data('shareCountThreshold',buildOptions.shareCountThreshold),
                                    $(document.createElement('span')).addClass('flag-share__display').append(networkParameters.display.clone()),
                                    $(document.createElement('span')).addClass('flag-share__ada-text ' + buildOptions.adaClassName).text(buildOptions.adaText)
                                )
                                .on('click', function(e){
                                    // are we opening a popup?
                                    if( $(this).data('type') === 'popup' ) {
                                        e.preventDefault();

                                        window.open($(this).attr('href'), '_blank', 'width=640; height=480');
                                    }

                                    // onclick callback, passing jQuery Click Event
                                    if( $(this).data('onclick') !== null ) {
                                        $(this).data('onclick').call(this, e);
                                    }

                                });

            // are share counts requested? run this async.
            if (buildOptions.showShareCount) {
                switch(this.network){
                    case 'facebook':
                        // http://graph.facebook.com/?id=https://red.bankofamerica.com/
                        // result.shares
                        $.ajax({
                            url: 'http://graph.facebook.com/',
                            data: {
                                id: buildOptions.link
                            },
                            dataType: 'jsonp'
                        }).done($.proxy(function(result){
                            if(parseInt(result.shares) >= $(this).find('.flag-share__count').data('shareCountThreshold')) {
                                $(this).find('.flag-share__count').addClass('flag-share__count--above-threshold').text(result.shares);
                            } else {
                                $(this).find('.flag-share__count').addClass('flag-share__count--below-threshold');
                            }
                        },$shareItem));
                        break;
                    case 'twitter':
                        // http://urls.api.twitter.com/1/urls/count.json?url=https://red.bankofamerica.com/
                        // result.count
                        $.ajax({
                            url: 'http://urls.api.twitter.com/1/urls/count.json',
                            data: {
                                url: buildOptions.link
                            },
                            dataType: 'jsonp'
                        }).done($.proxy(function(result){
                            if(parseInt(result.count) >= $(this).find('.flag-share__count').data('shareCountThreshold')) {
                                $(this).find('.flag-share__count').addClass('flag-share__count--above-threshold').text(result.count);
                            } else {
                                $(this).find('.flag-share__count').addClass('flag-share__count--below-threshold');
                            }
                        },$shareItem));
                        break;
                    case 'linkedin':
                        // http://www.linkedin.com/countserv/count/share?url=https://red.bankofamerica.com/&format=json
                        // result.count
                        $.ajax({
                            url: 'http://www.linkedin.com/countserv/count/share',
                            data: {
                                url: buildOptions.link,
                                fomrat: 'json'
                            },
                            dataType: 'jsonp'
                        }).done($.proxy(function(result){
                            if(parseInt(result.count) >= $(this).find('.flag-share__count').data('shareCountThreshold')) {
                                $(this).find('.flag-share__count').addClass('flag-share__count--above-threshold').text(result.count);
                            } else {
                                $(this).find('.flag-share__count').addClass('flag-share__count--below-threshold');
                            }
                        },$shareItem));
                        break;
                    case 'pinterest':
                        // http://api.pinterest.com/v1/urls/count.json?url=https://red.bankofamerica.com/
                        // result.count
                        $.ajax({
                            url: 'http://api.pinterest.com/v1/urls/count.json',
                            data: {
                                url: buildOptions.link
                            },
                            dataType: 'jsonp'
                        }).done($.proxy(function(result){
                            if(parseInt(result.count) >= $(this).find('.flag-share__count').data('shareCountThreshold')) {
                                $(this).find('.flag-share__count').addClass('flag-share__count--above-threshold').text(result.count);
                            } else {
                                $(this).find('.flag-share__count').addClass('flag-share__count--below-threshold');
                            }
                        },$shareItem));
                        break;
                }
            }

            $shareItem.append($shareLink);
            shareBar.append($shareItem);
        });

        // done, draw to page
        this.$sharebar.append(shareBar);

        // oncomplete callback, passing sharebar object
        if(buildOptions.oncomplete !== null) {
            buildOptions.oncomplete.call(this, this.$sharebar);
        }

        // posse out.
    };

    // Collection method.
    $.fn.share = function (options) {

        return this.each(function(index, element) {
            element.share = new Share(element, options);
        });

    };

    // Static method.
    $.share = function (options) {
        console.log('flag-share: incorrect invocation');
    };


}(jQuery));