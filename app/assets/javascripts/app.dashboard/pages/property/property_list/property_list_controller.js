(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('PropertyListController', PropertyListController);

  PropertyListController.$inject = ['$state', '$window', 'PropertiesServices',
    '$rootScope', 'toaster', '$translate', 'decoratorService', '$filter', '$modal',
    'propertiesRequest'
  ];

  function PropertyListController($state, $window, PropertiesServices,
    $rootScope, toaster, $translate, decoratorService, $filter, $modal,
    propertiesRequest) {

    var vm = this;

    vm.properties;

    activate();

    function activate() {
      vm.properties= propertiesRequest.data.list;
    }
  }
})();
