(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyStatesController', PropertyStatesController);

  PropertyStatesController.$inject = ['$state', '$window', 'statesRequest', 'PropertyStatesServices',
    '$rootScope', 'toaster', '$translate', 'decoratorService', '$filter', '$modal'
  ];

  function PropertyStatesController($state, $window, statesRequest, PropertyStatesServices,
    $rootScope, toaster, $translate, decoratorService, $filter, $modal) {

    var vm = this;

    vm.statesList;
    vm.stateOptions;

    // creating new property state
    vm.newPropertyState;
    // vm.createPropertyState = createPropertyState;
    vm.stateCreationErrors;

    // crud property state
    vm.create = create;
    vm.edit = edit;

    activate();

    function activate() {
      vm.statesList = statesRequest.data.list;
      vm.stateOptions = statesRequest.data.state_options;
      vm.stateCreationErrors = [];
    }

    function create() {

      var modalInstance = openModal();

      modalInstance.result.then(function(createdPropState) {
        vm.statesList.push(createdPropState);
      }, function() {

      });
    }

    function edit(index) {

      var modalInstance = openModal(angular.copy(vm.statesList[index]));

      modalInstance.result.then(function(updatedPropState) {
        vm.statesList[index] = updatedPropState;
      }, function() {

      });
    }


    function openModal(propertyState) {

      var modalInstance = $modal.open({
        templateUrl: 'assets/app.dashboard/pages/property/property_states/property_state_form.html',
        controller: 'PropertyStateController',
        controllerAs: 'stateCtrl',
        resolve: {
          propertyState: function() {
            return propertyState;
          },
          formHelpers: function() {
            return { 
              stateOptions: statesRequest.data.state_options,
              //propertyState:
            }
          }
        }
      });

      return modalInstance;
    }
  }

})();
