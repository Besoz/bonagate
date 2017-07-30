class PropertyDetailInstanceValueOption < ActiveRecord::Base
  belongs_to :property_detail_instance
  belongs_to :property_detail_value_option
end
