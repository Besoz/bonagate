(function() {

  'use strict';

  angular.module('clip-two')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$state', '$window', 'usersList', 'UserServices', '$rootScope', 'toaster'];

  function UsersController($state, $window, usersList, UserServices, $rootScope, toaster) {

    var vm = this;

    vm.users = usersList.data;

    // inline edit show control  
    vm.editId;
    vm.setEditId = setEditId;
    vm.save = save; // inline edit save

    // invitations
    vm.inviteUser = inviteUser;
    vm.userInvitation;
    vm.invitationAlerts = [];

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

      vm.invitationAlerts = [];

      vm.userInvitation.user.role = vm.userInvitation.user.role.value
      vm.userInvitation.user_invitation = {};
      vm.userInvitation.user_invitation.reciever_email = vm.userInvitation.user.email

      UserServices.inviteUser(vm.userInvitation)
        .then(function(res) {
          console.log(res);
          toaster.pop("success", "Invitation sent", res.data.reciever_email + " is invited");
        }).catch(function(err) {
          console.log(err);
          var errors = getErrorsArr(err.data);

          for (var i = 0; i < errors.length; i++) {
            vm.invitationAlerts.push({
              type: 'danger',
              msg: errors[i].item + ": " + errors[i].error
            });
          }
        })
    }


    function getErrorsArr(errors) {

      var arr = [];

      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {

          for (var i = 0; i < errors[key].length; i++) {
            arr.push({
              item: key,
              error: errors[key][i]
            });
          }
        }
      }

      return arr;
    }


  }

})();
