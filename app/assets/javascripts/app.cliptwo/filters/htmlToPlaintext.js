'use strict';

angular
    .module('app.dashboard')
    .filter('htmlToPlaintext', function () {
        return function (text) {
            return String(text).replace(/<[^>]+>/gm, '');
        };
    });