// service
(function() {
  'use strict';

  angular
    .module('app')
    .service('redirectService', redirectService);

  function redirectService() {
    var service = {
      afterLoginRedirectUrl: afterLoginRedirectUrl,
    };
    return service;

    ////////////

    function afterLoginRedirectUrl(user) {
      /* */
      if (user.role == '10') {
        return '/';
      }
    };
  }
})();
