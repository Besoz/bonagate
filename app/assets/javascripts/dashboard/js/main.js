var app = angular.module('clipApp', ['clip-two', 'shared_module']);
app.run(['$rootScope', '$state', '$stateParams', '$http', 'RedirectService',

  function($rootScope, $state, $stateParams, $http, RedirectService) {

    // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
    FastClick.attach(document.body);

    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
      name: 'Bonagate', // name of your project
      author: 'Accorpa', // author's name or company name
      description: 'Bonagate description', // brief description
      version: '1.0', // current version
      year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
      isMobile: (function() { // true if the browser is a mobile device
        var check = false;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          check = true;
        };
        return check;
      })(),
      layout: {
        isNavbarFixed: true, //true if you want to initialize the template with fixed header
        isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
        isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
        isFooterFixed: false, // true if you want to initialize the template with fixed footer
        theme: 'theme-1', // indicate the theme chosen for your project
        logo: 'assets/dashboard/images/logo.png', // relative path of the project logo
      }
    };
    $rootScope.user = {
      name: 'Peter',
      job: 'ng-Dev',
      picture: 'app/img/user/02.jpg'
    };

    $rootScope.redirectService = RedirectService;

    $http.get('/user_sessions/current_user.json')
      .then(function(res) {
        $rootScope.currentUser = res.data;
        // firing an event downwards

        if ($rootScope.currentUser.locale) {
          $rootScope.$broadcast('localeChanegEvent', {
            locale: $rootScope.currentUser.locale
          });
        }

        $rootScope.currentUser.companyUser = function() {
          return $rootScope.currentUser.role == "company_user";
        };

        $rootScope.currentUser.companyAdmin = function() {
          return $rootScope.currentUser.role == "company_user" &&
            $rootScope.currentUser.company.role == "company_admin";
        };
      })
      .catch(function(err) {
        // todo consider no current user
      });
  }
]);
// translate config
app.config(['$translateProvider', '$provide', '$httpProvider',
  function($translateProvider, $provide, $httpProvider) {

    // prefix and suffix information  is required to specify a pattern
    // You can simply use the static-files loader with this pattern:
    // $translateProvider.useStaticFilesLoader({
    //   prefix: 'assets/dashboard/i18n/',
    //   suffix: '.json'
    // });

    $translateProvider.useUrlLoader('/translation')

    // Since you've now registered more then one translation table, angular-translate has to know which one to use.
    // This is where preferredLanguage(langKey) comes in.
    $translateProvider.preferredLanguage('en');

    // Store the language in the local storage
    $translateProvider.useLocalStorage();


    // http configuration start
    // register the interceptor as a service
    $provide.factory('myHttpInterceptor', function($q) {
      return {
        // optional method
        'request': function(config) {
          // do something on success
          return config;
        },

        // optional method
        'requestError': function(rejection) {
          // do something on error
          // if (canRecover(rejection)) {
          //   return responseOrNewPromise
          // }
          return $q.reject(rejection);
        },



        // optional method
        'response': function(response) {
          // do something on success
          return response;
        },

        // optional method
        'responseError': function(rejection) {
          // do something on error
          if (rejection.status == 500) {
            rejection.data = { server_error: [rejection.statusText] };
            return $q.reject(rejection)
          }
          return $q.reject(rejection);
        }
      };
    });

    $httpProvider.interceptors.push('myHttpInterceptor');
    // http configuration end

  }
]);
// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
  function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;

  }
]);
