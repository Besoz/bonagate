json.hash do
  @property_states.each do |property_state|
    json.set! property_state.id do
      json.partial! 'property_states/property_state', property_state: property_state
    end
  end
end
