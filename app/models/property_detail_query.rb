class PropertyDetailQuery < ActiveRecord::Base
  belongs_to :property_detail
  belongs_to :user
end
