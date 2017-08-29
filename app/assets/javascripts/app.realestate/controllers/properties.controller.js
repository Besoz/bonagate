(function () {
  'use strict';

  angular
    .module('app')
    .controller('PropertiesController', propertiesController);

  propertiesController.$inject = ['GeneralDataServices', '$scope', '$location'];

  function propertiesController() {

    var vm = this;

    vm.propertiesFilterDirective = null;

    vm.gotoPage = gotoPage;

    activate();

    function activate() {

    }

    function gotoPage(pageNo) {
        vm.propertiesFilterDirective.goToPage(pageNo);
    }
  }

})();