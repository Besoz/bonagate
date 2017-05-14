// service
(function() {
  'use strict';

  angular
    .module('shared_module')
    .service('decoratorService', decoratorService);

  decoratorService.$inject = [];

  function decoratorService() {

    var service = {
      getErrorsArr: getErrorsArr
    };

    return service;

    ////////////

    function getErrorsArr(errors) {

      var arr = [];

      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {

          for (var i = 0; i < errors[key].length; i++) {
            arr.push({
              item: key,
              error: errors[key][i]
            });
          }
        }
      }

      return arr;
    }
  }
})();
