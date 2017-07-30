(function () {

    'use strict';

    angular.module('app.dashboard')
        .controller('PaymentsController', PaymentsController);

    PaymentsController.$inject = ['$modal'];
    //   PaymentsController.$inject = ['$state', '$window', 'statesRequest', 'PaymentsServices',
    //     '$rootScope', 'toaster', '$translate', 'decoratorService', '$filter', '$modal'
    //   ];
    // $state, $window, statesRequest, PaymentsServices,
    //     $rootScope, toaster, $translate, decoratorService, $filter, $modal
    function PaymentsController($modal) {

        var vm = this;

        vm.statesList;
        vm.stateOptions;

        // creating new property state
        vm.newPayment;
        // vm.createPayment = createPayment;
        vm.stateCreationErrors;

        // crud property state
        vm.create = create;
        vm.edit = edit;

        activate();

        function activate() {
            //   vm.statesList = statesRequest.data.list;
            //   vm.stateOptions = statesRequest.data.state_options;
            //   vm.stateCreationErrors = [];
        }

        function create() {

            var modalInstance = openModal();

            modalInstance.result.then(function (createdPropState) {
                // vm.statesList.push(createdPropState);
            }, function () {

            });
        }

        function edit(index) {

            var modalInstance = openModal(angular.copy(vm.statesList[index]));

            modalInstance.result.then(function (updatedPropState) {
                // vm.statesList[index] = updatedPropState;
            }, function () {

            });
        }


        function openModal(payment) {

            var modalInstance = $modal.open({
                templateUrl: 'assets/app.dashboard/pages/property/payment/payment_form.html',
                controller: 'PaymentController',
                controllerAs: 'paymentCtrl',
                resolve: {
                  payment: function() {
                    return payment;
                  },
                  formHelpers: function() {
                    return { stateOptions: {} }
                  }
                }
            });

            return modalInstance;
        }
    }

})();