(function () {

  'use strict';

  angular.module('app.dashboard')
    .controller('PaymentController', PaymentController);

  PaymentController.$inject = ['PaymentsServices', 'payment', 'formHelpers',
    'toaster', '$translate', 'decoratorService', '$filter', '$modalInstance',
    '$stateParams'
  ];

  function PaymentController(PaymentsServices, payment, formHelpers,
    toaster, $translate, decoratorService, $filter, $modalInstance, $stateParams) {

    var vm = this;

    vm.dismiss = cancel;

    // creating new property state
    vm.payment;
    vm.submitPayment = submitPayment;
    vm.stateCreationErrors = [];

    vm.stateOptions;

    vm.filesUploader;

    activate();

    function activate() {

      vm.payment = payment;
      vm.payment.property_id = $stateParams.propertyId;
      vm.stateOptions = formHelpers.stateOptions;

      PaymentsServices.intializeFilesUploader(vm, function () {});
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
        .then(function (res) {

          var propertydStateStr = $filter('translate')('activerecord.models.payment');
          var title = $filter('translate')('dashboard.success');
          var msg = $filter('translate')('dashboard.recored_created', {
            model: propertydStateStr
          })
          toaster.pop("success", title, msg);

          closeModalAndReturnResponse(res.data);

        }).catch(function (err) {
          vm.stateCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updatePayment(form) {

      PaymentsServices.updatePayment(vm.payment)
        .then(function (res) {

          var propertydStateStr = $filter('translate')('activerecord.models.payment');
          var title = $filter('translate')('dashboard.success');
          toaster.pop("success", title, $filter('translate')('dashboard.recored_updated', {
            model: propertydStateStr
          }));

          closeModalAndReturnResponse(res.data);

        }).catch(function (err) {
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