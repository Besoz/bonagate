// service
(function () {
    'use strict';

    angular
        .module('app.shared')
        .service('FormValidationService', formValidationService);

    formValidationService.$inject = [];

    function formValidationService() {

        var service = {
            validateForm: validateForm
        };

        return service;

        ////////////

        function validateForm(form) {
            var field = null,
                firstError = null;
            for (field in form) {
                if (field[0] != '$') {
                    if (firstError === null && !form[field].$valid) {
                        firstError = form[field].$name;
                    }

                    if (form[field].$pristine) {
                        form[field].$dirty = true;
                    }
                }
            }
        }
    }
})();