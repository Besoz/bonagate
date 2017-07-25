json.hash do
  @property_details.each do |id, property_detail|
    json.set! id do
      json.partial! 'property_details/property_detail_min', property_detail: property_detail
    end
  end
end
json.value_type_options PropertyDetail.value_type.values
json.categories PropertyDetailCategory.all,
                partial: 'property_detail_categories/property_detail_category', as: :property_detail_category
