'use strict';
/** 
 * controller for Wizard Form example
 */
angular
  .module('app.dashboard')
  .controller('PropertyViewController', ['$scope', 'PropertiesServices',
    'propertyRequest',

    function ($scope, PropertiesServices, propertyRequest) {

      var vm = this
      vm.property;
      
      activate();

      function activate() {
        vm.property = propertyRequest.data;
      }
    }
  ]);