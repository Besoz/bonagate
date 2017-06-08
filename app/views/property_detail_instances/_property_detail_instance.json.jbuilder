json.extract! property_detail_instance, :id, :property_id, :property_detail_id, :created_at, :updated_at
if(property_detail_instance.property_detail.value_type == 'multi_select')
	json.value do |variable|
		json.array! JSON.parse(property_detail_instance.value)
	end
else
	json.value property_detail_instance.value
end
json.url property_detail_instance_url(property_detail_instance, format: :json)
