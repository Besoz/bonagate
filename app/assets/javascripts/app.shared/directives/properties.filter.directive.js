(function () {
  'use strict';

  angular
    .module('app')
    .directive('propertiesFilter', propertiesFilterDirective);

  propertiesFilterDirective.$inject = ['$http'];

  function propertiesFilterDirective($http) {
    return {
      link: link,
      templateUrl: "/assets/app.shared/directives/properties.filter.html",
      scope: {
        api: '=',
        paginate: '=?',
      },
      bindToController: true,
      controller: 'PropertiesFilterController',
      controllerAs: 'vm'
    };

    function link(scope, element, attrs) {
      // var vm = scope;
    }
  }
})();