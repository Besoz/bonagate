(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyServiceTypesController', PropertyServiceTypesController);

  PropertyServiceTypesController.$inject = ['$state', '$window', 'serviceTypesRequest', 'PropertyServiceTypesServices',
    '$rootScope', 'toaster', '$translate', 'decoratorService', '$filter', '$modal'
  ];

  function PropertyServiceTypesController($state, $window, serviceTypesRequest, PropertyServiceTypesServices,
    $rootScope, toaster, $translate, decoratorService, $filter, $modal) {

    var vm = this;

    vm.serviceTypesList;
    vm.stateOptions;

    // creating new property serviceType
    vm.newPropertyServiceType;
    // vm.createPropertyServiceType = createPropertyServiceType;
    vm.serviceTypeCreationErrors;

    // crud property serviceType
    vm.create = create;
    vm.edit = edit;

    activate();

    function activate() {
      vm.serviceTypesList = serviceTypesRequest.data.list;
      vm.stateOptions = serviceTypesRequest.data.state_options;
      vm.serviceTypeCreationErrors = [];
    }

    function create() {

      var modalInstance = openModal();

      modalInstance.result.then(function(createdPropServiceType) {
        vm.serviceTypesList.push(createdPropServiceType);
      }, function() {

      });
    }

    function edit(index) {

      var modalInstance = openModal(angular.copy(vm.serviceTypesList[index]));

      modalInstance.result.then(function(updatedPropServiceType) {
        vm.serviceTypesList[index] = updatedPropServiceType;
      }, function() {

      });
    }


    function openModal(propertyServiceType) {

      var modalInstance = $modal.open({
        templateUrl: 'assets/app.dashboard/pages/property/property_service_types/property_service_type_form.html',
        controller: 'PropertyServiceTypeController',
        controllerAs: 'serviceTypeCtrl',
        resolve: {
          propertyServiceType: function() {
            return propertyServiceType;
          },
          formHelpers: function() {
            return { stateOptions: serviceTypesRequest.data.state_options }
          }
        }
      });

      return modalInstance;
    }
  }

})();
