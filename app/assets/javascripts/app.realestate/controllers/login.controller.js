(function() {
  "use strict";

  angular
  .module("app")
  .controller("LoginController", LoginController);

  function LoginController($scope, $http, $window) {
    var vm = this;

    vm.userEmail = '';
    vm.userPassword = '';

    vm.login = login;
    vm.logout = logout;

    function login() {
      var user_session = {
        email: vm.userEmail,
        password: vm.userPassword
      }

      $http
      .post('/user_sessions.json', {user_session: user_session})
      .then(function(res) {
        $window.location.reload();
      }).catch(function(err) {
        console.log('err', err);
      })
    }

    function logout() {
      $http
      .delete('/sign_out.json')
      .then(function(res) {
        $window.location.reload();
      }).catch(function(err) {
        console.log('err', err);
      })
    }

  }
})();