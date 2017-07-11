(function() {
  'use strict';

  angular
    .module('app')
    .factory('GeneralDataService', GeneralDataService);

    GeneralDataService.$inject = ['$http', '$q', '$timeout'];

/*
  options.hideLoading
  options.hideErrorMessage
*/
    function GeneralDataService($http, $q, $timeout) {
      return {
        get: function(serviceToCall, params, options) {
          return doRequest('GET', serviceToCall, params, options);
        },
        post: function(serviceToCall, params, options) {
          return doRequest('POST', serviceToCall, params, options);
        },
        put: function(serviceToCall, params, options) {
          return doRequest('PUT', serviceToCall, params, options);
        },
        delete: function(serviceToCall, params, options) {
          return doRequest('DELETE', serviceToCall, params, options);
        }
      }

      function doRequest(method, serviceToCall, params, options) {
        var completeUrl = constructURL(serviceToCall);
        params = params || {};
        options = options || {};

        if(params.constructor === (new FormData()).constructor) {
          return sendFormDataToServer(method, completeUrl, params, options);
        }else{
          return normalRequest(method, completeUrl, params, options);
        }
      }

      function normalRequest(method, completeUrl, params, options) {
        var requestObject = {};
        var httpTimeout = $q.defer();

        requestObject = {
          method: method,
          url: completeUrl,
          timeout: httpTimeout.promise
        }

        requestObject[(method == 'GET'?'params':'data')] = params;

        // if(!options.hideLoading) $ionicLoading.show();

        var request = $http(requestObject);

        var promise = request.then(
        function (response) {
          // $ionicLoading.hide();
          return response.data;
        }, function(response) {
          // $ionicLoading.hide();
          catchError(response, params, options);
          return $q.reject(response);
        })

        promise._httpTimeout = httpTimeout;

        return promise;
      }

      function sendFormDataToServer(method, completeUrl, params) {

        // $ionicLoading.show();

        return $http({
            method: method,
            url: completeUrl,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity,
            data: params
          })
          .then(
          function (response) {
            // $ionicLoading.hide();
            return response.data;
          },
          function (response) {
            // $ionicLoading.hide();
            return $q.reject(response);
          })
      }

      function constructURL (serviceToCall) {
        var completeUrl = '';
        if(!serviceToCall.startsWith('/')) completeUrl += '/';
        completeUrl += serviceToCall;
        return completeUrl;
      }

      function catchError(response, params, options) {
        console.log('catch', response);
        if(options.hideErrorMessage){
          // Do nothing
        }else if(response.status == -1){
          // MobileUtils.toast('MESSAGES.ERROR_CONNECTING');
        }else if(response.status == 500){
          // MobileUtils.toast('MESSAGES.ERROR_OCCURED_AT_SERVER');
        }
      }

    }

})();