(function() {

  'use strict';

  angular.module('app.dashboard')
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


    activate();

    function activate() {
      vm.typesList = typesRequest.data.list;
      vm.stateOptions = typesRequest.data.state_options;
      vm.propertyDetails = typesRequest.data.property_details;
      vm.typeCreationErrors = [];
    }
  }

})();
