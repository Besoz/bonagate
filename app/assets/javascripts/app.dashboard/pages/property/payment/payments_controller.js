(function () {

    'use strict';

    angular.module('app.dashboard')
        .controller('PaymentsController', PaymentsController);

    PaymentsController.$inject = ['$modal', 'PaymentsServices', 'paymentsRequest', '$stateParams'];
    //   PaymentsController.$inject = ['$state', '$window', 'paymentsRequest', 'PaymentsServices',
    //     '$rootScope', 'toaster', '$translate', 'decoratorService', '$filter', '$modal'
    //   ];
    // $state, $window, paymentsRequest, PaymentsServices,
    //     $rootScope, toaster, $translate, decoratorService, $filter, $modal
    function PaymentsController($modal, PaymentsServices, paymentsRequest, $stateParams) {

        var vm = this;

        vm.paymentsList;
        vm.paymentCreationErrors;

        // crud property payment
        vm.create = create;
        vm.edit = edit;
        vm.addPaymentRecord = addPaymentRecord;

        activate();

        function activate() {
            vm.paymentsList = paymentsRequest.data;
            //   vm.stateOptions = paymentsRequest.data.state_options;
            vm.paymentCreationErrors = [];
        }

        function create() {

            var modalInstance = openModal({
                property_id: $stateParams.propertyId
            });

            modalInstance.result
                .then(function (createdPayment) {
                    vm.paymentsList.unshift(createdPayment);
                }, function () {

                });
        }

        function edit(index) {

            var modalInstance = openModal(angular.copy(vm.paymentsList[index]));

            modalInstance.result.then(function (updatedPayment) {
                vm.paymentsList[index] = updatedPayment;
            }, function () {

            });
        }


        function openModal(payment) {

            var modalInstance = $modal.open({
                templateUrl: 'assets/app.dashboard/pages/property/payment/payment_form.html',
                controller: 'PaymentController',
                controllerAs: 'paymentCtrl',
                resolve: {
                    payment: function () {
                        return payment;
                    },
                    formHelpers: function () {
                        return {
                            stateOptions: {}
                        }
                    }
                }
            });

            return modalInstance;
        }

        function addPaymentRecord(record, paymentIndex) {
            PaymentsServices
                .addPaymentRecord(record, vm.paymentsList[paymentIndex].id)
                .then(function (res) {
                    vm.paymentsList[paymentIndex].payment_records.unshift(res.data);
                });
        }
    }

})();