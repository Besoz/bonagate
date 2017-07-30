json.extract! property_type, :id, :code, :name, :state, :created_at, :updated_at, :state
json.property_details_attributes property_type.property_details, partial: "property_details/property_detail_min.json.jbuilder",as: :property_detail
json.url property_type_url(property_type, format: :json)
