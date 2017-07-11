(function() {
  'use strict';

  angular
    .module('app')
    .factory('DecoratorService', DecoratorService);

    DecoratorService.$inject = [];

    function DecoratorService() {

      return {
        getErrorsTextArray: getErrorsTextArray
      }

      function getErrorsTextArray(res){
        return _.reduce(res.data, function(errorList, attributeErrors, attributeName) {
          return _.concat(errorList, attributeErrors)
        }, [])
      }

    }

})();