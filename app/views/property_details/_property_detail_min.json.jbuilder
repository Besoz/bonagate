json.extract! property_detail, :id, :code, :name, :value_type, :mandatory,
              :created_at, :updated_at, :property_detail_category_id
json.property_detail_value_options_attributes property_detail.property_detail_value_options,
                                              partial: 'property_details/value_option', as: :value_option
