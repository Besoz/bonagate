(function() {
    angular.module('app')
        .controller('RegisterationController', RegisterationController);

    RegisterationController.$inject = ['$http'];

    function RegisterationController($http) {
        var vm = this;

        vm.email;
        vm.password;
        vm.passwordConfrirmation;
        vm.registerUser = register;

        function register() {

            console.log("hhhhhhhhhhhhhhhhhhhhhhhhh");
            user = {
                email: vm.userEmail,
                password: vm.userPassword,
                passwordConfrirmation: vm.passwordConfrirmation
            };

            $http.post('/users/new.json', {
                    user_session: userSession
                })
                .then(function(res) {
                    console.log("res");
                    console.log(res);

                })
                .catch(function(err) {

                    console.log("Errro");
                    console.log(err);
                });
        };
    }

})();
