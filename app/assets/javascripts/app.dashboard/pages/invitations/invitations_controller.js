(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('InvitationsController', InvitationsController);

  InvitationsController.$inject = ['$window', 'invitationsList', 'InvitationsServices', '$stateParams'];

  function InvitationsController($window, invitationsList, InvitationsServices, $stateParams) {

    var vm = this;

    vm.invitations = invitationsList.data;
    vm.editId;
    vm.setEditId = setEditId;
    vm.save = save;

    activate();


    function activate() {


    }

    function setEditId(id) {
      vm.editId = id;
    }

    function save(invitation) {
      console.log(invitation);

      InvitationsServices.updateinvitation(invitation)
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
