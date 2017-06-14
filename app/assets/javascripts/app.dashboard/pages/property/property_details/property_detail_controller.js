(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyDetailController', PropertyDetailController);

  PropertyDetailController.$inject = ['PropertyDetailsServices', 'propertyDetail', 'formHelpers',
    'toaster', '$translate', 'decoratorService', '$filter', '$modalInstance'
  ];

  function PropertyDetailController(PropertyDetailsServices, propertyDetail, formHelpers,
    toaster, $translate, decoratorService, $filter, $modalInstance) {

    var vm = this;

    vm.dismiss = cancel;

    // creating new property detail
    vm.propertyDetail;
    vm.submitPropertyDetail = submitPropertyDetail;
    vm.detailCreationErrors = [];

    vm.valueTypeOptions;

    activate();

    function activate() {

      vm.propertyDetail = propertyDetail;
      vm.valueTypeOptions = formHelpers.valueTypeOptions;
    }

    function submitPropertyDetail(form) {

      if (form.$valid) {
        vm.detailCreationErrors = [];
        if (vm.propertyDetail && vm.propertyDetail.id) {
          // already exist needs update\
          updatePropertyDetail(form);
        } else {
          // create new
          createPropertyDetail(form);
        }
      } else {
        var field = null,
          firstError = null;
        for (field in form) {
          if (field[0] != '$') {
            if (firstError === null && !form[field].$valid) {
              firstError = form[field].$name;
            }

            if (form[field].$pristine) {
              form[field].$dirty = true;
            }
          }
        }
      }

    }

    function createPropertyDetail(form) {

      PropertyDetailsServices.createPropertyDetail(vm.propertyDetail)
        .then(function(res) {

          var propertydDetailStr = $filter('translate')('activerecord.models.property_detail');
          var title = $filter('translate')('dashboard.success');
          var msg = $filter('translate')('dashboard.recored_created', { model: propertydDetailStr })
          toaster.pop("success", title, msg);

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          vm.detailCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updatePropertyDetail(form) {

      PropertyDetailsServices.updatePropertyDetail(vm.propertyDetail)
        .then(function(res) {

          var propertydDetailStr = $filter('translate')('activerecord.models.property_detail');
          var title = $filter('translate')('dashboard.success');
          toaster.pop("success", title, $filter('translate')('dashboard.recored_updated', { model: propertydDetailStr }));

          closeModalAndReturnResponse(res.data);

        }).catch(function(err) {
          vm.detailCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
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
