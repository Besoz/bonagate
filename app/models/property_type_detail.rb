class PropertyTypeDetail < ActiveRecord::Base
  belongs_to :property_type
  belongs_to :property_detail
end
