(function () {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyTypeController', PropertyTypeController);

  PropertyTypeController.$inject = ['PropertyTypesServices', 'propertyTypeRequest',
    'formHelpersRequest', 'toaster', '$translate', 'decoratorService', '$filter', 
    '$state'
  ];

  function PropertyTypeController(PropertyTypesServices, propertyTypeRequest,
    formHelpersRequest, toaster, $translate, decoratorService, $filter, 
    $state) {

    var vm = this;

    // creating new property type
    vm.propertyType;
    vm.typeCreationErrors;
    vm.propertyDetailsIds;
    vm.submitPropertyType = submitPropertyType;

    vm.stateOptions;

    activate();

    function activate() {
      vm.typeCreationErrors = [];

      vm.propertyType = propertyTypeRequest.data || {};
      vm.propertyType.state_options = formHelpersRequest.data.state_options;
      
      vm.formHelpers = formHelpersRequest.data;
    }
    function submitPropertyType(form) {

      if (!form.$valid) return;

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
        .then(function (res) {

          var propertydTypeStr = $filter('translate')('activerecord.models.property_type');
          var title = $filter('translate')('dashboard.success');
          var msg = $filter('translate')('dashboard.recored_created', {
            model: propertydTypeStr
          })
          toaster.pop("success", title, msg);

          $state.go('^.list')

        }).catch(function (err) {
          // vm.typeCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updatePropertyType(form) {

      PropertyTypesServices.updatePropertyType(vm.propertyType)
        .then(function (res) {

          var propertydTypeStr = $filter('translate')('activerecord.models.property_type');
          var title = $filter('translate')('dashboard.success');
          toaster.pop("success", title, $filter('translate')('dashboard.recored_updated', {
            model: propertydTypeStr
          }));

          $state.go('^.list')

        }).catch(function (err) {
          // vm.typeCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

  }

})();