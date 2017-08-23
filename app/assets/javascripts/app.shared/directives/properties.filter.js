(function() {
  'use strict';

  angular
  .module('app')
  .directive('propertiesFilter', ['GeneralDataServices', propertiesFilterDirective]);

  function propertiesFilterDirective(GeneralDataServices) {
    return {
      link: link,
      restrict: 'E',
      templateUrl: "/assets/app.shared/directives/properties.filter.html",
      scope: {
        handler: '=',
        admin: '=?',
      },
      controller: ['$scope', '$location', propertiesFilterController]
    };

    function propertiesFilterController($scope, $location) {

      var isAdmin = $scope.admin

      var config = {
        applyHistory: !isAdmin,
        serverSideFiltering: !isAdmin,
        serverClientFiltering: !!isAdmin,
      }

      var cachedProperties = [];

      activate();

      if(config.applyHistory) window.onpopstate = loadServerData;

      $scope.test = test;

      function activate(){

        $scope.handler = {
          properties: [],
          dataLoaded: false,
          goToPage: goToPage,
          pag: {
            total_pages: 1,
            current_page: 1
          },
        }

        loadServerData();
      }

      function test() {
        $location.search('y', 4);
      }

      function loadServerData() {
        GeneralDataServices
        .get(getServerFilter())
        .then(function(res) {
          cachedProperties.length = 0;
          cachedProperties = res.list;
          $scope.handler.pag.total_pages = res.total_pages;
          $scope.handler.pag.current_page = res.current_page;
          filterClientData();

          $scope.handler.dataLoaded = true;
        })
      }

      function filterClientData() {
        $scope.handler.properties = (config.serverClientFiltering)?
                                    _.filter(cachedProperties, getClientFilter()):
                                    cachedProperties;
      }

      function getServerFilter() {
        var baseUrl = '/properties.json';
        return (config.serverSideFiltering)?
          baseUrl + $location.url():
          baseUrl;
      }

      function getClientFilter() {
        return (config.serverClientFiltering)?
          function(property){return true}:
          function(property){return true}
      }

      function goToPage(page_number) {
        $location.search('page', page_number);
      }

    }

    function link(scope, element, attrs) {
        var vm = scope;
    }
  }
})();