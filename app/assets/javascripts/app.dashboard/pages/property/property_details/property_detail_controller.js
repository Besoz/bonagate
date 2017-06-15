(function () {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyDetailController', PropertyDetailController);

  PropertyDetailController.$inject = ['PropertyDetailsServices', 'propertyDetail', 'formHelpers',
    'toaster', '$translate', 'decoratorService', '$filter', '$modalInstance', 'SweetAlert'
  ];

  function PropertyDetailController(PropertyDetailsServices, propertyDetail, formHelpers,
    toaster, $translate, decoratorService, $filter, $modalInstance, SweetAlert) {

    var vm = this;

    vm.dismiss = cancel;

    // creating new property detail
    vm.propertyDetail;
    vm.submitPropertyDetail = submitPropertyDetail;
    vm.detailCreationErrors = [];
    vm.updateTypes = updateTypes;

    vm.valueTypeOptions;

    vm.updatePropertyTypes;

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

      if (vm.updatePropertyTypes) {
        vm.propertyDetail.update_property_types = true;
      }

      PropertyDetailsServices.createPropertyDetail(vm.propertyDetail)
        .then(function (res) {

          var propertydDetailStr = $filter('translate')('activerecord.models.property_detail');
          var title = $filter('translate')('dashboard.success');
          var msg = $filter('translate')('dashboard.recored_created', {
            model: propertydDetailStr
          })
          toaster.pop("success", title, msg);

          closeModalAndReturnResponse(res.data);

        }).catch(function (err) {
          vm.detailCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updatePropertyDetail(form) {

      PropertyDetailsServices.updatePropertyDetail(vm.propertyDetail)
        .then(function (res) {

          if (res.status == 200) {
            var propertydDetailStr = $filter('translate')('activerecord.models.property_detail');
            var title = $filter('translate')('dashboard.success');
            toaster.pop("success", title, $filter('translate')('dashboard.recored_updated', {
              model: propertydDetailStr
            }));

            closeModalAndReturnResponse(res.data);

          } else {
            var propertydDetailStr = $filter('translate')('activerecord.models.property_detail');
            var title = $filter('translate')('dashboard.success');
            var msg = $filter('translate')('dashboard.recored_created', {
              model: propertydDetailStr
            })
            toaster.pop("warning", title, msg);

            Object.assign(vm.propertyDetail, res.data);

            SweetAlert.swal({
              title: "You can't update the value type or value options of this property detail",
              text: "Edting this property details will affect " + res.data.affected_types.length + " property type and " + res.data.affected_properties.length + " property",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Create new detail",
              cancelButtonText: "No, cancel!"
            }, function (isConfirm) {
              if (isConfirm) {
                updateTypes();
              }
            });
          }

        }).catch(function (err) {
          vm.detailCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updateTypes() {
      var response = {}
      response.propertyDetail = propertyDetail;
      response.success = false;
      $modalInstance.close(response);
    }

    function closeModalAndReturnResponse(propertyDetail) {
      var response = {}
      response.propertyDetail = propertyDetail;
      response.success = true;
      $modalInstance.close(response);
    };

    function cancel() {
      $modalInstance.dismiss('cancel');
    };

  }

})();