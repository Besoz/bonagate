// service
(function() {
  'use strict';

  angular
    .module('clip-two')
    .service('RedirectService', RedirectService);

  RedirectService.$inject = ['$window', '$rootScope', '$http'];

  function RedirectService($window, $rootScope, $http) {

    var service = {
      gotoLoginPage: gotoLoginPage
    };

    return service;

    ////////////

    function gotoLoginPage(user) {
      $http.delete('/sign_out.json')
        .then(function(res) {
          console.log(res);
        }).catch(function(res) {
          console.log(res);
        });
      $window.location.href = '/sign_in';
    };
  }
})();
