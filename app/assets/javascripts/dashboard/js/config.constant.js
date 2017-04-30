'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
  'desktopXL': 1200,
  'desktop': 992,
  'tablet': 768,
  'mobile': 480
});
app.constant('JS_REQUIRES', {
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
    'jquery-nestable-plugin': ['../assets/bower_components/jquery-nestable-rtl/jquery.nestable.rtl.js'],
    'touchspin-plugin': ['../assets/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', '../assets/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],

    //*** Controllers
    'dashboardCtrl': 'assets/controllers/dashboardCtrl.js',
    'iconsCtrl': 'assets/controllers/iconsCtrl.js',
    'vAccordionCtrl': 'assets/controllers/vAccordionCtrl.js',
    'ckeditorCtrl': 'assets/controllers/ckeditorCtrl.js',
    'laddaCtrl': 'assets/controllers/laddaCtrl.js',
    'ngTableCtrl': 'assets/controllers/ngTableCtrl.js',
    'cropCtrl': 'assets/controllers/cropCtrl.js',
    'asideCtrl': 'assets/controllers/asideCtrl.js',
    'toasterCtrl': 'assets/controllers/toasterCtrl.js',
    'sweetAlertCtrl': 'assets/controllers/sweetAlertCtrl.js',
    'mapsCtrl': 'assets/controllers/mapsCtrl.js',
    'chartsCtrl': 'assets/controllers/chartsCtrl.js',
    'calendarCtrl': 'assets/controllers/calendarCtrl.js',
    'nestableCtrl': 'assets/controllers/nestableCtrl.js',
    'validationCtrl': ['assets/controllers/validationCtrl.js'],
    'userCtrl': ['assets/controllers/userCtrl.js'],
    'selectCtrl': 'assets/controllers/selectCtrl.js',
    'wizardCtrl': 'assets/controllers/wizardCtrl.js',
    'uploadCtrl': 'assets/controllers/uploadCtrl.js',
    'treeCtrl': 'assets/controllers/treeCtrl.js',
    'inboxCtrl': 'assets/controllers/inboxCtrl.js',
    'xeditableCtrl': 'assets/controllers/xeditableCtrl.js',
    'chatCtrl': 'assets/controllers/chatCtrl.js',
    'usersController': 'assets/dashboard/js/users/users_controller.js',

    //*** Filters
    'htmlToPlaintext': 'assets/dashboard/js/filters/htmlToPlaintext.js'
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
    files: ['../assets/bower_components/angular-xeditable/dist/js/xeditable.min.js', '../assets/bower_components/angular-xeditable/dist/css/xeditable.css', 'assets/js/config/config-xeditable.js']
  }, {
    name: 'checklist-model',
    files: ['../assets/bower_components/checklist-model/checklist-model.js']
  }]
});
