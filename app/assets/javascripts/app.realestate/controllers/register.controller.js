(function() {
  "use strict";

  angular
  .module("app")
  .controller("RegisterController", RegisterController);

  function RegisterController($scope, $translate, decoratorService, GeneralDataServices, toaster) {
    var vm = this;

    vm.email = '';
    vm.password = '';
    vm.password_confirmation = '';
    vm.first_name = '';
    vm.last_name = '';

    vm.register = register;

    vm.regErrors = [];

    $('#signup-dropdown').on('hide.bs.dropdown', function () {
      vm.regErrors.length = 0;
      $scope.$applyAsync();
    })

    function register() {
      var user = {
        email: vm.email,
        password: vm.password,
        password_confirmation: vm.password_confirmation,
        first_name: vm.first_name,
        last_name: vm.last_name,
      }

      vm.regErrors.length = 0;

      GeneralDataServices
      .post('/users/create_user', {user: user})
      .then(function(res) {
        toaster.pop(
          "success", 
          $translate.instant('dashboard.success'), 
          $translate.instant('dashboard.recored_created', {
            model:$translate.instant('activerecord.models.user')
          })
        );
        $('#login-toggle').dropdown('toggle')
      }).catch(function(res) {
        vm.regErrors = decoratorService.getErrorsTextArray(res);
      })

    }

  }
})();