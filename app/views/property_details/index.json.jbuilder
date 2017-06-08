json.list @property_details, partial: 'property_details/property_detail_min', as: :property_detail
json.value_type_options PropertyDetail.value_type.values