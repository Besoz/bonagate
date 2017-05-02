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
      templateUrl: "assets/dashboard/js/users/users-layout.html"
    }).state('app.users.all', {
      url: "/users",
      templateUrl: "assets/dashboard/js/users/users.html",
      controller: "UsersController",
      controllerAs: 'usersCtrl',
      resolve: {
        usersList: function($http) {
          return $http.get('/users.json');
        },
        deps: mLoadSequence('ngTable', "userServices", "usersController")
      }, // resolve: loadSequence('jquery-sparkline', 'dashboardCtrl'),
      // title: 'Dashboard',
      ncyBreadcrumb: {
        label: 'Dashboard'
      }
    }).state('app.users.edit', {
      url: '/users/edit',
      templateUrl: "assets/dashboard/views/pages_user_profile.html",
      title: 'User Profile',
      controller: "UserController",
      controllerAs: 'userCtrl',
      params: { user: null, edit: true },
      ncyBreadcrumb: {
        label: 'User Profile'
      },
      resolve: loadSequence('flow', "userServices", 'userController')
    }).state('app.ui', {
      url: '/ui',
      template: '<div ui-view class="fade-in-up"></div>',
      title: 'UI Elements',
      ncyBreadcrumb: {
        label: 'UI Elements'
      }
    }).state('app.ui.elements', {
      url: '/elements',
      templateUrl: "assets/dashboard/views/ui_elements.html",
      title: 'Elements',
      icon: 'ti-layout-media-left-alt',
      ncyBreadcrumb: {
        label: 'Elements'
      }
    }).state('app.ui.buttons', {
      url: '/buttons',
      templateUrl: "assets/dashboard/views/ui_buttons.html",
      title: 'Buttons',
      resolve: loadSequence('spin', 'ladda', 'angular-ladda', 'laddaCtrl'),
      ncyBreadcrumb: {
        label: 'Buttons'
      }
    }).state('app.ui.links', {
      url: '/links',
      templateUrl: "assets/dashboard/views/ui_links.html",
      title: 'Link Effects',
      ncyBreadcrumb: {
        label: 'Link Effects'
      }
    }).state('app.ui.icons', {
      url: '/icons',
      templateUrl: "assets/dashboard/views/ui_icons.html",
      title: 'Font Awesome Icons',
      ncyBreadcrumb: {
        label: 'Font Awesome Icons'
      },
      resolve: loadSequence('iconsCtrl')
    }).state('app.ui.lineicons', {
      url: '/line-icons',
      templateUrl: "assets/dashboard/views/ui_line_icons.html",
      title: 'Linear Icons',
      ncyBreadcrumb: {
        label: 'Linear Icons'
      },
      resolve: loadSequence('iconsCtrl')
    }).state('app.ui.modals', {
      url: '/modals',
      templateUrl: "assets/dashboard/views/ui_modals.html",
      title: 'Modals',
      ncyBreadcrumb: {
        label: 'Modals'
      },
      resolve: loadSequence('asideCtrl')
    }).state('app.ui.toggle', {
      url: '/toggle',
      templateUrl: "assets/dashboard/views/ui_toggle.html",
      title: 'Toggle',
      ncyBreadcrumb: {
        label: 'Toggle'
      }
    }).state('app.ui.tabs_accordions', {
      url: '/accordions',
      templateUrl: "assets/dashboard/views/ui_tabs_accordions.html",
      title: "Tabs & Accordions",
      ncyBreadcrumb: {
        label: 'Tabs & Accordions'
      },
      resolve: loadSequence('vAccordionCtrl')
    }).state('app.ui.panels', {
      url: '/panels',
      templateUrl: "assets/dashboard/views/ui_panels.html",
      title: 'Panels',
      ncyBreadcrumb: {
        label: 'Panels'
      }
    }).state('app.ui.notifications', {
      url: '/notifications',
      templateUrl: "assets/dashboard/views/ui_notifications.html",
      title: 'Notifications',
      ncyBreadcrumb: {
        label: 'Notifications'
      },
      resolve: loadSequence('toasterCtrl', 'sweetAlertCtrl')
    }).state('app.ui.treeview', {
      url: '/treeview',
      templateUrl: "assets/dashboard/views/ui_tree.html",
      title: 'TreeView',
      ncyBreadcrumb: {
        label: 'Treeview'
      },
      resolve: loadSequence('angularBootstrapNavTree', 'treeCtrl')
    }).state('app.ui.media', {
      url: '/media',
      templateUrl: "assets/dashboard/views/ui_media.html",
      title: 'Media',
      ncyBreadcrumb: {
        label: 'Media'
      }
    }).state('app.ui.nestable', {
      url: '/nestable2',
      templateUrl: "assets/dashboard/views/ui_nestable.html",
      title: 'Nestable List',
      ncyBreadcrumb: {
        label: 'Nestable List'
      },
      resolve: loadSequence('jquery-nestable-plugin', 'ng-nestable', 'nestableCtrl')
    }).state('app.ui.typography', {
      url: '/typography',
      templateUrl: "assets/dashboard/views/ui_typography.html",
      title: 'Typography',
      ncyBreadcrumb: {
        label: 'Typography'
      }
    }).state('app.table', {
      url: '/table',
      template: '<div ui-view class="fade-in-up"></div>',
      title: 'Tables',
      ncyBreadcrumb: {
        label: 'Tables'
      }
    }).state('app.table.basic', {
      url: '/basic',
      templateUrl: "assets/dashboard/views/table_basic.html",
      title: 'Basic Tables',
      ncyBreadcrumb: {
        label: 'Basic'
      }
    }).state('app.table.responsive', {
      url: '/responsive',
      templateUrl: "assets/dashboard/views/table_responsive.html",
      title: 'Responsive Tables',
      ncyBreadcrumb: {
        label: 'Responsive'
      }
    }).state('app.table.data', {
      url: '/data',
      templateUrl: "assets/dashboard/views/table_data.html",
      title: 'ngTable',
      ncyBreadcrumb: {
        label: 'ngTable'
      },
      resolve: loadSequence('ngTable', 'ngTableCtrl')
    }).state('app.table.export', {
      url: '/export',
      templateUrl: "assets/dashboard/views/table_export.html",
      title: 'Table'
    }).state('app.form', {
      url: '/form',
      template: '<div ui-view class="fade-in-up"></div>',
      title: 'Forms',
      ncyBreadcrumb: {
        label: 'Forms'
      }
    }).state('app.form.elements', {
      url: '/elements',
      templateUrl: "assets/dashboard/views/form_elements.html",
      title: 'Forms Elements',
      ncyBreadcrumb: {
        label: 'Elements'
      },
      resolve: loadSequence('ui.select', 'monospaced.elastic', 'ui.mask', 'touchspin-plugin', 'selectCtrl')
    }).state('app.form.xeditable', {
      url: '/xeditable',
      templateUrl: "assets/dashboard/views/form_xeditable.html",
      title: 'Angular X-Editable',
      ncyBreadcrumb: {
        label: 'X-Editable'
      },
      resolve: loadSequence('xeditable', 'checklist-model', 'xeditableCtrl')
    }).state('app.form.texteditor', {
      url: '/editor',
      templateUrl: "assets/dashboard/views/form_text_editor.html",
      title: 'Text Editor',
      ncyBreadcrumb: {
        label: 'Text Editor'
      },
      resolve: loadSequence('ckeditor-plugin', 'ckeditor', 'ckeditorCtrl')
    }).state('app.form.wizard', {
      url: '/wizard',
      templateUrl: "assets/dashboard/views/form_wizard.html",
      title: 'Form Wizard',
      ncyBreadcrumb: {
        label: 'Wizard'
      },
      resolve: loadSequence('wizardCtrl')
    }).state('app.form.validation', {
      url: '/validation',
      templateUrl: "assets/dashboard/views/form_validation.html",
      title: 'Form Validation',
      ncyBreadcrumb: {
        label: 'Validation'
      },
      resolve: loadSequence('validationCtrl')
    }).state('app.form.cropping', {
      url: '/image-cropping',
      templateUrl: "assets/dashboard/views/form_image_cropping.html",
      title: 'Image Cropping',
      ncyBreadcrumb: {
        label: 'Image Cropping'
      },
      resolve: loadSequence('ngImgCrop', 'cropCtrl')
    }).state('app.form.upload', {
      url: '/file-upload',
      templateUrl: "assets/dashboard/views/form_file_upload.html",
      title: 'Multiple File Upload',
      ncyBreadcrumb: {
        label: 'File Upload'
      },
      resolve: loadSequence('angularFileUpload', 'uploadCtrl')
    }).state('app.pages', {
      url: '/pages',
      template: '<div ui-view class="fade-in-up"></div>',
      title: 'Pages',
      ncyBreadcrumb: {
        label: 'Pages'
      }
    }).state('app.pages.user', {
      url: '/user',
      templateUrl: "assets/dashboard/views/pages_user_profile.html",
      title: 'User Profile',
      ncyBreadcrumb: {
        label: 'User Profile'
      },
      resolve: loadSequence('flow', 'userCtrl')
    }).state('app.pages.invoice', {
      url: '/invoice',
      templateUrl: "assets/dashboard/views/pages_invoice.html",
      title: 'Invoice',
      ncyBreadcrumb: {
        label: 'Invoice'
      }
    }).state('app.pages.timeline', {
      url: '/timeline',
      templateUrl: "assets/dashboard/views/pages_timeline.html",
      title: 'Timeline',
      ncyBreadcrumb: {
        label: 'Timeline'
      },
      resolve: loadSequence('ngMap')
    }).state('app.pages.calendar', {
      url: '/calendar',
      templateUrl: "assets/dashboard/views/pages_calendar.html",
      title: 'Calendar',
      ncyBreadcrumb: {
        label: 'Calendar'
      },
      resolve: loadSequence('moment', 'mwl.calendar', 'calendarCtrl')
    }).state('app.pages.messages', {
      url: '/messages',
      templateUrl: "assets/dashboard/views/pages_messages.html",
      resolve: loadSequence('truncate', 'htmlToPlaintext', 'inboxCtrl')
    }).state('app.pages.messages.inbox', {
      url: '/inbox/:inboxID',
      templateUrl: "assets/dashboard/views/pages_inbox.html",
      controller: 'ViewMessageCrtl'
    }).state('app.pages.blank', {
      url: '/blank',
      templateUrl: "assets/dashboard/views/pages_blank_page.html",
      ncyBreadcrumb: {
        label: 'Starter Page'
      }
    }).state('app.utilities', {
      url: '/utilities',
      template: '<div ui-view class="fade-in-up"></div>',
      title: 'Utilities',
      ncyBreadcrumb: {
        label: 'Utilities'
      }
    }).state('app.utilities.search', {
      url: '/search',
      templateUrl: "assets/dashboard/views/utility_search_result.html",
      title: 'Search Results',
      ncyBreadcrumb: {
        label: 'Search Results'
      }
    }).state('app.utilities.pricing', {
      url: '/pricing',
      templateUrl: "assets/dashboard/views/utility_pricing_table.html",
      title: 'Pricing Table',
      ncyBreadcrumb: {
        label: 'Pricing Table'
      }
    }).state('app.maps', {
      url: "/maps",
      templateUrl: "assets/dashboard/views/maps.html",
      resolve: loadSequence('ngMap', 'mapsCtrl'),
      title: "Maps",
      ncyBreadcrumb: {
        label: 'Maps'
      }
    }).state('app.charts', {
      url: "/charts",
      templateUrl: "assets/dashboard/views/charts.html",
      resolve: loadSequence('chartjs', 'tc.chartjs', 'chartsCtrl'),
      title: "Charts",
      ncyBreadcrumb: {
        label: 'Charts'
      }
    }).state('app.documentation', {
      url: "/documentation",
      templateUrl: "assets/dashboard/views/documentation.html",
      title: "Documentation",
      ncyBreadcrumb: {
        label: 'Documentation'
      }
    }).state('error', {
      url: '/error',
      template: '<div ui-view class="fade-in-up"></div>'
    }).state('error.404', {
      url: '/404',
      templateUrl: "assets/dashboard/views/utility_404.html",
    }).state('error.500', {
      url: '/500',
      templateUrl: "assets/dashboard/views/utility_500.html",
    })

    // Login routes

    .state('login', {
      url: '/login',
      template: '<div ui-view class="fade-in-right-big smooth"></div>',
      abstract: true
    }).state('login.signin', {
      url: '/signin',
      templateUrl: "assets/dashboard/views/login_login.html"
    }).state('login.forgot', {
      url: '/forgot',
      templateUrl: "assets/dashboard/views/login_forgot.html"
    }).state('login.registration', {
      url: '/registration',
      templateUrl: "assets/dashboard/views/login_registration.html"
    }).state('login.lockscreen', {
      url: '/lock',
      templateUrl: "assets/dashboard/views/login_lock_screen.html"
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
