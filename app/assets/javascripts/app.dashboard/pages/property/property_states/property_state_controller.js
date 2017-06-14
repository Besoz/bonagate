(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyStateController', PropertyStateController);

  PropertyStateController.$inject = ['PropertyStatesServices', 'propertyState', 'formHelpers',
    'toaster', '$translate', 'decoratorService', '$filter', '$modalInstance'
  ];

  function PropertyStateController(PropertyStatesServices, propertyState, formHelpers,
    toaster, $translate, decoratorService, $filter, $modalInstance) {

    var vm = this;

    vm.dismiss = cancel;

    // creating new property state
    vm.propertyState;
    vm.submitPropertyState = submitPropertyState;
    vm.stateCreationErrors = [];

    vm.stateOptions;

    activate();

    function activate() {

      vm.propertyState = propertyState;
      vm.stateOptions = formHelpers.stateOptions;
    }

    function submitPropertyState(form) {

      vm.stateCreationErrors = [];

      if (vm.propertyState && vm.propertyState.id) {
        // already exist needs update\
        updatePropertyState(form);

      } else {
        // create new
        createPropertyState(form);
      }
    }

    function createPropertyState(form) {

      PropertyStatesServices.createPropertyState(vm.propertyState)
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

    function updatePropertyState(form) {

      PropertyStatesServices.updatePropertyState(vm.propertyState)
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
