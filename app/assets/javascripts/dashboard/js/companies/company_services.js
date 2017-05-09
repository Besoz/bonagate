// service
(function() {
  'use strict';

  angular
    .module('clip-two')
    .service('CompanyServices', CompanyServices);

  CompanyServices.$inject = ['$http'];

  function CompanyServices($http) {

    var service = {};
    return service;
  }
})();
