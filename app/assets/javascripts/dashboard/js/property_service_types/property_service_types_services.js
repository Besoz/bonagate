// service
(function() {
  'use strict';

  angular
    .module('clipApp')
    .service('PropertyServiceTypesServices', PropertyServiceTypesServices);

  PropertyServiceTypesServices.$inject = ['GeneralDataServices'];


  function PropertyServiceTypesServices(GeneralDataServices) {

    var service = {
      updatePropertyServiceType: updatePropertyServiceType,
      getPropertyServiceTypes: getPropertyServiceTypes,
      createPropertyServiceType: createPropertyServiceType
    };
    return service;

    ////////////

    function updatePropertyServiceType(obj) {
      return GeneralDataServices.update('property_service_types', obj.id, { 'property_service_type': obj });
    };

    function getPropertyServiceTypes() {
      return GeneralDataServices.index('property_service_types');
    }

    function createPropertyServiceType(obj) {
      return GeneralDataServices.create('property_service_types', { 'property_service_type': obj });
    }
  }
})();
