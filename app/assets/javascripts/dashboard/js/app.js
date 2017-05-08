/** 
 * declare 'clip-two' module with dependencies
 */
'use strict';
angular.module("clip-two", [
  'ngAnimate',
  'ngCookies',
  'ngStorage',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'ui.bootstrap',
  'oc.lazyLoad',
  'cfp.loadingBar',
  'ncy-angular-breadcrumb',
  'duScroll',
  'pascalprecht.translate',
]).run(function($rootScope, $http) {

  $http.get('/user_sessions/current_user.json')
    .then(function(res) {
      $rootScope.currentUser = res.data;

      $rootScope.currentUser.companyAdmin = function() {
        return $rootScope.currentUser.role == "company_admin";
      };
    })
    .catch(function(err) {
      // todo consider no current user
    });


});
