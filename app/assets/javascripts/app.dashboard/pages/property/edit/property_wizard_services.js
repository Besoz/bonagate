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


      // extracting details id form property details instance
      property.property_detail_instances_details_ids = property.property_detail_instances_attributes.map(function (obj) {
        return obj.property_detail_id;
      });

      // extracting details id form property type
      var type_details_ids = property.type.property_details_attributes.map(function (obj) {
        return obj.id;
      });

      // finding details of the type that are missing in the property
      property.type.new_property_details_attributes = property.type.property_details_attributes.filter(function (x) {
        return property.property_detail_instances_details_ids.indexOf(x.id) < 0;
      });

      var oldDetailsCount = property.property_detail_instances_attributes.length;
      var newDetailsCount = property.type.new_property_details_attributes.length;

      // add missing details to the property
      var i = 0;
      for (i = 0; i < newDetailsCount; i++) {
        property.property_detail_instances_attributes[i + oldDetailsCount] = {}
        property.property_detail_instances_attributes[i + oldDetailsCount].property_detail_id =
          property.type.new_property_details_attributes[i].id;
        property.property_detail_instances_attributes[i + oldDetailsCount].category_id =
          property.type.new_property_details_attributes[i].property_detail_category_id;
        property.property_detail_instances_attributes[i + oldDetailsCount].new = true;
      }

      // marking details removed form the type but still used in the property
      i = 0;
      for (i = 0; i < oldDetailsCount; i++) {
        var detail_id = property.property_detail_instances_attributes[i].property_detail_id;
        if (type_details_ids.indexOf(detail_id) < 0) {
          property.property_detail_instances_attributes[i].removed = true;
        }
      }


    }



  }
})();