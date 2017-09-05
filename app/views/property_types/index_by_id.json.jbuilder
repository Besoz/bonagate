json.hash do
	@property_types.each do |property_type|
    json.set! property_type.id do
      json.partial! 'property_types/property_type', property_type: property_type
    end
  end
end