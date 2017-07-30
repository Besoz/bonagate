json.list @property_details, partial: 'property_details/property_detail_min', as: :property_detail
json.value_type_options PropertyDetail.value_type.values
json.categories PropertyDetailCategory.all, 
    partial: 'property_detail_categories/property_detail_category', as: :property_detail_category
