json.extract! property, :id, :address, :created_at, :updated_at, :state
json.property_detail_instances property.property_detail_instances, partial: 'property_detail_instances/property_detail_instance', as: :property_detail_instance
json.type property.property_type, partial: 'property_types/property_type', as: :property_type
json.state property.property_state, partial: 'property_states/property_state', as: :property_state
json.status property.property_status, partial: 'property_statuses/property_status', as: :property_status
# json.property_service_type property.property_service_type, partial: 'property_service_types/property_service_type', as: :property_service_type
json.url property_url(property, format: :json)
if(property.property_images.first)
    json.avatar property.property_images.first.avatar
end
if(property.property_images)
    json.images property.property_images, partial: 'properties/property_image', as: :property_image
end
