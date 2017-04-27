// service
(function() {
  'use strict';

  angular
    .module('auth_app')
    .service('redirectService', redirectService);

  function redirectService() {
    var service = {
      afterLoginRedirectUrl: afterLoginRedirectUrl,
      afterSignupRedirectUrl: afterSignupRedirectUrl
    };
    return service;

    ////////////

    function afterLoginRedirectUrl(user) {
      /* */
      if (user.role == '10') {
        return '/';
      }
    };

    function afterSignupRedirectUrl() {
      return '/sign_in'
    }
  }
})();
