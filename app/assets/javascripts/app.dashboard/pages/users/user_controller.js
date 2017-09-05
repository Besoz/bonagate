(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('UserController', UserController);

  UserController.$inject = ['$http', '$window', '$stateParams', 'flowFactory',
    'UserServices', 'moment', '$rootScope', 'userRequest', 'cfpLoadingBar', 'toaster'
  ];

  function UserController($http, $window, $stateParams, flowFactory, UserServices,
    moment, $rootScope, userRequest, cfpLoadingBar, toaster) {

    var vm = this;

    vm.user;
    vm.removeImage = removeImage;
    vm.editActive;
    vm.overviewActive;
    vm.obj;
    vm.noImage;
    vm.update = update;
    vm.uploadImage = uploadImage;
    vm.deactivateUser = deactivateUser;
    vm.activateUser = activateUser;
    vm.canDisableUser = canDisableUser;

    activate();


    function activate() {

      console.log($stateParams);

      vm.obj = new Flow({
        target: '/upload',
        chunkSize: 1024 * 1024,
        testChunks: false
      });

      console.log(vm.obj);

      console.log(vm.obj);

      vm.editActive = false;


      if ($stateParams.edit) {
        vm.editActive = true;
      }

      vm.user = userRequest.data;

      // vm.user = $stateParams.user;
      if (vm.user.avatar) {
        vm.noImage = false;
      } else {
        vm.noImage = true;
      }
    }

    function removeImage() {
      vm.user.avatar = '';
    }

    function uploadImage() {

      console.log(vm.obj.files[0].file);
      cfpLoadingBar.start();

      UserServices.updateUserImage(vm.user.id, vm.obj.files[0].file)
        .then(function(res) {
          cfpLoadingBar.complete();
          console.log("res");
          console.log(res);
        })
        .catch(function(err) {
          console.log("err");
          console.log(err);
        });

    }

    function update() {
      delete vm.user.avatar;
      UserServices.updateUser(vm.user)
        .then(function(res) {
          vm.overviewActive = true;
        })
        .catch(function(err) {
          console.log("err");
          console.log(err);
        })
    }

    function deactivateUser(){
      UserServices.deactivateUser(vm.user)
        .then(function(res){
          vm.user.active = false;
          toaster.pop("success", vm.user.email + " has been deactivated");
        })
        .catch(function(err){
          console.log("err");
          console.log(err);
        });
    }

    function canDisableUser(){
      var rolesHierarchy = {
        "admin": ["company_user", "user"],
        "company_admin": ["company_user"]
      }

      var currentUser = $rootScope.currentUser;

      if(currentUser.admin())
        return rolesHierarchy["admin"].indexOf(vm.user.role) > -1;
      else if(currentUser.companyAdmin())
        return rolesHierarchy["company_admin"].indexOf(vm.user.role) > -1
                && vm.user.company && vm.user.company.role != "company_admin";
      else
        return false;
    }

    function activateUser(){
      UserServices.activateUser(vm.user)
        .then(function(res){
          vm.user.active = true;
          toaster.pop("success", vm.user.email + " has been activated");
        })
        .catch(function(err){
          console.log("err");
          console.log(err);
        });
    }
  }

})();


// 'use strict';
// /** 
//   * controller for User Profile Example
// */
// app.controller('UserCtrl', ["$scope", "flowFactory", function ($scope, flowFactory) {
//     $scope.removeImage = function () {
//         $scope.noImage = true;
//     };
//     $scope.obj = new Flow();

//     $scope.userInfo = {
//         firstName: 'Peter',
//         lastName: 'Clark',
//         url: 'www.example.com',
//         email: 'peter@example.com',
//         phone: '(641)-734-4763',
//         gender: 'male',
//         zipCode: '12345',
//         city: 'London (UK)',
//         avatar: 'assets/images/avatar-1-xl.jpg',
//         twitter: '',
//         github: '',
//         facebook: '',
//         linkedin: '',
//         google: '',
//         skype: 'peterclark82'
//     };
//     if ($scope.userInfo.avatar == '') {
//         $scope.noImage = true;
//     }
// }]);
