// service
(function() {
  'use strict';

  angular
    .module('clipApp')
    .service('PropertiesServices', PropertiesServices);

  PropertiesServices.$inject = ['$http', 'GeneralDataServices'];


  function PropertiesServices($http, GeneralDataServices) {

    var service = {
      updateProperty: updateProperty,
      createProperty: createProperty,
      getProperties: getProperties
    };
    return service;

    ////////////

    function createProperty(obj) {
      return GeneralDataServices.create('properties', { 'property': obj });
    }

    function updateProperty(obj) {
      return GeneralDataServices.update('properties', obj.id, { 'property': obj });
    };

    function getProperties() {
      return GeneralDataServices.index('properties');
    }
  }
})();
