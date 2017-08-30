(function () {
  'use strict';

  angular
    .module('app')
    .controller('PropertiesFilterController', propertiesFilterController);

  propertiesFilterController.$inject = ['GeneralDataServices', '$scope', '$location', '$http'];

  function propertiesFilterController(GeneralDataServices, $scope, $location, $http) {

    var vm = this;

    var config = {
      applyHistory: !vm.paginate,
      serverSideFiltering: !vm.paginate,
      clientSideFiltering: !!vm.paginate,
    }

    var properties = [];

    activate();

    if (config.applyHistory) window.onpopstate = loadServerData;

    $scope.test = test;

    function activate() {

      console.log(vm.filterData);

      if (!vm.filterData) {
        Promise.all([GeneralDataServices.index('property_types'),
          GeneralDataServices.index('property_statuses'),
          $http.get('property_details.json'),
          $http.get('property_detail_categories/index_by_id.json'),
          $http.get('property_states/index_by_id.json'),
        ]).then(function (values) {
          vm.filterData = {
            typesArr: values[0].data.list,
            statusesArr: values[1].data.list,
            detailsArr: values[2].data.list,
            detailCategoriesHash: values[3].data.hash,
            statesHash: values[4].data.hash,
          };
        });
      }

      vm.api = {
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
        .then(function (res) {
          properties.length = 0;
          properties = res.list;
          vm.api.pag.total_pages = res.total_pages;
          vm.api.pag.current_page = res.current_page;
          filterClientData();

          vm.api.dataLoaded = true;
        })
    }

    function filterClientData() {
      vm.api.properties = (config.serverClientFiltering) ?
        _.filter(properties, getClientFilter()) :
        properties;
    }

    function getServerFilter() {
      var baseUrl = '/properties.json';
      return (config.serverSideFiltering) ?
        baseUrl + $location.url() :
        baseUrl;
    }

    function getClientFilter() {
      return (config.clientSideFiltering) ?
        function (property) {
          return true
        } :
        function (property) {
          return true
        }
    }

    function goToPage(page_number) {
      $location.search('page', page_number);
    }

  }

})();