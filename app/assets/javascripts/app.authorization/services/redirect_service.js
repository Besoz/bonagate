// service
(function () {
  'use strict';

  angular
    .module('app.authorization')
    .service('RedirectService', RedirectService);

    RedirectService.$inject = ['$window']

  function RedirectService($window) {
    var service = {
      afterLoginRedirectUrl: afterLoginRedirectUrl,
      afterSignupRedirectUrl: afterSignupRedirectUrl,
      goToRegisterationPage: goToRegPage
    };
    return service;

    ////////////

    function afterLoginRedirectUrl(user) {
      return '/';
    };

    function afterSignupRedirectUrl() {
      return '/sign_in';
    }

    function goToRegPage() {
      $window.location.href = '/users/new';
    }
  }
})();