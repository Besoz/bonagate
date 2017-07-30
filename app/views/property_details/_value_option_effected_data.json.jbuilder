json.affected_types affected_types
json.affected_properties do
  affected_properties.each do |option|
    json.set! option.id do
      json.partial! 'property_details/value_option', value_option: option
      json.properties do
        json.array! option.property_detail_instances do |inst|
            json.property inst.property
            json.instance inst
        end
      end
    end
  end
end
