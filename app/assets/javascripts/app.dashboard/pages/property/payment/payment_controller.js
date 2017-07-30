(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('PaymentController', PaymentController);

  PaymentController.$inject = ['PaymentsServices', 'payment', 'formHelpers',
    'toaster', '$translate', 'decoratorService', '$filter', '$modalInstance'
  ];

  function PaymentController(PaymentsServices, payment, formHelpers,
    toaster, $translate, decoratorService, $filter, $modalInstance) {

    var vm = this;

    vm.dismiss = cancel;

    // creating new property state
    vm.payment;
    vm.submitPayment = submitPayment;
    vm.stateCreationErrors = [];

    vm.stateOptions;

    activate();

    function activate() {

      vm.payment = payment;
      vm.stateOptions = formHelpers.stateOptions;
    }

    function submitPayment(form) {

      vm.stateCreationErrors = [];

      if (vm.payment && vm.payment.id) {
        // already exist needs update\
        updatePayment(form);

      } else {
        // create new
        createPayment(form);
      }
    }

    function createPayment(form) {

      PaymentsServices.createPayment(vm.payment)
        .then(function(res) {

          var propertydStateStr = $filter('translate')('activerecord.models.property_state');
          var title = $filter('translate')('dashboard.success');
          var msg = $filter('translate')('dashboard.recored_created', { model: propertydStateStr })
          toaster.pop("success", title, msg);

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          vm.stateCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updatePayment(form) {

      PaymentsServices.updatePayment(vm.payment)
        .then(function(res) {

          var propertydStateStr = $filter('translate')('activerecord.models.property_state');
          var title = $filter('translate')('dashboard.success');
          toaster.pop("success", title, $filter('translate')('dashboard.recored_updated', { model: propertydStateStr }));

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          vm.stateCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function closeModalAndReturnResponse(object) {
      $modalInstance.close(object);
    };

    function cancel() {
      $modalInstance.dismiss('cancel');
    };

  }

})();
