(function () {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyDetailsController', PropertyDetailsController);

  PropertyDetailsController.$inject = ['$state', '$window', 'detailsRequest', 'PropertyDetailsServices',
    '$rootScope', 'toaster', '$translate', 'decoratorService', '$filter', '$modal'
  ];

  function PropertyDetailsController($state, $window, detailsRequest, PropertyDetailsServices,
    $rootScope, toaster, $translate, decoratorService, $filter, $modal) {

    var vm = this;

    vm.detailsList = detailsRequest.data.list;
    vm.valueTypeOptions = detailsRequest.data.value_type_options;

    // creating new property detail
    vm.newPropertyDetail;
    // vm.createPropertyDetail = createPropertyDetail;
    vm.detailCreationErrors = [];

    // crud property detail
    vm.create = create;
    vm.edit = edit;

    activate();

    function activate() {}

    function create() {

      var modalInstance = openModal();

      modalInstance.result.then(function (res) {
        vm.detailsList.push(res.propertyDetail);
      }, function () {

      });
    }

    function edit(index) {

      var modalInstance = openModal(angular.copy(vm.detailsList[index]));

      modalInstance.result.then(function (res) {
        if(res.success){
          vm.detailsList[index] = res.propertyDetail;
        }else{
          createAsDuplicate(res);
        }
      }, function () {
      });
    }

    function createAsDuplicate(propDetail) {

      var newPorpDetail = angular.copy(propDetail);
      delete newPorpDetail.id;
      delete newPorpDetail.code;
      newPorpDetail.old_detail_id = propDetail.id;
      
      var modalInstance = openModal(newPorpDetail);

      modalInstance.result.then(function (res) {
        vm.detailsList.push(res.propertyDetail);
      }, function () {
      });
    }
    function openModal(propertyDetail) {

      var modalInstance = $modal.open({
        templateUrl: 'assets/app.dashboard/pages/property/property_details/property_detail_form.html',
        controller: 'PropertyDetailController',
        controllerAs: 'detailCtrl',
        resolve: {
          propertyDetail: function () {
            return propertyDetail;
          },
          formHelpers: function () {
            return {
              valueTypeOptions: detailsRequest.data.value_type_options
            }
          }
        }
      });

      return modalInstance;
    }
  }

})();