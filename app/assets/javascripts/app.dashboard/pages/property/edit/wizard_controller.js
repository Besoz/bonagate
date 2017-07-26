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

      vm.TYPE_STEP = 1;
      vm.DETAILS_STEP = 2;
      vm.IMAGES_STEP = 3;
      vm.LOCATION_STEP = 4;
      vm.PUBLISH_STEP = 5;

      vm.currentStep;
      vm.form;

      vm.property;

      vm.map;

      activate();

      function activate() {
        // Initial Value
        vm.currentStep = 1;

        vm.form = {
          next: next,
          prev: prev,
          goTo: goTo,
          submit: submit,
          reset: reset,
          map: {
            centerChanged: centerChanged,
            goCurrentLocation: goCurrentLocation
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
          property_detail_instances_attributes: []/////
        };

      }

      function addGeoLocationMarker(map) {
        var options = {
          enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(function (pos) {

            vm.geolocalpoint = new google.maps.LatLng(pos.coords.latitude,
              pos.coords.longitude);

            if (!vm.geolocationMarker) {
              vm.geolocationMarker = new google.maps.Marker({
                position: vm.geolocalpoint,
                map: map,
                title: 'Your geolocation',
                icon: 'http://labs.google.com/ridefinder/images/mm_20_green.png'
              });

            } else {
              vm.geolocationMarker.position = vm.geolocalpoint;
            }
          },
          function (error) {
            alert('Unable to get location: ' + error.message);
          }, options);
      }

      function centerChanged() {
        if (vm.map && vm.map.getCenter()) {
          vm.property.lat = vm.map.getCenter().lat()
          vm.property.lng = vm.map.getCenter().lng();
        }
      }

      function goCurrentLocation() {
        vm.map.setCenter(vm.geolocalpoint);
        vm.map.setZoom(20);
      }

      function next(form) {
        $scope.toTheTop();

        if (form.$valid) {
          nextStep();
        } else {
          showErrorMessage(form);
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
        intializeStep(i);
        if (currentStep > nextStep) {
          $scope.toTheTop();
          goToStep(i);

        } else if (currentStep == nextStep - 1) {
          if (form.$valid) {
            $scope.toTheTop();
            goToStep(i);

            loadStep(nextStep); // special step handling
          } else
            showErrorMessage(form);
        }
      }

      // called when moving forward to the step
      function loadStep(stepNumber) {
        switch (stepNumber) {
          case 2:
            PropertyWizardServices.processPropertyDetails(vm.property);
            break;
          default:
        }
      }

      // called whenever opeing the step
      function intializeStep(stepNumber) {
        switch (stepNumber) {
          case vm.LOCATION_STEP:
            NgMap.getMap().then(function (evtMap) {
              vm.map = evtMap;
              addGeoLocationMarker(vm.map);
              vm.map.setCenter(google.maps.LatLng(vm.property.lat,
                vm.property.lng));
            });
            break;
          default:
        }
      }

      function processPropertyDetails() {
        
      }

      function submit() {
        decoratePropertyRequest();

        PropertiesServices.updateProperty(vm.property)
          .then(function (res) {
            Object.assign(vm.property, res.data);
            // upload images
            if (vm.uploaderImages.queue.length == 0) {
              $state.go('^.view', {
                'propertyId': $stateParams.propertyId
              });
            } else {
              vm.uploaderImages.uploadAll();
            }

          })
          .catch(function (err) {
            console.log(err);
          });
      }

      function decoratePropertyRequest() {
        vm.property.property_type_id = vm.property.type.id;
        vm.property.property_status_id = vm.property.status.id;
        vm.property.property_state_id = vm.property.state.id;
      }

      function reset() {}

      function nextStep() {
        vm.currentStep++;
      };

      function prevStep() {
        vm.currentStep--;
      };

      function goToStep(i) {
        vm.currentStep = i;
      };

      function showErrorMessage(form) {
        FormValidationService.validateForm(form);
        toaster.pop('error', 'Error', 'please complete the form in this step before proceeding');
      };

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

      // CALLBACKS

      // uploaderImages.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/ , filter, options) {
      //   console.info('onWhenAddingFileFailed', item, filter, options);
      // };
      // uploaderImages.onAfterAddingFile = function (fileItem) {
      //   console.info('onAfterAddingFile', fileItem);
      // };
      // uploaderImages.onAfterAddingAll = function (addedFileItems) {
      //   console.info('onAfterAddingAll', addedFileItems);
      // };
      vm.uploaderImages.onBeforeUploadItem = function (item) {
        item.url = 'properties/' + vm.property.id + '/upload_image/';
        // console.info('onBeforeUploadItem', item);
      };
      // uploaderImages.onProgressItem = function (fileItem, progress) {
      //   console.info('onProgressItem', fileItem, progress);
      // };
      // uploaderImages.onProgressAll = function (progress) {
      //   console.info('onProgressAll', progress);
      // };
      // uploaderImages.onSuccessItem = function (fileItem, response, status, headers) {
      //   console.info('onSuccessItem', fileItem, response, status, headers);
      // };
      // uploaderImages.onErrorItem = function (fileItem, response, status, headers) {
      //   // console.log('onErrorItem', fileItem, response, status, headers);
      // };
      // uploaderImages.onCancelItem = function (fileItem, response, status, headers) {
      //   console.info('onCancelItem', fileItem, response, status, headers);
      // };
      // uploaderImages.onCompleteItem = function (fileItem, response, status, headers) {
      //   console.info('onCompleteItem', fileItem, response, status, headers);
      // };
      vm.uploaderImages.onCompleteAll = function () {
        $state.go('^.view', {
          'propertyId': $stateParams.propertyId
        });
      };

      // console.info('uploader', uploaderImages);
    }
  ]);