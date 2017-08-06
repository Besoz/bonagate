'use strict';

/**
 * Config for the router
 */
angular
  .module('app.dashboard')
  .config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

      app.controller = $controllerProvider.register;
      app.directive = $compileProvider.directive;
      app.filter = $filterProvider.register;
      app.factory = $provide.factory;
      app.service = $provide.service;
      app.constant = $provide.constant;
      app.value = $provide.value;

      // LAZY MODULES

      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
      });

      // APPLICATION ROUTES
      // -----------------------------------
      // For any unmatched url, redirect to /app/dashboard
      $urlRouterProvider.otherwise("/app/dashboard");
      //
      // Set up the states
      $stateProvider.state('app', {
        url: "/app",
        templateUrl: "assets/app.dashboard/pages/app.html",
        controller: "AppCtrl",
        resolve: loadSequence('mainCtrl', 'modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert'),
        abstract: true
      }).state('app.dashboard', {
        url: "/dashboard",
        templateUrl: "assets/app.dashboard/pages/dashboard/dashboard.html",
        resolve: loadSequence('jquery-sparkline'),
        title: 'Dashboard',
        ncyBreadcrumb: {
          label: 'Dashboard'
        }
      }).state('app.users', {
        templateUrl: "assets/app.dashboard/partials/layout.html"
      }).state('app.users.all', {
        url: "/users",
        templateUrl: "assets/app.dashboard/pages/users/users.html",
        controller: "UsersController",
        controllerAs: 'usersCtrl',
        resolve: {
          usersList: function ($http) {
            return $http.get('/users.json');
          },
          deps: mLoadSequence('ui.select', 'ngTable', 'moment', 'angularMoment', "userServices", "usersController")
        }, // resolve: loadSequence('jquery-sparkline', 'dashboardCtrl'),
        // title: 'Dashboard',
        ncyBreadcrumb: {
          label: 'Dashboard'
        }
      }).state('app.users.profile', {
        url: '/user_profile/:userId',
        templateUrl: "assets/app.dashboard/pages/users/user_profile.html",
        title: 'User Profile',
        controller: "UserController",
        controllerAs: 'userCtrl',
        params: {
          edit: null
        },
        ncyBreadcrumb: {
          label: 'User Profile'
        },
        resolve: {
          userRequest: function ($http, $stateParams) {
            return $http.get('/users/' + $stateParams.userId + '.json');
          },
          deps: mLoadSequence('flow', "userServices", 'userController')
        }
      }).state('app.users.invitations', {
        url: "/users/invitations",
        templateUrl: "assets/app.dashboard/pages/invitations/invitations.html",
        controller: "InvitationsController",
        controllerAs: 'invitCtrl',
        resolve: {
          invitationsList: function ($http) {
            return $http.get('/user_invitations.json');
          },
          deps: mLoadSequence('ngTable', 'moment', 'angularMoment', "invitationsServices", "invitationsController")
        }, // resolve: loadSequence('jquery-sparkline', 'dashboardCtrl'),
        // title: 'Dashboard',
        ncyBreadcrumb: {
          label: 'Dashboard'
        }
      }).state('app.companies', {
        abstract: true,
        url: '/companies',
        templateUrl: "assets/app.dashboard/partials/layout.html"
      }).state('app.companies.profile', {
        url: '/:companyId',
        templateUrl: "assets/app.dashboard/pages/companies/company_profile.html",
        title: 'Company Profile',
        controller: "CompanyController",
        controllerAs: 'compCtrl',
        ncyBreadcrumb: {
          label: 'Company Profile'
        },
        resolve: {
          companyRequest: function ($http, $stateParams) {
            return $http.get('/companies/' + $stateParams.companyId + '.json');
          },
          deps: mLoadSequence('flow', "companyServices", 'companyController')
        }
      }).state('app.property', {
        abstract: true,
        url: '/property',
        templateUrl: "assets/app.dashboard/partials/layout.html"
      }).state('app.property.view', {
        url: '/:propertyId/view',
        templateUrl: "assets/app.dashboard/pages/property/view/form_wizard.html",
        controller: "PropertyViewController",
        controllerAs: 'propCtrl',
        resolve: {
          propertyRequest: function (GeneralDataServices, $stateParams) {
            return GeneralDataServices.show('properties', $stateParams.propertyId);
          },
          deps: mLoadSequence('ngMap', 'ui.select', 'propertyViewController', 'propertiesServices')
        }
      }).state('app.property.edit', {
        url: '/:propertyId/edit',
        templateUrl: "assets/app.dashboard/pages/property/form/property_form_wizard.html",
        controller: "FormWizardController",
        controllerAs: 'wizardCtrl',
        resolve: {
          propertyRequest: function (GeneralDataServices, $stateParams) {
            return GeneralDataServices.show('properties', $stateParams.propertyId);
          },
          propertyTypesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_types');
          },
          serviceTypesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_service_types');
          },
          propertyStatesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_states');
          },
          propertyStatusesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_statuses');
          },
          propertyDetailsRequest: function ($http) {
            return $http.get('property_details/index_by_id.json');
          },
          propertyDetailCategoriesRequest: function ($http) {
            return $http.get('property_detail_categories/index_by_id.json');
          },
          deps: mLoadSequence('angular-filter', 'angularFileUpload', 'ngMap', 'ui.select', "propertyWizardServices",
            'propertyFormController', 'propertiesServices', 'propertyDetailsServices')
        }
      }).state('app.property.payment', {
        url: '/:propertyId/payment',
        templateUrl: "assets/app.dashboard/pages/property/payment/payments.html",
        controller: "PaymentsController",
        controllerAs: 'paymentsCtrl',
        resolve: {
          paymentsRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('payments');
          },
          deps: mLoadSequence('ngTable', 'angular-filter', 'ngFileUpload', 'angularFileUpload', 'paymentServices',
            'ui.select', "paymentController", "paymentsController")
        }
      }).state('app.property.new', {
        url: '/new',
        templateUrl: "assets/app.dashboard/pages/property/form/property_form_wizard.html",
        controller: "FormWizardController",
        controllerAs: 'wizardCtrl',
        resolve: {
          // propertyRequest: function (GeneralDataServices, $stateParams) {
          //   return GeneralDataServices.show('properties', $stateParams.propertyId);
          // },
          propertyRequest: function ($q) {
            return $q.when({
              data: null
            });
          },
          propertyTypesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_types');
          },
          serviceTypesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_service_types');
          },
          propertyStatesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_states');
          },
          propertyStatusesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_statuses');
          },
          propertyDetailsRequest: function ($http) {
            return $http.get('property_details/index_by_id.json');
          },
          propertyDetailCategoriesRequest: function ($http) {
            return $http.get('property_detail_categories/index_by_id.json');
          },
          deps: mLoadSequence('angular-filter', 'angularFileUpload', 'ngMap', 'ui.select', 'propertyWizardServices',
            'propertyFormController', 'propertiesServices', 'propertyDetailsServices')
        }
      }).state('app.property.list', {
        url: '/list',
        templateUrl: "assets/app.dashboard/pages/property/property_list/property_list.html",
        controller: "PropertyListController",
        controllerAs: 'listCtrl',
        resolve: {
          propertiesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('properties');
          },
          deps: mLoadSequence('ngTable', "propertyListController",
            "propertiesServices")
        }
      }).state('app.property.details', {
        url: '/property_details',
        templateUrl: "assets/app.dashboard/pages/property/property_details/property_details.html",
        controller: "PropertyDetailsController",
        controllerAs: 'detailsCtrl',
        resolve: {
          detailsRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_details');
          },
          deps: mLoadSequence('ngTable', 'checklist-model', 'ui.select', "propertyDetailController",
            "propertyDetailsServices", "propertyDetailsController")
        }
      }).state('app.property.detail-category', {
        url: '/detail-categories',
        templateUrl: "assets/app.dashboard/pages/property/property_detail_categories/detail_categories.html",
        controller: "DetailCategoriesController",
        controllerAs: 'categoriesCtrl',
        resolve: {
          categoriesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_detail_categories');
          },
          deps: mLoadSequence('ngTable', 'ui.select', "detailCategoryController",
            "detailCategoriesServices", "detailCategoriesController")
        }
      }).state('app.property.types', {
        url: '/property_types',
        abstract: true,
        templateUrl: "assets/app.dashboard/partials/layout.html"
      }).state('app.property.types.list', {
        url: '/property_types',
        templateUrl: "assets/app.dashboard/pages/property/property_types/property_types.html",
        controller: "PropertyTypesController",
        controllerAs: 'typesCtrl',
        resolve: {
          typesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_types');
          },
          deps: mLoadSequence('ngTable', 'ui.select',
            "propertyTypesServices", "propertyTypesController")
        }
      }).state('app.property.types.edit', {
        url: '/:typeId/edit',
        templateUrl: "assets/app.dashboard/pages/property/property_types/edit/property_type_form.html",
        controller: "PropertyTypeController",
        controllerAs: 'typeCtrl',
        resolve: {
          formHelpersRequest: function ($http) {
            return $http.get('/property_types/new.json');
          },
          propertyTypeRequest: function (GeneralDataServices, $stateParams) {
            return GeneralDataServices.show('property_types', $stateParams.typeId);
          },
          deps: mLoadSequence('checklist-model', 'ui.select', "propertyTypeController",
            "propertyTypesServices")
        }
      }).state('app.property.types.new', {
        url: '/new',
        templateUrl: "assets/app.dashboard/pages/property/property_types/edit/property_type_form.html",
        controller: "PropertyTypeController",
        controllerAs: 'typeCtrl',
        resolve: {

          propertyTypeRequest: function ($q) {
            return $q.when({
              data: null
            });
          },
          formHelpersRequest: function ($http) {
            return $http.get('/property_types/new.json');
          },
          deps: mLoadSequence('ui.select', "propertyTypeController",
            "propertyTypesServices")
        }
      }).state('app.property.statuses', {
        url: '/property_statuses',
        templateUrl: "assets/app.dashboard/pages/property/property_statuses/property_statuses.html",
        controller: "PropertyStatusesController",
        controllerAs: 'statusesCtrl',
        resolve: {
          statusesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_statuses');
          },
          deps: mLoadSequence('ngTable', 'ui.select', "propertyStatusController",
            "propertyStatusesServices", "propertyStatusesController")
        }
      }).state('app.property.states', {
        url: '/property_states',
        templateUrl: "assets/app.dashboard/pages/property/property_states/property_states.html",
        controller: "PropertyStatesController",
        controllerAs: 'statesCtrl',
        resolve: {
          statesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_states');
          },
          deps: mLoadSequence('ngTable', 'ui.select', "propertyStateController",
            "propertyStatesServices", "propertyStatesController")
        }
      }).state('app.property.service_types', {
        url: '/property_service_types',
        templateUrl: "assets/app.dashboard/pages/property/property_service_types/property_service_types.html",
        controller: "PropertyServiceTypesController",
        controllerAs: 'serviceTypesCtrl',
        resolve: {
          serviceTypesRequest: function (GeneralDataServices) {
            return GeneralDataServices.index('property_service_types');
          },
          deps: mLoadSequence('ngTable', 'ui.select', "propertyServiceTypeController",
            "propertyServiceTypesServices", "propertyServiceTypesController")
        }
      });

      // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
      function loadSequence() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad', '$q',
            function ($ocLL, $q) {
              var promise = $q.when(1);
              for (var i = 0, len = _args.length; i < len; i++) {
                promise = promiseThen(_args[i]);
              }
              return promise;

              function promiseThen(_arg) {
                if (typeof _arg == 'function')
                  return promise.then(_arg);
                else
                  return promise.then(function () {
                    var nowLoad = requiredData(_arg);
                    if (!nowLoad)
                      return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    return $ocLL.load(nowLoad);
                  });
              }

              function requiredData(name) {
                if (jsRequires.modules)
                  for (var m in jsRequires.modules)
                    if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                      return jsRequires.modules[m];
                return jsRequires.scripts && jsRequires.scripts[name];
              }
            }
          ]
        };
      }

      function mLoadSequence() {
        var _args = arguments;
        return ['$ocLazyLoad', '$q',
          function ($ocLL, $q) {
            var promise = $q.when(1);
            for (var i = 0, len = _args.length; i < len; i++) {
              promise = promiseThen(_args[i]);
            }
            return promise;

            function promiseThen(_arg) {
              if (typeof _arg == 'function')
                return promise.then(_arg);
              else
                return promise.then(function () {
                  var nowLoad = requiredData(_arg);
                  if (!nowLoad)
                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
                  return $ocLL.load(nowLoad);
                });
            }

            function requiredData(name) {
              if (jsRequires.modules)
                for (var m in jsRequires.modules)
                  if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                    return jsRequires.modules[m];
              return jsRequires.scripts && jsRequires.scripts[name];
            }
          }
        ]
      }
    }
  ]);