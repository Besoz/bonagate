(function () {
  "use strict";

  angular
    .module('app')
    .controller('FavoritesController', FavoritesController);

  FavoritesController.$inject = ['$scope', '$rootScope', '$translate', '$http', '$location', 'decoratorService', 'GeneralDataServices', 'toaster'];

  function FavoritesController($scope, $rootScope, $translate, $http, $location, decoratorService, GeneralDataServices, toaster) {
    var vm = this;

    vm.dataLoaded = false;

    activate();
    
    var PaginationInfo = function(totalItems, currentPage, itemsPerPage,pageChangedEvent){
      this.totalItems = totalItems;
      this.currentPage = currentPage;
      this.pageChanged = pageChangedEvent;
      this.itemsPerPage = itemsPerPage;
      this.maxSize = 5;
    }

    function getFavorites(pageNumber){
      vm.dataLoaded = false;
      pageNumber = pageNumber || 1
      return $http.get('/user_profile/favorites.json?page=' + pageNumber)
                .then(function (response){
                                      vm.favoriteProperties = response.data.favorites;
                                      var paginationInfo = response.data.pagination_info;
                                      vm.paginationInfo = new PaginationInfo(paginationInfo.totalItems, 
                                                                              paginationInfo.currentPage,
                                                                              paginationInfo.itemsPerPage,
                                                                              pageChangedEvent);
                                      vm.dataLoaded = true;
                                  });
    }

    function loadDataFromServer() {
      var currentPage = parseInt($location.search().page)
      getFavorites(currentPage);
    }     

    function activate(){
      window.onpopstate = loadDataFromServer;
      loadDataFromServer();
    }

    function pageChangedEvent() {
      $location.search('page', vm.paginationInfo.currentPage);
    }
  }
})();