(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('DetailCategoryController', DetailCategoryController);

  DetailCategoryController.$inject = ['DetailCategoriesServices', 'detailCategory', 'formHelpers',
    'toaster', '$translate', 'decoratorService', '$filter', '$modalInstance'
  ];

  function DetailCategoryController(DetailCategorysServices, detailCategory, formHelpers,
    toaster, $translate, decoratorService, $filter, $modalInstance) {

    var vm = this;

    vm.dismiss = cancel;

    // creating new category
    vm.detailCategory;
    vm.categoryCreationErrors;
    vm.propertyDetailsIds;
    vm.submitDetailCategory = submitDetailCategory;

    vm.stateOptions;
    vm.allPropertyDetails;

    activate();

    function activate() {
      vm.categoryCreationErrors = [];

      vm.detailCategory = detailCategory;

      vm.stateOptions = formHelpers.stateOptions;
      vm.allPropertyDetails = formHelpers.propertyDetails;

      // joining category's details' with all details
      for (var i = vm.allPropertyDetails.length - 1; i >= 0; i--) {
        vm.allPropertyDetails[i].checked = vm.detailCategory && vm.detailCategory.details_ids &&
          vm.detailCategory.details_ids.includes(vm.allPropertyDetails[i].id);
      }
    }

    function getSelectedDetails() {
      return $.grep(vm.allPropertyDetails, function(detail) {
        return detail.checked == true;
      })
    }

    function submitDetailCategory(form) {

      if (!form.$valid) return;

      vm.categoryCreationErrors = [];

      vm.detailCategory.property_details_attributes = getSelectedDetails();

      if (vm.detailCategory && vm.detailCategory.id) {
        // already exist needs update\
        updateDetailCategory(form);
      } else {
        // create new
        createDetailCategory(form);
      }
    }

    function createDetailCategory(form) {

      DetailCategorysServices.createDetailCategory(vm.detailCategory)
        .then(function(res) {

          var categoryStr = $filter('translate')('activerecord.models.property_detail_category');
          var title = $filter('translate')('dashboard.success');
          var msg = $filter('translate')('dashboard.recored_created', { model: categoryStr })
          toaster.pop("success", title, msg);

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          // vm.categoryCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updateDetailCategory(form) {

      DetailCategorysServices.updateDetailCategory(vm.detailCategory)
        .then(function(res) {

          var categoryStr = $filter('translate')('activerecord.models.property_detail_category');
          var title = $filter('translate')('dashboard.success');
          toaster.pop("success", title, $filter('translate')('dashboard.recored_updated', { model: categoryStr }));

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          // vm.categoryCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
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
