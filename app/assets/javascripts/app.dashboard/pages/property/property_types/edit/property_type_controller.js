(function () {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyTypeController', PropertyTypeController);

  PropertyTypeController.$inject = ['PropertyTypesServices', 'propertyTypeRequest',
    'propertyDetailsRequest', 'toaster', '$translate', 'decoratorService', '$filter'
  ];

  function PropertyTypeController(PropertyTypesServices, propertyTypeRequest,
    propertyDetailsRequest, toaster, $translate, decoratorService, $filter) {

    var vm = this;

    // creating new property type
    vm.propertyType;
    vm.typeCreationErrors;
    vm.propertyDetailsIds;
    vm.submitPropertyType = submitPropertyType;

    vm.stateOptions;
    vm.allPropertyDetails;

    activate();

    function activate() {
      vm.typeCreationErrors = [];

      vm.propertyType = propertyTypeRequest.data;

      vm.allPropertyDetails = propertyDetailsRequest.data.list;

      // joining type's details' with all details
      for (var i = vm.allPropertyDetails.length - 1; i >= 0; i--) {
        vm.allPropertyDetails[i].checked = vm.propertyType && vm.propertyType.details_ids &&
          vm.propertyType.details_ids.includes(vm.allPropertyDetails[i].id);
      }
    }

    function getSelectedDetails() {
      return $.grep(vm.allPropertyDetails, function (detail) {
        return detail.checked == true;
      })
    }

    function submitPropertyType(form) {

      if (!form.$valid) return;

      vm.typeCreationErrors = [];

      vm.propertyType.property_details_attributes = getSelectedDetails();

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

          closeModalAndReturnResponse(res.data);

        }).catch(function (err) {
          // vm.typeCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

  }

})();