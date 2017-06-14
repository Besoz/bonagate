// service
(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .service('PropertyStatesServices', PropertyStatesServices);

  PropertyStatesServices.$inject = ['GeneralDataServices'];


  function PropertyStatesServices(GeneralDataServices) {

    var service = {
      updatePropertyState: updatePropertyState,
      getPropertyStates: getPropertyStates,
      createPropertyState: createPropertyState
    };
    return service;

    ////////////

    function updatePropertyState(obj) {
      return GeneralDataServices.update('property_states', obj.id, { 'property_state': obj });
    };

    function getPropertyStates() {
      return GeneralDataServices.index('property_states');
    }

    function createPropertyState(obj) {
      return GeneralDataServices.create('property_states', { 'property_state': obj });
    }
  }
})();
