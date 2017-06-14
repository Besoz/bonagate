(function() {
  angular.module('app.authorization')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$http', '$window', 'redirectService', 'decoratorService'];

  function LoginController($http, $window, redirectService, decoratorService) {
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

          $window.location.href = redirectService.afterLoginRedirectUrl(res.data);
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
