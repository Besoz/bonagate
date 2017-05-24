// service
(function() {
  'use strict';

  angular
    .module('clip-two')
    .service('GeneralDataServices', GeneralDataServices);

  GeneralDataServices.$inject = ['$http'];


  function GeneralDataServices($http) {

    var service = {
      update: update,
      index: index,
      create: create
    };
    return service;

    ////////////

    function update(table, object_id, object) {
      return $http.put('/' + table + '/' + object_id + '.json', object);
    };

    function index(table) {
      return $http.get('/' + table + '.json');
    }

    function create(table, object) {
      return $http.post('/' + table + '.json', object);
    };
  }
})();
