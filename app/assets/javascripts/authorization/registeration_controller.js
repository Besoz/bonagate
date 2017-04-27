(function() {
  angular.module('auth_app')
    .controller('RegisterationController', RegisterationController);

  RegisterationController.$inject = ['$http', '$window', 'redirectService'];

  function RegisterationController($http, $window, redirectService) {
    var vm = this;

    vm.email;
    vm.password;
    vm.passwordConfirmation;
    vm.emailError;
    vm.registerUser = register;
    vm.gotoLoginPage = gotoLoginPage;


    function register() {

      user = {
        email: vm.email,
        password: vm.password,
        password_confirmation: vm.passwordConfirmation
      };

      $http.post('/users.json', {
          user: user
        })
        .then(function(res) {

          //todo use redirect service
          $window.location.href = redirectService.afterSignupRedirectUrl();

          console.log("res");
          console.log(res);

        })
        .catch(function(err) {
          vm.emailError = err.data.email[0];


          console.log("Errro");
          console.log(err);
        });
    };

    function gotoLoginPage() {
      $window.location.href = '/sign_in';
    }
  }

})();
