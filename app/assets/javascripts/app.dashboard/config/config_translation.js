(function () {
    'use strict';
    // translate config
    angular
        .module('app.dashboard')
        .config(['$translateProvider',
            function ($translateProvider) {

                // prefix and suffix information  is required to specify a pattern
                // You can simply use the static-files loader with this pattern:
                // $translateProvider.useStaticFilesLoader({
                //   prefix: 'assets/dashboard/i18n/',
                //   suffix: '.json'
                // });

                $translateProvider.useUrlLoader('/translation')

                // Since you've now registered more then one translation table, angular-translate has to know which one to use.
                // This is where preferredLanguage(langKey) comes in.
                $translateProvider.preferredLanguage('en');

                // Store the language in the local storage
                $translateProvider.useLocalStorage();

            }
        ]);
})();