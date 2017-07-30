(function () {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyDetailController', PropertyDetailController);

  PropertyDetailController.$inject = ['PropertyDetailsServices', 'propertyDetail', 'formHelpers',
    'toaster', '$translate', 'decoratorService', '$filter', '$modalInstance', 'SweetAlert',
    'FormValidationService'
  ];

  function PropertyDetailController(PropertyDetailsServices, propertyDetail, formHelpers,
    toaster, $translate, decoratorService, $filter, $modalInstance, SweetAlert, 
    FormValidationService) {

    var vm = this;

    vm.dismiss = cancel;

    // creating new property detail
    vm.propertyDetail;
    vm.submitPropertyDetail = submitPropertyDetail;
    vm.detailCreationErrors = [];

    vm.valueTypeOptions;
    vm.categories;

    activate();

    function activate() {
      vm.propertyDetail = propertyDetail;
      vm.valueTypeOptions = formHelpers.valueTypeOptions;
      vm.categories = formHelpers.categories;
    }

    function submitPropertyDetail(form) {

      if (form.$valid) {
        vm.detailCreationErrors = [];
        if (vm.propertyDetail && vm.propertyDetail.id) { // already exist needs update
          updatePropertyDetail(form);
        } else { // create new
          createPropertyDetail(form);
        }
      } else {
        FormValidationService.validateForm(form);
      }
    }

    function createPropertyDetail(form) {
      PropertyDetailsServices.createPropertyDetail(vm.propertyDetail)
        .then(function (res) {
          toastRecoredCreated();
          closeModalAndReturnResponse(res);
        }).catch(function (err) {
          vm.detailCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function updatePropertyDetail(form) {
      PropertyDetailsServices.updatePropertyDetail(vm.propertyDetail)
        .then(function (res) {
          if (res.status == 200) { // recored updated successfuly
            toastRecoredUpdated();
            closeModalAndReturnResponse(res);
          } else { // recored cant be updated ( update will affect created properties)
            Object.assign(vm.propertyDetail, res.data);
            SweetAlert
              .swal(getUpdateWarningAlert(res.data), handelUpdateWarning);
          }
        }).catch(function (err) {
          vm.detailCreationErrors = decoratorService.getErrorsAlertsArr(err.data);
        })
    }

    function duplicatePropertyDeatil() {
      vm.propertyDetail = angular.copy(vm.propertyDetail);
      vm.propertyDetail.duplicate_detail_id = vm.propertyDetail.id;
      delete vm.propertyDetail.id;
      delete vm.propertyDetail.code;
    }

    function closeModalAndReturnResponse(res) {
      var response = {}
      response.propertyDetail = res.data;
      response.success = true;
      if (res.status == 201) {
        response.updated = false; // new recored was created
      } else {
        response.updated = true; // recored was updated
      }

      $modalInstance.close(response);
    };

    function cancel() {
      $modalInstance.dismiss('cancel');
    };

    function getUpdateWarningAlert(data) {
      return {
        title: "You can't update the value type or value options of this property detail",
        text: "Edting this property details will affect " + data.affected_types.length 
        + " property type and " + data.affected_properties.length + " property",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Create new detail",
        cancelButtonText: "No, cancel!"
      };
    }

    function handelUpdateWarning(isConfirm) {
      if (isConfirm) {
        duplicatePropertyDeatil();
      }
    }

    function toastRecoredUpdated() {
      var title = $filter('translate')('dashboard.success');
      var propertydDetailStr = $filter('translate')('activerecord.models.property_detail');
      var msg = $filter('translate')('dashboard.recored_updated', {
        model: propertydDetailStr
      });
      toaster.pop("success", title, msg);
    }

    function toastRecoredCreated() {
      var title = $filter('translate')('dashboard.success');
      var propertydDetailStr = $filter('translate')('activerecord.models.property_detail');
      var msg = $filter('translate')('dashboard.recored_created', {
        model: propertydDetailStr
      })
      toaster.pop("success", title, msg);
    }

  }

})();