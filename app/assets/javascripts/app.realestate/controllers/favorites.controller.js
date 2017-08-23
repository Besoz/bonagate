(function() {
  "use strict";

  angular
  .module('app')
  .controller('FavoritesController', FavoritesController);

  function FavoritesController($scope, $rootScope, $translate, $http, $location, decoratorService, GeneralDataServices, toaster) {
    var vm = this;
    window.onpopstate = loadDataFromServer;
    
    var PaginationInfo = function(totalItems, currentPage, pageChangedEvent){
      this.totalItems = totalItems;
      this.currentPage = currentPage;
      this.pageChanged = pageChangedEvent
      this.maxSize = 5;
      
    }

    function getFavorites(pageNumber){
      pageNumber = pageNumber || 1
      return $http.get('/user_profile/favorites.json?page=' + pageNumber)
                .then((response) => {
                                      vm.favoriteProperties = response.data.favorites;
                                      var paginationInfo = response.data.pagination_info;
                                      vm.paginationInfo = new PaginationInfo(paginationInfo.totalItems, 
                                                                              paginationInfo.currentPage,
                                                                              vm.pageChangedEvent);
                                  });

    }

    function loadDataFromServer(){
      var currentPage = parseInt($location.search().page)
      getFavorites(currentPage);
    } 

    vm.pageChangedEvent = function() {
      getFavorites(vm.paginationInfo.currentPage);
      $location.search('page', vm.paginationInfo.currentPage);
    };

    getFavorites(parseInt($location.search().page));
  }
})();