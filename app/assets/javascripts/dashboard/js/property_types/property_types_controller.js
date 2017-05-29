(function() {

  'use strict';

  angular.module('clipApp')
    .controller('PropertyTypesController', PropertyTypesController);

  PropertyTypesController.$inject = ['$state', '$window', 'typesRequest', 'PropertyTypesServices',
    '$rootScope', 'toaster', '$translate', 'decoratorService', '$filter', '$modal'
  ];

  function PropertyTypesController($state, $window, typesRequest, PropertyTypesServices,
    $rootScope, toaster, $translate, decoratorService, $filter, $modal) {

    var vm = this;

    vm.typesList;
    vm.stateOptions;
    vm.propertyDetails;

    // creating new property type
    vm.newPropertyType;
    vm.typeCreationErrors;

    // crud property type
    vm.create = create;
    vm.edit = edit;

    activate();

    function activate() {
      vm.typesList = typesRequest.data.list;
      vm.stateOptions = typesRequest.data.state_options;
      vm.propertyDetails = typesRequest.data.property_details;
      vm.typeCreationErrors = [];
    }

    function create() {

      var modalInstance = openModal();

      modalInstance.result.then(function(createdPropType) {
        vm.typesList.push(createdPropType);
      }, function() {

      });
    }

    function edit(index) {

      var modalInstance = openModal(angular.copy(vm.typesList[index]));

      modalInstance.result.then(function(updatedPropType) {
        vm.typesList[index] = updatedPropType;
      }, function() {

      });
    }


    function openModal(propertyType) {

      var modalInstance = $modal.open({
        templateUrl: 'assets/dashboard/js/property_types/property_type_form.html',
        controller: 'PropertyTypeController',
        controllerAs: 'typeCtrl',
        resolve: {
          propertyType: function() {
            return propertyType;
          },
          formHelpers: function() {
            return {
              stateOptions: typesRequest.data.state_options,
              propertyDetails: vm.propertyDetails
            }
          }
        }
      });

      return modalInstance;
    }
  }

})();
