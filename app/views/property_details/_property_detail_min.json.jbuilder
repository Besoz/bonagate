json.extract! property_detail, :id, :code, :name, :name_en, :name_ar, :value_type, :mandatory, :state,
              :created_at, :updated_at, :property_detail_category_id
json.property_detail_value_options_attributes property_detail.property_detail_value_options,
                                              partial: 'property_details/value_option.json.jbuilder', as: :value_option
