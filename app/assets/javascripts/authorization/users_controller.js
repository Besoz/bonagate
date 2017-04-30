(function() {
  angular.module('auth_app')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$http', '$window'];

  function UsersController($http, $window) {
    var vm = this;

    vm.users;

    // function register() {

    //   user = {
    //     email: vm.email,
    //     password: vm.password,
    //     password_confirmation: vm.passwordConfirmation
    //   };

    //   $http.post('/users.json', {
    //       user: user
    //     })
    //     .then(function(res) {

    //       $window.location.href = '/sign_in';

    //       console.log("res");
    //       console.log(res);

    //     })
    //     .catch(function(err) {
    //       vm.emailError = err.data.email[0];


    //       console.log("Errro");
    //       console.log(err);
    //     });
    // };

  }

})();
