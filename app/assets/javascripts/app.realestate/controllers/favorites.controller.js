(function() {
  "use strict";

  angular
  .module('app')
  .controller('FavoritesController', FavoritesController);

  FavoritesController.$inject = ['$scope', '$rootScope', '$translate', '$http', '$location', 'decoratorService', 'GeneralDataServices', 'toaster'];

  function FavoritesController($scope, $rootScope, $translate, $http, $location, decoratorService, GeneralDataServices, toaster) {
    var vm = this;

    vm.dataLoaded = false;

    activate();
    
    var PaginationInfo = function(totalItems, currentPage, pageChangedEvent){
      this.totalItems = totalItems;
      this.currentPage = currentPage;
      this.pageChanged = pageChangedEvent
      this.maxSize = 5;
    }

    function getFavorites(pageNumber){
      vm.dataLoaded = false;
      pageNumber = pageNumber || 1
      return $http.get('/user_profile/favorites.json?page=' + pageNumber)
                .then((response) => {
                                      vm.favoriteProperties = response.data.favorites;
                                      var paginationInfo = response.data.pagination_info;
                                      vm.paginationInfo = new PaginationInfo(paginationInfo.totalItems, 
                                                                              paginationInfo.currentPage,
                                                                              pageChangedEvent);
                                      vm.dataLoaded = true;
                                  });
    }

    function loadDataFromServer(){
      var currentPage = parseInt($location.search().page)
      getFavorites(currentPage);
    }     

    function activate(){
      window.onpopstate = loadDataFromServer;
      getFavorites(parseInt($location.search().page));
    }

    function pageChangedEvent() {
      getFavorites(vm.paginationInfo.currentPage);
      $location.search('page', vm.paginationInfo.currentPage);
    }
  }
})();