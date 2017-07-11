// service
(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .service('DetailCategoriesServices', DetailCategoriesServices);

  DetailCategoriesServices.$inject = ['GeneralDataServices'];


  function DetailCategoriesServices(GeneralDataServices) {

    var service = {
      updateDetailCategory: updateDetailCategory,
      getDetailCategories: getDetailCategories,
      createDetailCategory: createDetailCategory
    };
    return service;

    ////////////

    function updateDetailCategory(obj) {
      return GeneralDataServices.update('property_detail_categories', obj.id, { 'property_detail_category': obj });
    };

    function getDetailCategories() {
      return GeneralDataServices.index('property_detail_categories');
    }

    function createDetailCategory(obj) {
      return GeneralDataServices.create('property_detail_categories', { 'property_detail_category': obj });
    }
  }
})();
