// translate config
angular
  .module('app.shared')
  .config(['$provide', '$httpProvider',
    function ($provide, $httpProvider) {
      // http configuration start
      // register the interceptor as a service
      $provide.factory('myHttpInterceptor', [ '$q', '$translate', function ($q, $translate) {
        return {
          // // optional method
          // 'request': function (config) {
          //   // do something on success
          //   return config;
          // },

          // // optional method
          // 'requestError': function (rejection) {
          //   // do something on error
          //   // if (canRecover(rejection)) {
          //   //   return responseOrNewPromise
          //   // }
          //   return $q.reject(rejection);
          // },

          // // optional method
          // 'response': function (response) {
          //   // do something on success
          //   return response;
          // },

          // optional method
          'responseError': function (res) {
            // do something on error
            if (_.includes(res.headers('Content-Type'), 'html')) {
              // console.log('res.data', res.data);
              res.data = {
                error: $translate.instant('ERROR_' + res.status)
              }
            }
            return $q.reject(res)
          }
        };
      }]);

      $httpProvider.interceptors.push('myHttpInterceptor');
      // http configuration end
    }
  ]);