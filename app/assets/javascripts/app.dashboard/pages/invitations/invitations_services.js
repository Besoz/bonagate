// service
(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .service('InvitationsServices', InvitationsServices);

  InvitationsServices.$inject = ['$http'];


  function InvitationsServices($http) {
    var service = {
      updateInvitation: updateInvitation,
      getInvitations: getInvitations
    };
    return service;

    ////////////

    function updateInvitation(invitation) {
      return $http.put('/user_invitations/' + invitation.id + '.json', { invitation });
    };


    function getInvitations() {
      return $http.get('/invitations.json');
    }
  }
})();
