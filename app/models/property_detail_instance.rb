class PropertyDetailInstance < ActiveRecord::Base
  belongs_to :property
  belongs_to :property_detail

  validate :validate_property_detail_value


  def validate_property_detail_value
		
		if self.property_detail.mandatory && value.blank?
			errors.add(:value, 'this is a mandatory field')
		end

		#errors.add(:value, 'this is a mandatory field') if self.property_detail.mandatory && value.blank?
	end

end
