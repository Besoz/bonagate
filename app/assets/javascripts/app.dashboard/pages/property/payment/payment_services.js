// service
(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .service('PaymentsServices', PaymentsServices);

  PaymentsServices.$inject = ['$http', 'GeneralDataServices', 'FileUploader', 'Upload'];


  function PaymentsServices($http, GeneralDataServices, FileUploader, Upload) {

    var service = {
      updatePayment: updatePayment,
      getPayments: getPayments,
      createPayment: createPayment,
      intializeFilesUploader: intializeFilesUploader,
      addPaymentRecord: addPaymentRecord
    };
    return service;

    ////////////

    function updatePayment(obj) {
      return GeneralDataServices.update('payments', obj.id, {
        'payment': obj
      });
    };

    function getPayments() {
      return GeneralDataServices.index('payments');
    }

    function createPayment(obj) {
      return GeneralDataServices.create('payments', {
        'payment': obj
      });
    }

    function addPaymentRecord(record, paymentId) {
      record.payment_id = paymentId;
      return Upload.upload({
        url: 'payment_records.json',
        data: {
          'payment_record': record
        },
      });
    }

    // files uploader
    function intializeFilesUploader(vm, uploadSuccessCallback) {
      vm.filesUploader = new FileUploader({
        alias: 'property[propery_files_attributes[avatar]]',
        method: 'put',
        queueLimit: 1
      });

      vm.filesUploader.onBeforeUploadItem = function (item) {
        item.url = 'properties/' + vm.property.id + '/upload_Files/';
        // console.info('onBeforeUploadItem', item);
      };

      // // TODO remove this
      // vm.filesUploader.onCompleteAll = uploadSuccessCallback;
    }
  }
})();