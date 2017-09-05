json.hash do
  @property_service_types.each do |property_service_type|
    json.set! property_service_type.id do
      json.partial! 'property_service_types/property_service_type', property_service_type: property_service_type
    end
  end
end
