(function() {

  'use strict';

  angular.module('clip-two')
    .controller('CompanyController', CompanyController);

  CompanyController.$inject = ['$state', '$window', 'CompanyServices', 'company'];

  function CompanyController($state, $window, CompanyServices, company) {

    var vm = this;

    vm.editActive;
    vm.overviewActive;
    vm.company;
    vm.updateCompany = updateCompany;

    activate();

    function activate() {
      vm.editActive = false;
      vm.overviewActive = true;
      vm.company = company.data;
      vm.updateCompany = updateCompany;
    }


    function updateCompany() {

      CompanyServices.updateCompany(vm.company)
    }

  }

})();
