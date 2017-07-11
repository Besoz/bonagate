(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('DetailCategoriesController', DetailCategoriesController);

  DetailCategoriesController.$inject = ['$state', '$window', 'categoriesRequest', 'DetailCategoriesServices',
    '$rootScope', 'toaster', '$translate', 'decoratorService', '$filter', '$modal'
  ];

  function DetailCategoriesController($state, $window, categoriesRequest, DetailCategoriesServices,
    $rootScope, toaster, $translate, decoratorService, $filter, $modal) {

    var vm = this;

    vm.categoriesList;
    vm.stateOptions;
    vm.propertyDetails;

    // creating new category
    vm.newDetailCategory;
    vm.categoryCreationErrors;

    // crud category
    vm.create = create;
    vm.edit = edit;

    activate();

    function activate() {
      vm.categoriesList = categoriesRequest.data.list;
      vm.stateOptions = categoriesRequest.data.state_options;
      vm.propertyDetails = categoriesRequest.data.property_details;
      vm.categoryCreationErrors = [];
    }

    function create() {

      var modalInstance = openModal();

      modalInstance.result.then(function(createdPropCategory) {
        vm.categoriesList.push(createdPropCategory);
      }, function() {

      });
    }

    function edit(index) {

      var modalInstance = openModal(angular.copy(vm.categoriesList[index]));

      modalInstance.result.then(function(updatedPropCategory) {
        vm.categoriesList[index] = updatedPropCategory;
      }, function() {

      });
    }


    function openModal(detailCategory) {

      var modalInstance = $modal.open({
        templateUrl: 'assets/app.dashboard/pages/property/property_detail_categories/detail_category_form.html',
        controller: 'DetailCategoryController',
        controllerAs: 'categoryCtrl',
        resolve: {
          detailCategory: function() {
            return detailCategory;
          },
          formHelpers: function() {
            return {
              stateOptions: categoriesRequest.data.state_options,
              propertyDetails: vm.propertyDetails
            }
          }
        }
      });

      return modalInstance;
    }
  }

})();
