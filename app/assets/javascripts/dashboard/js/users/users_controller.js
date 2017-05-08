(function() {

  'use strict';

  angular.module('clip-two')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$state', '$window', 'usersList', 'UserServices', '$rootScope'];

  function UsersController($state, $window, usersList, UserServices, $rootScope) {

    var vm = this;

    vm.users = usersList.data;

    // inline edit show control  
    vm.editId;
    vm.setEditId = setEditId;
    vm.save = save; // inline edit save

    vm.inviteUser = inviteUser;
    vm.userInvitation;

    vm.roles = [
      { name: 'Admin', value: 'company_admin' },
      { name: 'Sales', value: 'company_sales' },
    ];


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

    //  user invitation

    function inviteUser() {
      vm.userInvitation.user.role = vm.userInvitation.user.role.value
      vm.userInvitation.user_invitation = {};
      vm.userInvitation.user_invitation.reciever_email = vm.userInvitation.user.email


      UserServices.inviteUser(vm.userInvitation)
        .then(function(res) {
          console.log(res);

        }).catch(function(err) {
          console.log(err);

        })
    }

  }

})();
