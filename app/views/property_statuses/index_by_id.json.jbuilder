json.hash do
	@property_statuses.each do |property_status|
		json.set! property_status.id do
			json.partial! 'property_statuses/property_status', property_status: property_status
		end
	end
end