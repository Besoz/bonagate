// service
(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .service('PaymentsServices', PaymentsServices);

  PaymentsServices.$inject = ['$http', 'GeneralDataServices'];


  function PaymentsServices($http, GeneralDataServices) {

    var service = {
      updatePayment: updatePayment,
      getPayments: getPayments,
      createPayment: createPayment,
      getPaymentsByIDS: getPaymentsByIDS
    };
    return service;

    ////////////

    function updatePayment(obj) {
      return GeneralDataServices.update('property_details', obj.id, { 'property_detail': obj });
    };

    function getPayments() {
      return GeneralDataServices.index('property_details');
    }

    function getPaymentsByIDS(IdsArray) {
      return $http.post('property_details/index_by_ids.json', { details_ids: IdsArray });
    }

    function createPayment(obj) {
      return GeneralDataServices.create('property_details', { 'property_detail': obj });
    }
  }
})();
