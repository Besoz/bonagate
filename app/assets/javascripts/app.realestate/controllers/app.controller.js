(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  function AppController($translate, $rootScope, $window, $http) {

    var vm = this;
    var currentLanguage = $translate.proposedLanguage() || $translate.use();

    vm.en = false;
    vm.ar = false;
    vm.right;
    vm.left;

    vm.setLocale = setLocale;

    activate();

    function activate() {
      if(currentLanguage == 'en'){
        vm.en = true;
        vm.right = 'right';
        vm.left = 'left';
        vm.leftinline = 'leftinline';
      }else if(currentLanguage == 'ar'){
        vm.ar = true;
        vm.right = 'left';
        vm.left = 'right';
        vm.leftinline = 'rightinline';
      }
      $rootScope.right = vm.right;
      $rootScope.left = vm.left;
    }

    function setLocale(localeId) {
      if(currentLanguage != localeId) {
        $http.put('change_locale', {locale: localeId})
        .then(function() {
          $translate.use(localeId);
          $window.location.reload();
        })
      }
    }

  }

})();