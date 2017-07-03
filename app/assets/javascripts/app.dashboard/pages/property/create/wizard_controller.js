'use strict';
/** 
 * controller for Wizard Form example
 */
angular
  .module('app.dashboard')
  .controller('WizardController', ['toaster', '$scope', 'propertyTypesRequest', 'serviceTypesRequest',
    'PropertyDetailsServices', 'PropertiesServices', 'propertyStatesRequest', 'propertyStatusesRequest',
    'NgMap', 'FileUploader',

    function (toaster, $scope, propertyTypesRequest, serviceTypesRequest, PropertyDetailsServices,
      PropertiesServices, propertyStatesRequest, propertyStatusesRequest, NgMap, FileUploader) {
      var vm = this;

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
            drag: mapDrag,
            goCurrentLocation: goCurrentLocation
          }
        };

        vm.propertyTypes = propertyTypesRequest.data.list;
        vm.serviceTypes = serviceTypesRequest.data.list;
        vm.states = propertyStatesRequest.data.list;
        vm.statuses = propertyStatusesRequest.data.list;

        vm.property = {}
        vm.property.property_detail_instances_attributes = [];

        NgMap.getMap().then(function (evtMap) {
          vm.map = evtMap;
          addGeoLocationMarker(vm.map);
        });
      }

      function addGeoLocationMarker(map) {
        var options = {
          enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(function (pos) {
            vm.geolocalpoint = new google.maps.LatLng(pos.coords.latitude,
              pos.coords.longitude);

            var geolocation = new google.maps.Marker({
              position: vm.geolocalpoint,
              map: map,
              title: 'Your geolocation',
              icon: 'http://labs.google.com/ridefinder/images/mm_20_green.png'
            });

            map.setCenter(vm.geolocalpoint);
          },
          function (error) {
            alert('Unable to get location: ' + error.message);
          }, options);
      }

      function mapDrag() {
        if (vm.map) {
          vm.property.latLng = [vm.map.getCenter().lat(), vm.map.getCenter().lng()];
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
          .then(function (res) {
            vm.property.property_details = res.data.list
          }).catch(function (err) {
            console.log(err)
          })
      }

      function submit() {

        vm.property.property_type_id = vm.property.type.id
        vm.property.property_status_id = vm.property.status.id
        vm.property.property_state_id = vm.property.state.id

        PropertiesServices.createProperty(vm.property)
          .then(function (res) {

            // upload images
            console.log(res);

            Object.assign(vm.property, res.data);
            vm.uploaderImages.uploadAll();
          })
          .catch(function (err) {
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
        item.url = 'properties/'+vm.property.id+'/upload_image/';
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
      // uploaderImages.onCompleteAll = function () {
      //   console.info('onCompleteAll');
      // };

      // console.info('uploader', uploaderImages);
    }
  ]);