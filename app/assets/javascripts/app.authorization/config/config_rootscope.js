 (function() {
   'use strict';
   var app = angular.module('app.authorization');

   app.run(['$rootScope', 'RedirectService',

     function($rootScope, RedirectService) {
       $rootScope.redirectService = RedirectService;
     }
   ]);
 })();
