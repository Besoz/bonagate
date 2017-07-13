json.extract! property_detail, :id, :code, :name, :value_type, :created_at, :updated_at
# json.value_options do |variable|
# 	if(property_detail.value_options)
# 		json.array! JSON.parse(property_detail.value_options)
# 	end
# end
json.property_detail_value_options_attributes property_detail.property_detail_value_options, 
	partial: 'property_details/value_option', as: :value_option