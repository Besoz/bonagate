(function() {
  angular.module('clip-two')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$http', '$window', 'usersList'];

  function UsersController($http, $window, usersList) {

    var vm = this;

    vm.users = usersList.data;
    vm.editId;
    vm.setEditId = setEditId;
    vm.save = save;

    function setEditId(id) {
      vm.editId = id;
    }

    function save(user) {
      console.log(user);

      $http.put('/users/' + user.id + '.json', { user })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });

    }

    console.log(vm.users);

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
