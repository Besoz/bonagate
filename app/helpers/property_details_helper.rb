module PropertyDetailsHelper
  def value_options_used(value_options)
    value_option_ids = value_options.select do |opt|
      opt['_destroy'] == true && !opt[:id].blank?
    end.map do |x|
      x[:id]
    end

    PropertyDetailValueOption
      .where(id: value_option_ids)
      .includes(property_detail_instances: :property)
      .group(:id)

    # PropertyDetailValueOption.where(id: value_option_ids)
    #                          .joins(property_detail_instances: :property)
    #                          .select('property_detail_value_options.id As  option_id',
    #                                  'properties.*')
    #                          .group_by(&:option_id)
  end
end
