class PropertyDetailInstance < ActiveRecord::Base

  validate :validate_property_detail_instance_value, 
    :validate_property_detail_instance_value_options

  belongs_to :property
  belongs_to :property_detail

  has_many :property_detail_instance_value_options
  
  has_many :property_detail_value_options, through: :property_detail_instance_value_options
  accepts_nested_attributes_for :property_detail_instance_value_options, allow_destroy: true

  def assign_detail_instance_value_options
    self.property_detail_instance_value_options.where.not(id: nil).destroy_all
  end

  def validate_property_detail_instance_value
		if self.property_detail.mandatory && !(self.property_detail.select? || self.property_detail.multi_select?) && value.blank?
      errors.add(:value, "#{property_detail.name} is a mandatory field")
		end
	end


  def validate_property_detail_instance_value_options
    if self.property_detail.mandatory && (self.property_detail.select? || self.property_detail.multi_select?) && self.property_detail_instance_value_options.empty?
      errors.add(:value_options, "#{property_detail.name} [select or multi_select] is a mandatory field")
    end
  end
  
end
