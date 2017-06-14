// service
(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .service('CompanyServices', CompanyServices);

  CompanyServices.$inject = ['$http'];

  function CompanyServices($http) {

    var service = {
      updateCompany: updateCompany,
      updateCompanyImage: updateCompanyImage
    };
    return service;

    function updateCompany(company) {
      return $http.put('/companies/' + company.id + '.json', company);
    }



    function updateCompanyImage(companyId, file) {

      var fd = new FormData();

      fd.append('company[avatar]', file);

      return $http.put('/companies/' + companyId + '.json', fd, {
        withCredentials: false,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };

  }
})();
