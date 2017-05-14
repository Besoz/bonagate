(function() {

  'use strict';

  angular.module('clip-two')
    .controller('CompanyController', CompanyController);

  CompanyController.$inject = ['$state', '$window', 'CompanyServices', 'companyRequest', '$rootScope'];

  function CompanyController($state, $window, CompanyServices, companyRequest, $rootScope) {

    var vm = this;

    vm.editActive;
    vm.overviewActive;
    vm.company;
    vm.updateCompany = updateCompany;
    vm.uploadImage = uploadImage;
    vm.canEditCompanyProfile = false;

    activate();

    function activate() {
      vm.editActive = false;
      vm.overviewActive = true;
      vm.company = companyRequest.data;
      vm.updateCompany = updateCompany;

      if ($rootScope.currentUser.companyAdmin()) {
        vm.canEditCompanyProfile = true;
      }

      vm.obj = new Flow({
        chunkSize: 1024 * 1024,
        testChunks: false
      });

      // vm.user = $stateParams.user;
      if (vm.company.avatar) {
        vm.noImage = false;
      } else {
        vm.noImage = true;
      }
    }

    function removeImage() {
      vm.company.avatar = '';
    }

    function uploadImage() {

      CompanyServices.updateCompanyImage(vm.company.id, vm.obj.files[0].file)
        .then(function(res) {
          console.log("res");
          console.log(res);
        })
        .catch(function(err) {
          console.log("err");
          console.log(err);
        });
    }


    function updateCompany() {

      CompanyServices.updateCompany(vm.company)
        .then(function(res) {
          console.log(res);
          vm.editActive = false;
          vm.overviewActive = true;
        })
        .catch(function(err) {
          console.log(err)
        });
    }

  }

})();
