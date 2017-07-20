// service
(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .service('PropertyWizardServices', PropertyWizardServices);

  PropertyWizardServices.$inject = [];


  function PropertyWizardServices() {

    var service = {
      processPropertyDetails: processPropertyDetails
    };
    return service;

    ////////////


    function processPropertyDetails(property) {
      var type_details_ids = property.type.property_details_attributes.map(function (obj) {
        return obj.id;
      });

      property.type.new_property_details_attributes = property.type.property_details_attributes.filter(function (x) {
        return property.property_detail_instances_ids.indexOf(x.id) < 0
      });

      var i = 0;
      for (i = 0; i < property.property_detail_instances_attributes.length; i++) {
        var detail_id = property.property_detail_instances_attributes[i].property_detail_id;
        if (type_details_ids.indexOf(detail_id) < 0) {
          property.property_detail_instances_attributes[i].removed = true;
        }
      }
    }



  }
})();