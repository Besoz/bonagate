(function() {



  angular.module('clip-two')
    .controller('UserController', UserController);

  UserController.$inject = ['$http', '$window', '$stateParams', 'flowFactory', 'UserServices'];

  function UserController($http, $window, $stateParams, flowFactory, UserServices) {

    var vm = this;

    vm.user;
    vm.removeImage = removeImage;
    vm.editActive;
    vm.overviewActive;
    vm.obj;
    vm.noImage;
    vm.update = update;

    activate()


    function activate() {

      console.log($stateParams);

      vm.obj = new Flow();
      vm.editActive = false;


      if ($stateParams.edit) {
        vm.editActive = true;
      }

      vm.user = {
        firstName: 'Peter',
        lastName: 'Clark',
        url: 'www.example.com',
        email: 'peter@example.com',
        phone: '(641)-734-4763',
        gender: 'male',
        zipCode: '12345',
        city: 'London (UK)',
        avatar: 'assets/images/avatar-1-xl.jpg',
        twitter: '',
        github: '',
        facebook: '',
        linkedin: '',
        google: '',
        skype: 'peterclark82'
      };

      Object.assign(vm.user, $stateParams.user);


      // vm.user = $stateParams.user;
      if (vm.user.avatar && vm.user.avatar == '') {
        vm.noImage = true;
      }


    }

    function removeImage() {
      vm.noImage = true;
    };

    function update() {
      UserServices.updateUser(vm.user)
        .then(function(res) {
          vm.overviewActive = true;
        })
        .catch(function(err) {
          console.log("err");
          console.log(err);
        })
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
