'use strict';
/** 
 * controller for Wizard Form example
 */
angular
  .module('app.dashboard')
  .controller('EditWizardController', ['toaster', '$scope', 'propertyTypesRequest', 'serviceTypesRequest',
    'PropertyDetailsServices', 'PropertiesServices', 'propertyStatesRequest', 'propertyStatusesRequest',
    'NgMap', 'FileUploader', 'propertyRequest', '$state', '$stateParams', 'FormValidationService',
    'PropertyWizardServices', 'propertyDetailsRequest', 'propertyDetailCategoriesRequest',

    function (toaster, $scope, propertyTypesRequest, serviceTypesRequest, PropertyDetailsServices,
      PropertiesServices, propertyStatesRequest, propertyStatusesRequest, NgMap, FileUploader,
      propertyRequest, $state, $stateParams, FormValidationService, PropertyWizardServices,
      propertyDetailsRequest, propertyDetailCategoriesRequest) {

      var vm = this;

      
      vm.currentStep;
      vm.form;

      vm.property;

      activate();

      function activate() {
        // Initial Value
        vm.currentStep = 1;

        vm.form = {
          next: next,
          prev: prev,
          goto: goto,
          submit: submit,
          reset: reset,
          map: {
            goCurrentLocation: goCurrentLocation,
            setPropertyLocation: setPropertyLocation,
            gotoPropertyLocation: gotoPropertyLocation,
            ngmap: null,
            currentGeolocationPoint: null
          }
        };

        vm.propertyTypes = propertyTypesRequest.data.list;
        vm.serviceTypes = serviceTypesRequest.data.list;
        vm.states = propertyStatesRequest.data.list;
        vm.statuses = propertyStatusesRequest.data.list;
        vm.propertyDetails = propertyDetailsRequest.data.hash
        vm.propertyDetailCategories = propertyDetailCategoriesRequest.data.hash

        vm.property = propertyRequest.data || {
          deleted_images_ids: [],
          property_detail_instances_attributes: [] /////
        };

        vm.resetInstances = resetInstances;

      }

      function resetInstances() {
        if (!vm.property.id)
          vm.property.property_detail_instances_attributes = [];
      }

      function setPropertyLocation() {
        if (vm.form.map.ngmap && vm.form.map.ngmap.getCenter()) {
          vm.property.lat = vm.form.map.ngmap.getCenter().lat();
          vm.property.lng = vm.form.map.ngmap.getCenter().lng();
        }
      }

      function gotoPropertyLocation() {
        if (vm.property.lat && vm.property.lng)
          PropertyWizardServices.moveMap(vm.form.map.ngmap,
            new google.maps.LatLng(vm.property.lat,
              vm.property.lng));
      }

      function goCurrentLocation() {
        PropertyWizardServices.moveMap(vm.form.map.ngmap,
          vm.form.map.currentGeolocationPoint);
      }

      function next(form) {
        PropertyWizardServices.next(vm, form, $scope);
      }

      function prev(form) {
        PropertyWizardServices.prev(vm, form, $scope);
      }

      function goto(form, i) {
        PropertyWizardServices.goto(vm, form, i, $scope);
      }

      function submit() {
        PropertyWizardServices.submit(vm, $stateParams, $state);
      }

      function reset() {}

      var uploaderImages = vm.uploaderImages = new FileUploader({
        alias: 'property[property_images_attributes[avatar]]',
        method: 'put'
      });

      // FILTERS

      uploaderImages.filters.push({
        name: 'imageFilter',
        fn: function (item /*{File|FileLikeObject}*/ , options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });

      vm.uploaderImages.onBeforeUploadItem = function (item) {
        item.url = 'properties/' + vm.property.id + '/upload_image/';
        // console.info('onBeforeUploadItem', item);
      };

      vm.uploaderImages.onCompleteAll = function () {
        $state.go('^.view', {
          'propertyId': $stateParams.propertyId
        });
      };

      // console.info('uploader', uploaderImages);
    }
  ]);