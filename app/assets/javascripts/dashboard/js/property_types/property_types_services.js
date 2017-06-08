// service
(function() {
  'use strict';

  angular
    .module('clipApp')
    .service('PropertyTypesServices', PropertyTypesServices);

  PropertyTypesServices.$inject = ['GeneralDataServices'];


  function PropertyTypesServices(GeneralDataServices) {

    var service = {
      updatePropertyType: updatePropertyType,
      getPropertyTypes: getPropertyTypes,
      createPropertyType: createPropertyType
    };
    return service;

    ////////////

    function updatePropertyType(obj) {
      return GeneralDataServices.update('property_types', obj.id, { 'property_type': obj });
    };

    function getPropertyTypes() {
      return GeneralDataServices.index('property_types');
    }

    function createPropertyType(obj) {
      return GeneralDataServices.create('property_types', { 'property_type': obj });
    }
  }
})();
