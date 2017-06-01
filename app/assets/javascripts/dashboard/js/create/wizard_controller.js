'use strict';
/** 
 * controller for Wizard Form example
 */
app.controller('WizardController', ['toaster', '$scope', 'propertyTypesRequest', 'serviceTypesRequest',
  'PropertyDetailsServices', 'PropertiesServices', 'propertyStatesRequest', 'propertyStatusesRequest',

  function(toaster, $scope, propertyTypesRequest, serviceTypesRequest, PropertyDetailsServices,
    PropertiesServices, propertyStatesRequest, propertyStatusesRequest) {
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
        goTo: goTo,
        submit: submit,
        reset: reset
      };

      vm.propertyTypes = propertyTypesRequest.data.list;
      vm.serviceTypes = serviceTypesRequest.data.list;
      vm.states = propertyStatesRequest.data.list;
      vm.statuses = propertyStatusesRequest.data.list;

      vm.property = {}
      vm.property.property_detail_instances_attributes = [];
    }

    function next(form) {
      $scope.toTheTop();

      if (form.$valid) {
        nextStep();
      } else {
        var field = null,
          firstError = null;
        for (field in form) {
          if (field[0] != '$') {
            if (firstError === null && !form[field].$valid) {
              firstError = form[field].$name;
            }

            if (form[field].$pristine) {
              form[field].$dirty = true;
            }
          }
        }

        angular.element('.ng-invalid[name=' + firstError + ']').focus();
        errorMessage();
      }
    }

    function prev(form) {
      $scope.toTheTop();
      prevStep();
    }

    function goTo(form, i) {

      var currentStep = parseInt(vm.currentStep);
      var nextStep = parseInt(i)
        // general setp handeling
      if (currentStep > nextStep) {
        $scope.toTheTop();
        goToStep(i);

      } else if (currentStep == nextStep - 1) {
        if (form.$valid) {
          $scope.toTheTop();
          goToStep(i);

          loadStep(nextStep); // special step handling
        } else
          errorMessage();
      }
    }

    function loadStep(stepNumber) {
      switch (stepNumber) {
        case 2:
          loadPropertyForm();
          break;
        default:

      }
    }

    function loadPropertyForm() {
      PropertyDetailsServices.getPropertyDetailsByIDS(vm.property.type.details_ids)
        .then(function(res) {
          vm.property.property_details = res.data.list
        }).catch(function(err) {
          console.log(err)
        })
    }

    function submit() {

      vm.property.property_type_id = vm.property.type.id
      vm.property.property_status_id = vm.property.status.id
      vm.property.property_state_id = vm.property.state.id

      PropertiesServices.createProperty(vm.property)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function reset() {

    }

    function nextStep() {
      vm.currentStep++;
    };

    function prevStep() {
      vm.currentStep--;
    };

    function goToStep(i) {
      vm.currentStep = i;
    };

    function errorMessage(i) {
      toaster.pop('error', 'Error', 'please complete the form in this step before proceeding');
    };
  }
]);
