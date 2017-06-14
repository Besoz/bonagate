// service
(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .service('PropertyDetailsServices', PropertyDetailsServices);

  PropertyDetailsServices.$inject = ['$http', 'GeneralDataServices'];


  function PropertyDetailsServices($http, GeneralDataServices) {

    var service = {
      updatePropertyDetail: updatePropertyDetail,
      getPropertyDetails: getPropertyDetails,
      createPropertyDetail: createPropertyDetail,
      getPropertyDetailsByIDS: getPropertyDetailsByIDS
    };
    return service;

    ////////////

    function updatePropertyDetail(obj) {
      return GeneralDataServices.update('property_details', obj.id, { 'property_detail': obj });
    };

    function getPropertyDetails() {
      return GeneralDataServices.index('property_details');
    }

    function getPropertyDetailsByIDS(IdsArray) {
      return $http.post('property_details/index_by_ids.json', { details_ids: IdsArray });
    }

    function createPropertyDetail(obj) {
      return GeneralDataServices.create('property_details', { 'property_detail': obj });
    }
  }
})();
