class PropertyType < ActiveRecord::Base
	validates :code, uniqueness: true

	has_many :property_type_details
  	has_many :property_details, through: :property_type_details
end
