'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
  function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

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
      templateUrl: "assets/dashboard/views/app.html",
      resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl'),
      abstract: true
    }).state('app.dashboard', {
      url: "/dashboard",
      templateUrl: "assets/dashboard/views/dashboard.html",
      resolve: loadSequence('jquery-sparkline', 'dashboardCtrl'),
      title: 'Dashboard',
      ncyBreadcrumb: {
        label: 'Dashboard'
      }
    }).state('app.users', {
      templateUrl: "assets/dashboard/js/pages/layout.html"
    }).state('app.users.all', {
      url: "/users",
      templateUrl: "assets/dashboard/js/users/users.html",
      controller: "UsersController",
      controllerAs: 'usersCtrl',
      resolve: {
        usersList: function($http) {
          return $http.get('/users.json');
        },
        deps: mLoadSequence('ui.select', 'ngTable', 'moment', 'angularMoment', "userServices", "usersController")
      }, // resolve: loadSequence('jquery-sparkline', 'dashboardCtrl'),
      // title: 'Dashboard',
      ncyBreadcrumb: {
        label: 'Dashboard'
      }
    }).state('app.users.profile', {
      url: '/users/:userId',
      templateUrl: "assets/dashboard/views/pages_user_profile.html",
      title: 'User Profile',
      controller: "UserController",
      controllerAs: 'userCtrl',
      params: { edit: null },
      ncyBreadcrumb: {
        label: 'User Profile'
      },
      resolve: {
        userRequest: function($http, $stateParams) {
          return $http.get('/users/' + $stateParams.userId + '.json');
        },
        deps: mLoadSequence('flow', "userServices", 'userController')
      }
    }).state('app.users.invitations', {
      url: "/users/invitations",
      templateUrl: "assets/dashboard/js/invitations/invitations.html",
      controller: "InvitationsController",
      controllerAs: 'invitCtrl',
      resolve: {
        invitationsList: function($http) {
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
      templateUrl: "assets/dashboard/js/pages/layout.html"
    }).state('app.companies.profile', {
      url: '/:companyId',
      templateUrl: "assets/dashboard/js/companies/company_profile.html",
      title: 'Company Profile',
      controller: "CompanyController",
      controllerAs: 'compCtrl',
      ncyBreadcrumb: {
        label: 'Company Profile'
      },
      resolve: {
        companyRequest: function($http, $stateParams) {
          return $http.get('/companies/' + $stateParams.companyId + '.json');
        },
        deps: mLoadSequence('flow', "companyServices", 'companyController')
      }
    }).state('app.property', {
      abstract: true,
      url: '/property',
      templateUrl: "assets/dashboard/js/pages/layout.html"
    }).state('app.property.create', {
      url: '/create',
      templateUrl: "assets/dashboard/js/create/form_wizard.html",
      controller: "WizardController",
      controllerAs: 'wizardCtrl',
      resolve: {
        propertyTypesRequest: function(GeneralDataServices) {
          return GeneralDataServices.index('property_types');
        },
        serviceTypesRequest: function(GeneralDataServices) {
          return GeneralDataServices.index('property_service_types');
        },
        propertyStatesRequest: function(GeneralDataServices) {
          return GeneralDataServices.index('property_states');
        },
        propertyStatusesRequest: function(GeneralDataServices) {
          return GeneralDataServices.index('property_statuses');
        },
        deps: mLoadSequence('ui.select', 'wizardController', 'propertiesServices', 'propertyDetailsServices')
      }
    }).state('app.property.details', {
      url: '/property_details',
      templateUrl: "assets/dashboard/js/property_details/property_details.html",
      controller: "PropertyDetailsController",
      controllerAs: 'detailsCtrl',
      resolve: {
        detailsRequest: function($http) {
          return $http.get('/property_details.json');
        },
        deps: mLoadSequence('ngTable', 'ui.select', "propertyDetailController",
          "propertyDetailsServices", "propertyDetailsController")
      }
    }).state('app.property.types', {
      url: '/property_types',
      templateUrl: "assets/dashboard/js/property_types/property_types.html",
      controller: "PropertyTypesController",
      controllerAs: 'typesCtrl',
      resolve: {
        typesRequest: function(GeneralDataServices) {
          return GeneralDataServices.index('property_types');
        },
        deps: mLoadSequence('ngTable', 'ui.select', "propertyTypeController",
          "propertyTypesServices", "propertyTypesController")
      }
    }).state('app.property.statuses', {
      url: '/property_statuses',
      templateUrl: "assets/dashboard/js/property_statuses/property_statuses.html",
      controller: "PropertyStatusesController",
      controllerAs: 'statusesCtrl',
      resolve: {
        statusesRequest: function(GeneralDataServices) {
          return GeneralDataServices.index('property_statuses');
        },
        deps: mLoadSequence('ngTable', 'ui.select', "propertyStatusController",
          "propertyStatusesServices", "propertyStatusesController")
      }
    }).state('app.property.states', {
      url: '/property_states',
      templateUrl: "assets/dashboard/js/property_states/property_states.html",
      controller: "PropertyStatesController",
      controllerAs: 'statesCtrl',
      resolve: {
        statesRequest: function(GeneralDataServices) {
          return GeneralDataServices.index('property_states');
        },
        deps: mLoadSequence('ngTable', 'ui.select', "propertyStateController",
          "propertyStatesServices", "propertyStatesController")
      }
    }).state('app.property.service_types', {
      url: '/property_service_types',
      templateUrl: "assets/dashboard/js/property_service_types/property_service_types.html",
      controller: "PropertyServiceTypesController",
      controllerAs: 'serviceTypesCtrl',
      resolve: {
        serviceTypesRequest: function(GeneralDataServices) {
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
          function($ocLL, $q) {
            var promise = $q.when(1);
            for (var i = 0, len = _args.length; i < len; i++) {
              promise = promiseThen(_args[i]);
            }
            return promise;

            function promiseThen(_arg) {
              if (typeof _arg == 'function')
                return promise.then(_arg);
              else
                return promise.then(function() {
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
        function($ocLL, $q) {
          var promise = $q.when(1);
          for (var i = 0, len = _args.length; i < len; i++) {
            promise = promiseThen(_args[i]);
          }
          return promise;

          function promiseThen(_arg) {
            if (typeof _arg == 'function')
              return promise.then(_arg);
            else
              return promise.then(function() {
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
