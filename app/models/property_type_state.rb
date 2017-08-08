class PropertyTypeState < ActiveRecord::Base
  belongs_to :property_type
  belongs_to :property_state
end
