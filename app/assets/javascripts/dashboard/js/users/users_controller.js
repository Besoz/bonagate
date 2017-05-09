(function() {

  'use strict';

  angular.module('clip-two')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$http', '$window', 'usersList', 'UserServices'];

  function UsersController($http, $window, usersList, UserServices) {

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

      UserServices.updateUser(user)
        .then(function(res) {
          console.log(res);
          vm.setEditId(-1)
        })
        .catch(function(err) {
          console.log(err);
        });

    }
  }

})();
