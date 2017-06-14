(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyStatusesController', PropertyStatusesController);

  PropertyStatusesController.$inject = ['$state', '$window', 'statusesRequest', 'PropertyStatusesServices',
    '$rootScope', 'toaster', '$translate', 'decoratorService', '$filter', '$modal'
  ];

  function PropertyStatusesController($state, $window, statusesRequest, PropertyStatusesServices,
    $rootScope, toaster, $translate, decoratorService, $filter, $modal) {

    var vm = this;

    vm.statusesList;
    vm.stateOptions;

    // creating new property status
    vm.newPropertyStatus;
    // vm.createPropertyStatus = createPropertyStatus;
    vm.statusCreationErrors;

    // crud property status
    vm.create = create;
    vm.edit = edit;

    activate();

    function activate() {
      vm.statusesList = statusesRequest.data.list;
      vm.stateOptions = statusesRequest.data.state_options;
      vm.statusCreationErrors = [];
    }

    function create() {

      var modalInstance = openModal();

      modalInstance.result.then(function(createdPropStatus) {
        vm.statusesList.push(createdPropStatus);
      }, function() {

      });
    }

    function edit(index) {

      var modalInstance = openModal(angular.copy(vm.statusesList[index]));

      modalInstance.result.then(function(updatedPropStatus) {
        vm.statusesList[index] = updatedPropStatus;
      }, function() {

      });
    }


    function openModal(propertyStatus) {

      var modalInstance = $modal.open({
        templateUrl: 'assets/app.dashboard/pages/property/property_statuses/property_status_form.html',
        controller: 'PropertyStatusController',
        controllerAs: 'statusCtrl',
        resolve: {
          propertyStatus: function() {
            return propertyStatus;
          },
          formHelpers: function() {
            return { stateOptions: statusesRequest.data.state_options }
          }
        }
      });

      return modalInstance;
    }
  }

})();
