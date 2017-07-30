json.extract! property_detail_instance, :id, :property_id, :property_detail_id, :created_at, :updated_at
if(property_detail_instance.property_detail.value_type == 'multi_select' && property_detail_instance.value != nil)
	json.value do |variable|
		json.array! PropertyDetailValueOption
			.where(id: JSON.parse(property_detail_instance.value)),
			partial: 'property_details/value_option', as: :value_option
	end
else
	json.value property_detail_instance.value
end
json.url property_detail_instance_url(property_detail_instance, format: :json)
json.property_detail property_detail_instance.property_detail, 
	partial: 'property_details/property_detail_min', as: :property_detail
# json.property_detail_instance_value_options_attributes property_detail_instance.property_detail_instance_value_options, 
# 	partial: 'property_detail_instances/instance_value_option', as: :instance_value_option

json.property_detail_value_option_ids property_detail_instance.property_detail_value_options.pluck(:id)
json.category_id property_detail_instance.property_detail.property_detail_category_id