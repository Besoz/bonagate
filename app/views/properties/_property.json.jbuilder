json.extract! property, :id, :address, :created_at, :updated_at, :state
json.property_detail_instances property.property_detail_instances, partial: 'property_detail_instances/property_detail_instance', as: :property_detail_instance
json.property_state property.property_type, partial: 'property_types/property_type', as: :property_type
json.property_state property.property_state, partial: 'property_states/property_state', as: :property_state
json.property_status property.property_status, partial: 'property_statuses/property_status', as: :property_status
json.url property_url(property, format: :json)
if(property.property_images.first)
    json.avatar property.property_images.first.avatar
end