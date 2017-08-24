json.favorites @properties, partial: 'properties/property', as: :property
json.pagination_info do 
	json.totalItems @properties.total_entries
    json.currentPage params[:page].to_i
end