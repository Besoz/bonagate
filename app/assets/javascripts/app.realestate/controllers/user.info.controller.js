(function() {
  "use strict";

  angular
  .module("app")
  .controller("UserInfoController", UserInfoController);

  function UserInfoController($scope, $rootScope, $translate, decoratorService, GeneralDataServices, toaster) {
    var vm = this;

    vm.editMode = false;
    vm.editProfile = editProfile;
    vm.save = save;
    vm.changePassword = changePassword;
    vm.cancel = cancel;

    vm.currentUser = $rootScope.currentUser;
    vm.userClone;

    vm.errors = [];

    function save() {

      vm.errors.length = 0;

      GeneralDataServices
      .put('/users/' + vm.userClone.id + '.json', vm.userClone)
      .then(function(data) {
        toaster.pop(
          "success", 
          $translate.instant('dashboard.success'), 
          $translate.instant('dashboard.recored_updated', {
            model: $translate.instant('activerecord.models.user')
          })
        );
        vm.currentUser = data;
        $rootScope.currentUser = data;
        cancel();
      }).catch(function(res) {
        vm.errors = decoratorService.getErrorsTextArray(res);
      })
    }

    function changePassword() {

      vm.errors.length = 0;

      var data = {
        user: {
          current_password: vm.userClone.current_password,
          password: vm.userClone.password,
          password_confirmation: vm.userClone.password_confirmation
        }
      }

      GeneralDataServices
      .put('/users/change_password', data)
      .then(function(data) {
        toaster.pop(
          "success", 
          $translate.instant('dashboard.success'), 
          $translate.instant('dashboard.recored_updated', {
            model: $translate.instant('activerecord.models.user')
          })
        );
        delete vm.userClone.current_password
        delete vm.userClone.password
        delete vm.userClone.password_confirmation
      }).catch(function(res) {
        vm.errors = decoratorService.getErrorsTextArray(res);
      })
    }

    function cancel() {
      vm.errors.length = 0;
      vm.userClone = {};
      vm.editMode = false;
    }

    function editProfile() {
      vm.userClone = _.cloneDeep(vm.currentUser)
      vm.editMode = true;
    }

  }
})();