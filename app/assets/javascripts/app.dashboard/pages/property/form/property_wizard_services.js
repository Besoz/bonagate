// service
(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .service('PropertyWizardServices', PropertyWizardServices);

  PropertyWizardServices.$inject = ['PropertiesServices', 'NgMap', 'FileUploader'];


  function PropertyWizardServices(PropertiesServices, NgMap, FileUploader) {

    var TYPE_STEP = 1;
    var DETAILS_STEP = 2;
    var IMAGES_STEP = 3;
    var LOCATION_STEP = 4;
    var PUBLISH_STEP = 5;

    var service = {
      processPropertyDetails: processPropertyDetails,
      addGeoLocationMarker: addGeoLocationMarker,
      setPropertyLatLng: setPropertyLatLng,
      gotoPropertyLocation: gotoPropertyLocation,
      setPropertyLocation: setPropertyLocation,
      resetInstances: resetInstances,
      intializeImageUploader: intializeImageUploader,
      addPaymentPlan: addPaymentPlan,
      removePaymentPlan: removePaymentPlan,
      addPaymentPlanRecord: addPaymentPlanRecord,
      removePaymentPlanRecord: removePaymentPlanRecord,
      moveMap: moveMap,
      next: next,
      prev: prev,
      goto: goto,
      submit: submit
    };
    return service;

    ////////////
    function processPropertyDetails(property) {


      // extracting details id form property details instance
      property.property_detail_instances_details_ids = property.property_detail_instances_attributes.map(function (obj) {
        return obj.property_detail_id;
      });

      // extracting details id form property type
      var type_details_ids = property.type.property_details_attributes.map(function (obj) {
        return obj.id;
      });

      // finding details of the type that are missing in the property
      property.type.new_property_details_attributes = property.type.property_details_attributes.filter(function (x) {
        return property.property_detail_instances_details_ids.indexOf(x.id) < 0;
      });

      var oldDetailsCount = property.property_detail_instances_attributes.length;
      var newDetailsCount = property.type.new_property_details_attributes.length;

      // add missing details to the property
      var i = 0;
      for (i = 0; i < newDetailsCount; i++) {
        property.property_detail_instances_attributes[i + oldDetailsCount] = {}
        property.property_detail_instances_attributes[i + oldDetailsCount].property_detail_id =
          property.type.new_property_details_attributes[i].id;
        property.property_detail_instances_attributes[i + oldDetailsCount].category_id =
          property.type.new_property_details_attributes[i].property_detail_category_id;
        property.property_detail_instances_attributes[i + oldDetailsCount].new = true;
      }

      // marking details removed form the type but still used in the property
      i = 0;
      for (i = 0; i < oldDetailsCount; i++) {
        var detail_id = property.property_detail_instances_attributes[i].property_detail_id;
        if (type_details_ids.indexOf(detail_id) < 0) {
          property.property_detail_instances_attributes[i].removed = true;
        }
      }


    }

    function addGeoLocationMarker(successCallbackFn, errorCallbackFn) {
      var options = {
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(successCallbackFn,
        errorCallbackFn, options);
    }

    function setPropertyLatLng(property, lat, lng) {
      property.lat = lat;
      property.lng = lng;
    }

    function moveMap(map, geolocalpoint) {
      map.setCenter(geolocalpoint);
      map.setZoom(20);
    }


    function next(vm, form, scope) {
      scope.toTheTop();

      if (form.$valid) {
        vm.currentStep++;
      } else {
        showErrorMessage(form);
      }
    }

    function prev(vm, form, scope) {
      scope.toTheTop();
      vm.currentStep--;
    }

    function goto(vm, form, i, scope) {

      var currentStep = parseInt(vm.currentStep);
      var nextStep = parseInt(i)
      // general setp handeling
      intializeStep(vm, i);
      if (currentStep > nextStep) {
        scope.toTheTop();
        vm.currentStep = i;

      } else if (currentStep == nextStep - 1) {
        if (form.$valid) {
          scope.toTheTop();
          vm.currentStep = i;

          loadStep(vm, nextStep); // special step handling
        } else
          showErrorMessage(form);
      }
    }


    // called when moving forward to the step
    function loadStep(vm, stepNumber) {
      switch (stepNumber) {
        case 2:
          processPropertyDetails(vm.property);
          break;
        default:
      }
    }


    // called whenever opeing the step
    function intializeStep(vm, stepNumber) {
      switch (stepNumber) {
        case LOCATION_STEP:
          NgMap.getMap().then(function (evtMap) {
            vm.form.map.ngmap = evtMap;
            addGeoLocationMarker(function (pos) {
              vm.form.map.currentGeolocationPoint = new google.maps.LatLng(pos.coords.latitude,
                pos.coords.longitude);
              if (vm.property.id && vm.property.lat && vm.property.lng) {
                moveMap(vm.form.map.ngmap,
                  new google.maps.LatLng(vm.property.lat,
                    vm.property.lng));
              } else {
                moveMap(vm.form.map.ngmap,
                  vm.form.map.currentGeolocationPoint);
              }
            });
          });
          break;
        default:
      }
    }

    function updateSuccesssCallback(res, vm, stateParams, state) {
      Object.assign(vm.property, res.data);
      // upload images
      if (vm.imagesUploader.queue.length == 0) {
        state.go('^.view', {
          'propertyId': vm.property.id
        });
      } else {
        vm.imagesUploader.uploadAll();
      }
    }

    function updateErrorCallback(err) {
      console.log(err);
    }

    function submit(vm, stateParams, state) {

      decoratePropertyRequest(vm.property);

      if (vm.property.id) {
        PropertiesServices.updateProperty(vm.property)
          .then(function (res) {
            updateSuccesssCallback(res, vm, stateParams, state);
          })
          .catch(updateErrorCallback);
      } else {
        PropertiesServices.createProperty(vm.property)
          .then(function (res) {
            updateSuccesssCallback(res, vm, stateParams, state);
          })
          .catch(updateErrorCallback);
      }

    }

    function decoratePropertyRequest(property) {
      property.property_type_id = property.type.id;
      property.property_status_id = property.status.id;
      // property.property_state_id = property.state.id;
    }

    function showErrorMessage(form) {
      FormValidationService.validateForm(form);
      toaster.pop('error', 'Error', 'please complete the form in this step before proceeding');
    };

    function gotoPropertyLocation(property, ngmap) {
      if (property.lat && property.lng)
        moveMap(ngmap,
          new google.maps.LatLng(property.lat,
            property.lng));
    }

    function setPropertyLocation(property, ngmap) {
      if (ngmap && ngmap.getCenter()) {
        property.lat = ngmap.getCenter().lat();
        property.lng = ngmap.getCenter().lng();
      }
    }

    function resetInstances(property) {
      if (!property.id)
        property.property_detail_instances_attributes = [];
    }

    function intializeImageUploader(vm, state, stateParams) {
      vm.imagesUploader = new FileUploader({
        alias: 'property[property_images_attributes[avatar]]',
        method: 'put'
      });

      // FILTERS
      vm.imagesUploader.filters.push({
        name: 'imageFilter',
        fn: function (item /*{File|FileLikeObject}*/ , options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });

      vm.imagesUploader.onBeforeUploadItem = function (item) {
        item.url = 'properties/' + vm.property.id + '/upload_image/';
        // console.info('onBeforeUploadItem', item);
      };

      // TODO remove this
      vm.imagesUploader.onCompleteAll = function () {
        state.go('^.view', {
          'propertyId': stateParams.propertyId
        });
      };
    }

    function addPaymentPlan(property) {
      property.property_payment_plans_attributes = property.property_payment_plans_attributes || [];
      property.property_payment_plans_attributes.unshift({});
    }
    function removePaymentPlan(property, paymentIndex) {
      property.property_payment_plans_attributes.splice(paymentIndex, 1);
    }

    function addPaymentPlanRecord(paymentPlan) {
      paymentPlan.property_payment_plan_records_attributes = paymentPlan.property_payment_plan_records_attributes || [];
      paymentPlan.property_payment_plan_records_attributes.push({});
    }

    function removePaymentPlanRecord(paymentPlan, paymentRecordIndex) {
      paymentPlan.property_payment_plan_records_attributes.splice(paymentRecordIndex, 1);
    }
  }
})();