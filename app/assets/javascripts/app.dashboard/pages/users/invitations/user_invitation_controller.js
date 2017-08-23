(function() {

  'use strict';

  angular.module('app.dashboard')
    .controller('UserInvitationController', UserInvitationController);

  UserInvitationController.$inject = ['$state', '$window', 'UserServices', '$rootScope', 'toaster', '$translate', 
    '$modalInstance'];

  function UserInvitationController($state, $window, UserServices, $rootScope, toaster, $translate, $modalInstance) {

    var vm = this;

    // invitations
    vm.inviteUser = inviteUser;
    vm.userInvitation;
    vm.invitationAlerts = [];

    vm.roles = [
      'company_admin',
      'company_sales'
    ];

    //  user invitation
    function inviteUser() {

      vm.invitationAlerts = [];

      vm.userInvitation.user.role = vm.userInvitation.user.role
      vm.userInvitation.user_invitation = {};
      vm.userInvitation.user_invitation.reciever_email = vm.userInvitation.user.email

      UserServices.inviteUser(vm.userInvitation)
        .then(function(res) {
          console.log(res);

          var title = '';
          var msg = '';

          $translate('dashboard.user_invited').then(function(paragraph) {
            title = paragraph;
          }, function(translationId) {
            tile = translationId;
          }).finally(function() {
            $translate('dashboard.is_invited').then(function(paragraph) {
              msg = paragraph;
            }, function(translationId) {
              msg = translationId;
            }).finally(function() {
              toaster.pop("success", title, res.data.reciever_email + " " + msg);
            });
          });

          $filter('filter')(array, expression)


        }).catch(function(err) {
          console.log(err);
          var errors = getErrorsArr(err.data);

          for (var i = 0; i < errors.length; i++) {
            vm.invitationAlerts.push({
              type: 'danger',
              msg: errors[i].item + ": " + errors[i].error
            });
          }
        })
    }


    function getErrorsArr(errors) {

      var arr = [];

      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {

          for (var i = 0; i < errors[key].length; i++) {
            arr.push({
              item: key,
              error: errors[key][i]
            });
          }
        }
      }

      return arr;
    }


  }

})();
