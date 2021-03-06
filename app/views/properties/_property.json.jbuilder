json.extract! property, :id, :address, :created_at, :updated_at, :lat, :lng, :country, :city, :area, :street, :number, :floor, :publish
json.template property.property_as_template_datum, :name if(property.property_as_template_datum)
json.property_detail_instances_attributes property.property_detail_instances, partial: 'property_detail_instances/property_detail_instance.json.jbuilder', as: :property_detail_instance
json.company property.company, partial: 'companies/company.json.jbuilder', as: :company
# json.property_detail_instances_attributes do
#     property.property_detail_instances.each do |inst|
#         json.set! inst.property_detail_id do
#             json.partial! 'property_detail_instances/property_detail_instance', property_detail_instance: inst
#         end
#     end
# end
json.property_type_id property.property_type.id
json.property_state_id property.property_state.id
json.property_status_id property.property_status.id
json.property_service_type_id property.property_service_type.id
#             json.partial! 'property_detail_instances/property_detail_instance.json.jbuilder', property_detail_instance: inst
# json.property_service_type property.property_service_type, partial: 'property_service_types/property_service_type.json.jbuilder', as: :property_service_type
json.url property_url(property, format: :json)
if property.property_images.first
  json.avatar property.property_images.first.avatar
end
if(property.property_images)
    json.images property.property_images, partial: 'properties/property_image.json.jbuilder', as: :property_image
end
if(current_user)
  json.is_favourite property.users.include?(current_user)
end
json.company_ids property.companies.ids
json.property_payment_plans_attributes property.property_payment_plans,
                                       partial: 'property_payment_plans/property_payment_plan.json.jbuilder',
                                       as: :property_payment_plan
