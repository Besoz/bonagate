// service
(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .service('UserServices', UserServices);

  UserServices.$inject = ['$http'];


  function UserServices($http) {

    var service = {
      updateUser: updateUser,
      getUsers: getUsers,
      updateUserImage: updateUserImage,
      inviteUser: inviteUser,
      activateUser: activateUser,
      deactivateUser: deactivateUser
    };
    return service;

    ////////////

    function updateUser(user) {
      return $http.put('/users/' + user.id + '.json', { user });
    };

    function updateUserImage(userId, file) {

      var fd = new FormData();

      fd.append('user[avatar]', file);

      return $http.put('/users/' + userId + '.json', fd, {
        withCredentials: false,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };

    function getUsers() {
      return $http.get('/users.json');
    }

    function inviteUser(userInvitation) {
      return $http.post('/user_invitations.json', userInvitation)
    }

    function activateUser(user){
      return $http.post('/users/' + user.id + '/active.json');
    }

    function deactivateUser(user){
      return $http.delete('/users/' + user.id + '/active.json');
    }
  }
})();
