// translate config
angular
  .module('app.dashboard')
  .config(['$provide', '$httpProvider',
    function ($provide, $httpProvider) {
      // http configuration start
      // register the interceptor as a service
      $provide.factory('myHttpInterceptor', function ($q) {
        return {
          // optional method
          'request': function (config) {
            // do something on success
            return config;
          },

          // optional method
          'requestError': function (rejection) {
            // do something on error
            // if (canRecover(rejection)) {
            //   return responseOrNewPromise
            // }
            return $q.reject(rejection);
          },

          // optional method
          'response': function (response) {
            // do something on success
            return response;
          },

          // optional method
          'responseError': function (rejection) {
            // do something on error
            if (rejection.status == 500) {
              rejection.data = {
                server_error: [rejection.statusText]
              };
              return $q.reject(rejection)
            }
            return $q.reject(rejection);
          }
        };
      });

      $httpProvider.interceptors.push('myHttpInterceptor');
      // http configuration end
    }
  ]);