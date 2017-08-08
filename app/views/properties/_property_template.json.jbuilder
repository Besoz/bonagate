json.extract! property, :address, :state, :lat, :lng, :country, :city, :area, :street, :number, :floor, :publish
json.template property.property_as_template_datum, :name
json.property_detail_instances_attributes property.property_detail_instances, partial: 'property_detail_instances/property_detail_instance_template', as: :property_detail_instance
json.type property.property_type, partial: 'property_types/property_type', as: :property_type
json.state property.property_state, partial: 'property_states/property_state', as: :property_state
json.status property.property_status, partial: 'property_statuses/property_status', as: :property_status
json.url property_url(property, format: :json)
json.avatar property.property_images.first.avatar if property.property_images.first
json.images property.property_images, partial: 'properties/property_image', as: :property_image if property.property_images
