json.state_options PropertyType.state.values
json.property_details do 
  PropertyDetail.all.group_by(&:property_detail_category_id).each do |key, details|
    json.set! key do
      json.array! details, partial: 'property_details/property_detail_min', as: :property_detail
     end
   end
end
json.categories do
  PropertyDetailCategory.all.index_by(&:id).each do |key, cat|
    json.set! key do
      json.partial! 'property_detail_categories/property_detail_category', property_detail_category: cat
    end
  end
end
json.all_property_states PropertyState.all, partial: 'property_states/property_state', as: :property_state