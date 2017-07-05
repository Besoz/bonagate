// service
(function () {
  'use strict';

  angular
    .module('app.shared')
    .service('GeneralDataServices', GeneralDataServices);

  GeneralDataServices.$inject = ['$http'];


  function GeneralDataServices($http) {

    var service = {
      update: update,
      index: index,
      create: create,
      get: get
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

    function get(table, id) {
      return $http.get('/' + table + '/'+ id +'.json');
    };
  }
})();