 (function() {
   'use strict';
   var app = angular.module('auth_app');

   app.run(['$rootScope', 'RedirectService',

     function($rootScope, RedirectService) {
       $rootScope.redirectService = RedirectService;
     }
   ]);
 })();
