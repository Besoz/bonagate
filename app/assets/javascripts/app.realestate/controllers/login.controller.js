(function() {
  "use strict";

  angular
  .module("app")
  .controller("LoginController", LoginController);

  function LoginController($scope, decoratorService, GeneralDataServices, $window) {
    var vm = this;

    vm.userEmail = '';
    vm.userPassword = '';

    vm.login = login;
    vm.logout = logout;

    vm.loginErrors = [];

    $('#login-dropdown').on('hide.bs.dropdown', function () {
      // vm.userEmail = '';
      // vm.userPassword = '';
      vm.loginErrors.length = 0;
      $scope.$applyAsync()
    })

    function login() {
      var user_session = {
        email: vm.userEmail,
        password: vm.userPassword
      }

      vm.loginErrors.length = 0;

      GeneralDataServices
      .post('/user_sessions.json', {user_session: user_session})
      .then(function(res) {
        $window.location.reload();
      }).catch(function(res) {
        vm.loginErrors = decoratorService.getErrorsTextArray(res);
      })
    }

    function logout() {
      GeneralDataServices
      .delete('/sign_out.json')
      .then(function(res) {
        $window.location.reload();
      }).catch(function(res) {
      })
    }

  }
})();