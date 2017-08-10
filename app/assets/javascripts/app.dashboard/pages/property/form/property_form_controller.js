'use strict';
/** 
 * controller for Wizard Form example
 */
angular
  .module('app.dashboard')
  .controller('FormWizardController', ['$scope', 'propertyTypesRequest', 'serviceTypesRequest', 'propertyStatesRequest', 'propertyStatusesRequest',
    'propertyRequest', '$state', '$stateParams',
    'PropertyWizardServices', 'propertyDetailsRequest', 'propertyDetailCategoriesRequest',  'propertyStatesHashRequest',

    function ($scope, propertyTypesRequest, serviceTypesRequest, propertyStatesRequest, propertyStatusesRequest,
      propertyRequest, $state, $stateParams, PropertyWizardServices,
      propertyDetailsRequest, propertyDetailCategoriesRequest, propertyStatesHashRequest) {

      var vm = this;

      vm.currentStep;
      vm.form;
      vm.property;
      vm.imagesUploader;

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

        vm.resetInstances = resetInstances;


        vm.propertyTypes = propertyTypesRequest.data.list;
        vm.serviceTypes = serviceTypesRequest.data.list;
        vm.states = propertyStatesRequest.data.list;
        vm.statuses = propertyStatusesRequest.data.list;
        vm.propertyDetails = propertyDetailsRequest.data.hash
        vm.propertyDetailCategories = propertyDetailCategoriesRequest.data.hash
        vm.propertyStates = propertyStatesHashRequest.data.hash

        vm.property = propertyRequest.data || {
          deleted_images_ids: [],
          property_detail_instances_attributes: [] /////
        };

        PropertyWizardServices.intializeImageUploader(vm, $state, $stateParams);
      }

      function resetInstances() {
        PropertyWizardServices.resetInstances(vm.property);
      }

      function setPropertyLocation() {
        PropertyWizardServices.setPropertyLocation(vm.property, vm.form.map.ngmap);
      }

      function gotoPropertyLocation() {
        PropertyWizardServices.gotoPropertyLocation(vm.property, vm.form.map.ngmap);
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
    }
  ]);