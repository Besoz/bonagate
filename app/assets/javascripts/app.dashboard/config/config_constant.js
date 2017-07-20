'use strict';

/**
 * Config constant
 */
angular
  .module('app.dashboard')
  .constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
  });
angular
  .module('app.dashboard')
  .constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
      //*** Javascript Plugins
      'modernizr': ['../assets/bower_components/components-modernizr/modernizr.js'],
      'moment': ['../assets/bower_components/moment/min/moment.min.js'],
      'spin': '../assets/bower_components/spin.js/spin.js',

      //*** jQuery Plugins
      'perfect-scrollbar-plugin': ['../assets/bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js', '../assets/bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css'],
      'ladda': ['../assets/bower_components/ladda/dist/ladda.min.js', '../assets/bower_components/ladda/dist/ladda-themeless.min.css'],
      'sweet-alert': ['../assets/bower_components/sweetalert/lib/sweet-alert.min.js', '../assets/bower_components/sweetalert/lib/sweet-alert.css'],
      'chartjs': '../assets/bower_components/chartjs/Chart.min.js',
      'jquery-sparkline': '../assets/bower_components/jquery.sparkline.build/dist/jquery.sparkline.min.js',
      'ckeditor-plugin': '../assets/bower_components/ckeditor/ckeditor.js',
      'jquery-nestable-plugin': ['../bower_components/jquery-nestable/jquery.nestable.js'],
      // 'jquery-nestable-plugin': ['../assets/bower_components/jquery-nestable-rtl/jquery.nestable.rtl.js'],
      'touchspin-plugin': ['../assets/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', '../assets/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],

      //*** App scripts
      'mainCtrl': 'assets/app.dashboard/pages/mainCtrl.js',

      //*** User scripts
      'usersController': 'assets/app.dashboard/pages/users/users_controller.js',
      'userController': 'assets/app.dashboard/pages/users/user_controller.js',
      'userServices': 'assets/app.dashboard/pages/users/user_services.js',

      //*** Company scripts
      'companyController': 'assets/app.dashboard/pages/companies/company_controller.js',
      'companyServices': 'assets/app.dashboard/pages/companies/company_services.js',

      //*** property details scripts
      'propertyDetailsController': 'assets/app.dashboard/pages/property/property_details/property_details_controller.js',
      'propertyDetailsServices': 'assets/app.dashboard/pages/property/property_details/property_details_services.js',
      'propertyDetailController': 'assets/app.dashboard/pages/property/property_details/property_detail_controller.js',

      //*** property types scripts
      'propertyTypesController': 'assets/app.dashboard/pages/property/property_types/property_types_controller.js',
      'propertyTypesServices': 'assets/app.dashboard/pages/property/property_types/property_types_services.js',
      'propertyTypeController': 'assets/app.dashboard/pages/property/property_types/edit/property_type_controller.js',

      //*** property details scripts
      'propertyServiceTypesController': 'assets/app.dashboard/pages/property/property_service_types/property_service_types_controller.js',
      'propertyServiceTypesServices': 'assets/app.dashboard/pages/property/property_service_types/property_service_types_services.js',
      'propertyServiceTypeController': 'assets/app.dashboard/pages/property/property_service_types/property_service_type_controller.js',

      //*** property details scripts
      'propertyStatesController': 'assets/app.dashboard/pages/property/property_states/property_states_controller.js',
      'propertyStatesServices': 'assets/app.dashboard/pages/property/property_states/property_states_services.js',
      'propertyStateController': 'assets/app.dashboard/pages/property/property_states/property_state_controller.js',

      //*** property details scripts
      'propertyStatusesController': 'assets/app.dashboard/pages/property/property_statuses/property_statuses_controller.js',
      'propertyStatusesServices': 'assets/app.dashboard/pages/property/property_statuses/property_statuses_services.js',
      'propertyStatusController': 'assets/app.dashboard/pages/property/property_statuses/property_status_controller.js',

      //*** property detail category scripts
      'detailCategoryController': 'assets/app.dashboard/pages/property/property_detail_categories/detail_category_controller.js',
      'detailCategoriesServices': 'assets/app.dashboard/pages/property/property_detail_categories/detail_categories_services.js',
      'detailCategoriesController': 'assets/app.dashboard/pages/property/property_detail_categories/detail_categories_controller.js',

      //*** property services scripts
      'propertiesServices': 'assets/app.dashboard/pages/property/properties_services.js',

      //*** property creation scripts
      'wizardController': 'assets/app.dashboard/pages/property/create/wizard_controller.js',

      //*** property view scripts
      'propertyViewController': 'assets/app.dashboard/pages/property/view/wizard_controller.js',

       //*** property edit scripts
      'editWizardController': 'assets/app.dashboard/pages/property/edit/wizard_controller.js',
      'propertyWizardServices': 'assets/app.dashboard/pages/property/edit/property_wizard_services.js',

       //*** property listing scripts
      'propertyListController': 'assets/app.dashboard/pages/property/property_list/property_list_controller.js',

      //*** Filters
      'htmlToPlaintext': 'assets/app.cliptwo/filters/htmlToPlaintext.js'
    },
    //*** angularJS Modules
    modules: [{
      name: 'angularMoment',
      files: ['../assets/bower_components/angular-moment/angular-moment.min.js']
    }, {
      name: 'toaster',
      files: ['../assets/bower_components/AngularJS-Toaster/toaster.js', '../assets/bower_components/AngularJS-Toaster/toaster.css']
    }, {
      name: 'angularBootstrapNavTree',
      files: ['../assets/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', '../assets/bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
      name: 'angular-ladda',
      files: ['../assets/bower_components/angular-ladda/dist/angular-ladda.min.js']
    }, {
      name: 'ngTable',
      files: ['../assets/bower_components/ng-table/dist/ng-table.min.js', '../assets/bower_components/ng-table/dist/ng-table.min.css']
    }, {
      name: 'ui.select',
      files: ['../assets/bower_components/angular-ui-select/dist/select.min.js', '../assets/bower_components/angular-ui-select/dist/select.min.css', '../assets/bower_components/select2/dist/css/select2.min.css', '../assets/bower_components/select2-bootstrap-css/select2-bootstrap.min.css', '../assets/bower_components/selectize/dist/css/selectize.bootstrap3.css']
    }, {
      name: 'ui.mask',
      files: ['../assets/bower_components/angular-ui-utils/mask.min.js']
    }, {
      name: 'ngImgCrop',
      files: ['../assets/bower_components/ngImgCrop/compile/minified/ng-img-crop.js', '../assets/bower_components/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
      name: 'angularFileUpload',
      files: ['../assets/bower_components/angular-file-upload/angular-file-upload.min.js']
    }, {
      name: 'ngAside',
      files: ['../assets/bower_components/angular-aside/dist/js/angular-aside.min.js', '../assets/bower_components/angular-aside/dist/css/angular-aside.min.css']
    }, {
      name: 'truncate',
      files: ['../assets/bower_components/angular-truncate/src/truncate.js']
    }, {
      name: 'oitozero.ngSweetAlert',
      files: ['../assets/bower_components/angular-sweetalert-promised/SweetAlert.min.js']
    }, {
      name: 'monospaced.elastic',
      files: ['../assets/bower_components/angular-elastic/elastic.js']
    }, {
      name: 'ngMap',
      files: ['../assets/bower_components/ngmap/build/scripts/ng-map.min.js']
    }, {
      name: 'tc.chartjs',
      files: ['../assets/bower_components/tc-angular-chartjs/dist/tc-angular-chartjs.min.js']
    }, {
      name: 'flow',
      files: ['../assets/bower_components/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
      name: 'uiSwitch',
      files: ['../assets/bower_components/angular-ui-switch/angular-ui-switch.min.js', '../assets/bower_components/angular-ui-switch/angular-ui-switch.min.css']
    }, {
      name: 'ckeditor',
      files: ['../assets/bower_components/angular-ckeditor/angular-ckeditor.min.js']
    }, {
      name: 'mwl.calendar',
      files: ['../assets/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar.js', '../assets/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', '../assets/bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css']
    }, {
      name: 'ng-nestable',
      files: ['../assets/bower_components/ng-nestable/src/angular-nestable.js']
    }, {
      name: 'vAccordion',
      files: ['../assets/bower_components/v-accordion/dist/v-accordion.min.js', '../assets/bower_components/v-accordion/dist/v-accordion.min.css']
    }, {
      name: 'xeditable',
      files: ['../assets/bower_components/angular-xeditable/dist/js/xeditable.min.js', '../assets/bower_components/angular-xeditable/dist/css/xeditable.css', 'assets/app.dashboard/config/config-xeditable.js']
    }, {
      name: 'checklist-model',
      files: ['../assets/bower_components/checklist-model/checklist-model.js']
    }]
  });