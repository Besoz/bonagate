json.list @property_detail_categories, partial: 'property_detail_categories/property_detail_category', as: :property_detail_category
json.state_options PropertyDetailCategory.state.values
json.property_details PropertyDetail.all