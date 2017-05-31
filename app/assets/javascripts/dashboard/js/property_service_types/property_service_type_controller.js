(function() {

  'use strict';

  angular.module('clipApp')
    .controller('PropertyServiceTypeController', PropertyServiceTypeController);

  PropertyServiceTypeController.$inject = ['PropertyServiceTypesServices', 'propertyServiceType', 'formHelpers',
    'toaster', '$translate', 'decoratorService', '$filter', '$modalInstance'
  ];

  function PropertyServiceTypeController(PropertyServiceTypesServices, propertyServiceType, formHelpers,
    toaster, $translate, decoratorService, $filter, $modalInstance) {

    var vm = this;

    vm.dismiss = cancel;

    // creating new property serviceType
    vm.propertyServiceType;
    vm.submitPropertyServiceType = submitPropertyServiceType;
    vm.serviceTypeCreationErrors = [];

    vm.stateOptions;

    activate();

    function activate() {

      vm.propertyServiceType = propertyServiceType;
      vm.stateOptions = formHelpers.stateOptions;
    }

    function submitPropertyServiceType(form) {

      vm.serviceTypeCreationErrors = [];

      if (vm.propertyServiceType && vm.propertyServiceType.id) {
        // already exist needs update\
        updatePropertyServiceType(form);

      } else {
        // create new
        createPropertyServiceType(form);
      }
    }

    function createPropertyServiceType(form) {

      PropertyServiceTypesServices.createPropertyServiceType(vm.propertyServiceType)
        .then(function(res) {

          var propertydServiceTypeStr = $filter('translate')('activerecord.models.property_serviceType');
          var title = $filter('translate')('dashboard.success');
          var msg = $filter('translate')('dashboard.recored_created', { model: propertydServiceTypeStr })
          toaster.pop("success", title, msg);

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          vm.serviceTypeCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updatePropertyServiceType(form) {

      PropertyServiceTypesServices.updatePropertyServiceType(vm.propertyServiceType)
        .then(function(res) {

          var propertydServiceTypeStr = $filter('translate')('activerecord.models.property_serviceType');
          var title = $filter('translate')('dashboard.success');
          toaster.pop("success", title, $filter('translate')('dashboard.recored_updated', { model: propertydServiceTypeStr }));

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          vm.serviceTypeCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
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
