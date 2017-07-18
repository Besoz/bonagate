module PropertyDetailsHelper
  def value_options_used(value_options)
    # value_option_ids = value_options.select { |opt| opt['_destroy'] == true }.map { |x| x[:id] }
    # puts value_option_ids.to_json
    # return PropertyDetailValueOption.select(:id, 'property_detail_instances.*', 'properties.*').joins(:property_detail_instances).where(id: value_option_ids)

    return PropertyDetailValueOption
      .where(id: 7)
      .includes(property_detail_instances: :property)
      .group(:id)
  end
end
