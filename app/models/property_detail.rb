class PropertyDetail < ActiveRecord::Base
	validates :code, uniqueness: true
end
