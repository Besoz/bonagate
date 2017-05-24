// service
(function() {
  'use strict';

  angular
    .module('clip-two')
    .service('PropertyDetailsServices', PropertyDetailsServices);

  PropertyDetailsServices.$inject = ['$http', 'GeneralDataServices'];


  function PropertyDetailsServices($http, GeneralDataServices) {

    var service = {
      updatePropertyDetail: updatePropertyDetail,
      getPropertyDetails: getPropertyDetails,
      createPropertyDetail: createPropertyDetail
    };
    return service;

    ////////////

    function updatePropertyDetail(obj) {
      return GeneralDataServices.update('property_details', obj.id, { 'property_detail': obj });
    };

    function getPropertyDetails() {
      return GeneralDataServices.index('property_details');
    }

    function createPropertyDetail(obj) {
      return GeneralDataServices.create('property_details', { 'property_detail': obj });
    }
  }
})();
