// service
(function() {
  'use strict';

  angular
    .module('app.shared')
    .service('decoratorService', decoratorService);

  decoratorService.$inject = [];

  function decoratorService() {

    var service = {
      getErrorsAlertsArr: getErrorsAlertsArr
    };

    return service;

    ////////////

    function getErrorsAlertsArr(errors) {

      var arr = [];

      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {

          for (var i = 0; i < errors[key].length; i++) {
            arr.push({
              item: key,
              error: errors[key][i],
              type: 'danger',
              msg: errors[key][i]
            });
          }
        }
      }

      return arr;
    }
  }
})();