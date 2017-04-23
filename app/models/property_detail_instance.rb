class PropertyDetailInstance < ActiveRecord::Base
  belongs_to :property
  belongs_to :property_detail
end
