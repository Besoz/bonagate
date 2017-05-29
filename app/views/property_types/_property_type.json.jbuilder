json.extract! property_type, :id, :code, :name, :state, :created_at, :updated_at, :state
json.details_ids property_type.property_details.pluck(:id)
json.url property_type_url(property_type, format: :json)
