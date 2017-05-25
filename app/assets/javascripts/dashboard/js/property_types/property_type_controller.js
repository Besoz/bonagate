(function() {

  'use strict';

  angular.module('clipApp')
    .controller('PropertyTypeController', PropertyTypeController);

  PropertyTypeController.$inject = ['PropertyTypesServices', 'propertyType', 'formHelpers',
    'toaster', '$translate', 'decoratorService', '$filter', '$modalInstance'
  ];

  function PropertyTypeController(PropertyTypesServices, propertyType, formHelpers,
    toaster, $translate, decoratorService, $filter, $modalInstance) {

    var vm = this;

    vm.dismiss = cancel;

    // creating new property type
    vm.propertyType;
    vm.submitPropertyType = submitPropertyType;
    vm.typeCreationErrors = [];

    vm.stateOptions;

    activate();

    function activate() {

      vm.propertyType = propertyType;
      vm.stateOptions = formHelpers.stateOptions;
    }

    function submitPropertyType(form) {

      vm.typeCreationErrors = [];

      if (vm.propertyType && vm.propertyType.id) {
        // already exist needs update\
        updatePropertyType(form);

      } else {
        // create new
        createPropertyType(form);
      }
    }

    function createPropertyType(form) {

      PropertyTypesServices.createPropertyType(vm.propertyType)
        .then(function(res) {

          var propertydTypeStr = $filter('translate')('activerecord.models.property_type');
          var title = $filter('translate')('dashboard.success');
          var msg = $filter('translate')('dashboard.recored_created', { model: propertydTypeStr })
          toaster.pop("success", title, msg);

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          vm.typeCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updatePropertyType(form) {

      PropertyTypesServices.updatePropertyType(vm.propertyType)
        .then(function(res) {

          var propertydTypeStr = $filter('translate')('activerecord.models.property_type');
          var title = $filter('translate')('dashboard.success');
          toaster.pop("success", title, $filter('translate')('dashboard.recored_updated', { model: propertydTypeStr }));

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          vm.typeCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
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
