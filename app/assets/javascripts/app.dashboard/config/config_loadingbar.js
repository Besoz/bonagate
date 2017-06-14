(function () {
    'use strict';
    // Angular-Loading-Bar
    // configuration
    angular
        .module('app.dashboard')
        .config(['cfpLoadingBarProvider',
            function (cfpLoadingBarProvider) {
                cfpLoadingBarProvider.includeBar = true;
                cfpLoadingBarProvider.includeSpinner = false;

            }
        ]);
})();