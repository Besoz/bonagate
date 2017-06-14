// service
(function() {
  'use strict';

  angular
    .module('app.authorization')
    .service('redirectService', redirectService);

  function redirectService() {
    var service = {
      afterLoginRedirectUrl: afterLoginRedirectUrl,
      afterSignupRedirectUrl: afterSignupRedirectUrl
    };
    return service;

    ////////////

    function afterLoginRedirectUrl(user) {
      return '/';
    };

    function afterSignupRedirectUrl() {
      return '/sign_in';
    }
  }
})();
