(function() {
  angular.module('auth_app')
    .controller('RegisterationController', RegisterationController);

  RegisterationController.$inject = ['$http', '$window', '$location',
    'redirectService', 'decoratorService'
  ];

  function RegisterationController($http, $window, $location, redirectService,
    decoratorService) {

    var vm = this;

    vm.email;
    vm.password;
    vm.passwordConfirmation;
    vm.companyName;
    vm.emailError;
    vm.invitationCode;
    vm.invitedUser = false;
    vm.registerUser = register;
    vm.gotoLoginPage = gotoLoginPage;
    vm.regAlerts = [];


    activate();


    function activate() {

      var query = $location.search();
      if (query.invitation_code) {

        vm.invitationCode = query.invitation_code;

        $http.get('/user_invitations/populate/' + vm.invitationCode + '.json')
          .then(function(res) {
            vm.invitedUser = true;

            vm.email = res.data.reciever_email;
            vm.companyName = res.data.company.name;
          })
          .catch(function(err) {
            vm.invitedUser = false;

          });
      }

    }


    function register(form) {

      vm.regAlerts = [];

      if (!form.$valid)
        return;

      user = {
        email: vm.email,
        password: vm.password,
        password_confirmation: vm.passwordConfirmation,
      };

      company = {
        name: vm.companyName
      }

      var request = {
        user: user,
        company: company
      };

      if (vm.invitedUser) {
        request.invitation_code = vm.invitationCode;
      }

      $http.post('/users.json', request)
        .then(function(res) {

          //todo use redirect service
          $window.location.href = redirectService.afterSignupRedirectUrl();

          console.log("res");
          console.log(res);

        })
        .catch(function(err) {
          // vm.emailError = err.data.email[0]
          vm.regAlerts = decoratorService.getErrorsAlertsArr(err.data);

          console.log("Errro");
          console.log(err);
        });
    };

    function gotoLoginPage() {
      $window.location.href = '/sign_in';
    }
  }

})();
