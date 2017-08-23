json.list @properties, partial: 'properties/property', as: :property
json.state_options Property.state.values
json.total_pages @properties.total_pages if @properties.total_pages
json.current_page @properties.current_page if @properties.current_page