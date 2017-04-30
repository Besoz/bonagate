// service
(function() {
  'use strict';

  angular
    .module('clip-two')
    .service('UserServices', UserServices);

  UserServices.$inject = ['$http'];


  function UserServices($http) {
    var service = {
      updateUser: updateUser,
      getUsers: getUsers
    };
    return service;

    ////////////

    function updateUser(user) {
      return $http.put('/users/' + user.id + '.json', { user })
    };

    function getUsers() {
      return $http.get('/users.json');
    }
  }
})();
