(function() {

  'use strict';

  angular.module('clipApp')
    .controller('PropertyStatusController', PropertyStatusController);

  PropertyStatusController.$inject = ['PropertyStatusesServices', 'propertyStatus', 'formHelpers',
    'toaster', '$translate', 'decoratorService', '$filter', '$modalInstance'
  ];

  function PropertyStatusController(PropertyStatusesServices, propertyStatus, formHelpers,
    toaster, $translate, decoratorService, $filter, $modalInstance) {

    var vm = this;

    vm.dismiss = cancel;

    // creating new property status
    vm.propertyStatus;
    vm.submitPropertyStatus = submitPropertyStatus;
    vm.statusCreationErrors = [];

    vm.stateOptions;

    activate();

    function activate() {

      vm.propertyStatus = propertyStatus;
      vm.stateOptions = formHelpers.stateOptions;
    }

    function submitPropertyStatus(form) {

      vm.statusCreationErrors = [];

      if (vm.propertyStatus && vm.propertyStatus.id) {
        // already exist needs update\
        updatePropertyStatus(form);

      } else {
        // create new
        createPropertyStatus(form);
      }
    }

    function createPropertyStatus(form) {

      PropertyStatusesServices.createPropertyStatus(vm.propertyStatus)
        .then(function(res) {

          var propertydStatusStr = $filter('translate')('activerecord.models.property_status');
          var title = $filter('translate')('dashboard.success');
          var msg = $filter('translate')('dashboard.recored_created', { model: propertydStatusStr })
          toaster.pop("success", title, msg);

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          vm.statusCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updatePropertyStatus(form) {

      PropertyStatusesServices.updatePropertyStatus(vm.propertyStatus)
        .then(function(res) {

          var propertydStatusStr = $filter('translate')('activerecord.models.property_status');
          var title = $filter('translate')('dashboard.success');
          toaster.pop("success", title, $filter('translate')('dashboard.recored_updated', { model: propertydStatusStr }));

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          vm.statusCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
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
