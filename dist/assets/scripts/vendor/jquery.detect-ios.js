/* detect iOS for background-attachment: fixed hack */
jQuery.browser = (!jQuery.browser)?{}:jQuery.browser;
jQuery.browser.ios=(navigator.userAgent.match(/(iPhone|iPad)/))?true:false;