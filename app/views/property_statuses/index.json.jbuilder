json.list @property_statuses, partial: 'property_statuses/property_status', as: :property_status
json.state_options PropertyStatus.state.values