(function() {
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$http', '$window', 'redirectService'];

  function LoginController($http, $window, redirectService) {
    var vm = this;

    vm.userEmail = '';
    vm.userPassword = '';
    vm.loginUser = loginUser;

    function loginUser() {
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

          console.log("Errro");
          console.log(err);
        });
    };
  }

})();
