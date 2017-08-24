'use strict';
/** 
 * controller for Wizard Form example
 */
angular
  .module('app.dashboard')
  .controller('FormWizardController', ['$scope', 'propertyTypesRequest', 'serviceTypesRequest', 'propertyStatesRequest', 'propertyStatusesRequest',
    'propertyRequest', '$state', '$stateParams', '$rootScope',
    'PropertyWizardServices', 'propertyDetailsRequest', 'propertyDetailCategoriesRequest',  'propertyStatesHashRequest',
    'propertyTemplatesRequest', 'companiesToBeSharedRequest',
    function ($scope, propertyTypesRequest, serviceTypesRequest, propertyStatesRequest, propertyStatusesRequest,
      propertyRequest, $state, $stateParams, $rootScope, PropertyWizardServices,
      propertyDetailsRequest, propertyDetailCategoriesRequest, propertyStatesHashRequest, propertyTemplatesRequest, companiesToBeSharedRequest) {

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
        vm.applyTemplate = applyTemplate;
        vm.addPaymentPlan = addPaymentPlan;
        vm.removePaymentPlan = removePaymentPlan;
        vm.addPaymentPlanRecord = addPaymentPlanRecord;
        vm.removePaymentPlanRecord = removePaymentPlanRecord;

        vm.propertyTypes = propertyTypesRequest.data.list;
        vm.serviceTypes = serviceTypesRequest.data.list;
        vm.states = propertyStatesRequest.data.list;
        vm.statuses = propertyStatusesRequest.data.list;
        vm.propertyDetails = propertyDetailsRequest.data.hash;
        vm.propertyDetailCategories = propertyDetailCategoriesRequest.data.hash;
        vm.propertyTemplates = propertyTemplatesRequest.data.list;
        vm.propertyStates = propertyStatesHashRequest.data.hash;
        vm.companiesToBeShared;

        var companies = companiesToBeSharedRequest.data.list;
        if($rootScope.currentUser.companyUser){
          var userCompanyId = $rootScope.currentUser.company.id;
          vm.companiesToBeShared = companies.filter(function (company){
            return company.id !== userCompanyId;
          })
        }
        else if($rootScope.currentUser.admin){
          vm.companiesToBeShared.companies;
        }
         
        vm.property = propertyRequest.data || {
          property_detail_instances_attributes: [],
          property_payment_plans_attributes: []
        };
        vm.property.deleted_images_ids = [];

        PropertyWizardServices.intializeImageUploader(vm, $state, $stateParams);
      }

      function applyTemplate(templateSource){
        if(templateSource){
           vm.property = angular.copy(templateSource);
           PropertyWizardServices.decoratePropertyTemplateFormJson(vm.property);
        }
      }

      function resetInstances() {
        PropertyWizardServices.resetPropertyDetailInstances(vm.property);
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

      function addPaymentPlan() {
        PropertyWizardServices.addPaymentPlan(vm.property);
      }

      function removePaymentPlan(paymentIndex) {
        PropertyWizardServices.removePaymentPlan(vm.property, paymentIndex);
      }

      function addPaymentPlanRecord(paymentPlan) {
        PropertyWizardServices.addPaymentPlanRecord(paymentPlan);
      }

      function removePaymentPlanRecord(paymentPlan, paymentRecordIndex) {
        PropertyWizardServices.removePaymentPlanRecord(paymentPlan,
          paymentRecordIndex);
      }

      function reset() {}
    }
  ]);