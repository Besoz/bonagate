json.hash do
  @property_detail_categories.each do |property_detail_category|
    json.set! property_detail_category.id do
      json.partial! 'property_detail_categories/property_detail_category', property_detail_category: property_detail_category
    end
  end
end
json.state_options PropertyDetailCategory.state.values
