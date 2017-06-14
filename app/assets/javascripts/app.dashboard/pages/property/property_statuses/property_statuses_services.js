// service
(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .service('PropertyStatusesServices', PropertyStatusesServices);

  PropertyStatusesServices.$inject = ['GeneralDataServices'];


  function PropertyStatusesServices(GeneralDataServices) {

    var service = {
      updatePropertyStatus: updatePropertyStatus,
      getPropertyStatuses: getPropertyStatuses,
      createPropertyStatus: createPropertyStatus
    };
    return service;

    ////////////

    function updatePropertyStatus(obj) {
      return GeneralDataServices.update('property_statuses', obj.id, { 'property_status': obj });
    };

    function getPropertyStatuses() {
      return GeneralDataServices.index('property_statuses');
    }

    function createPropertyStatus(obj) {
      return GeneralDataServices.create('property_statuses', { 'property_status': obj });
    }
  }
})();
