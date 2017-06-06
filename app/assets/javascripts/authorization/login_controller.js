(function() {
  angular.module('auth_app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$http', '$window', 'RedirectService', 'decoratorService'];

  function LoginController($http, $window, RedirectService, decoratorService) {
    var vm = this;

    vm.userEmail = '';
    vm.userPassword = '';
    vm.loginUser = loginUser;
    vm.loginAlerts = [];

    function loginUser() {

      vm.loginAlerts = [];

      userSession = {
        email: vm.userEmail,
        password: vm.userPassword
      };

      $http.post('/user_sessions.json', {
          user_session: userSession
        })
        .then(function(res) {

          $window.location.href = RedirectService.afterLoginRedirectUrl(res.data);
          console.log("res");
          console.log(res);

        })
        .catch(function(err) {
          vm.loginAlerts = decoratorService.getErrorsAlertsArr(err.data);

          console.log("Errro");
          console.log(err);
        });
    };
  }

})();
