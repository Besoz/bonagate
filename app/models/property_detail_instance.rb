class PropertyDetailInstance < ActiveRecord::Base

  # after_validation :assign_detail_instance_value_options

  belongs_to :property
  belongs_to :property_detail

  has_many :property_detail_instance_value_options
  accepts_nested_attributes_for :property_detail_instance_value_options, allow_destroy: true
  has_many :property_detail_value_options, through: :property_detail_instance_value_options


  def assign_detail_instance_value_options
    self.property_detail_instance_value_options.where.not(id: nil).destroy_all
  end
end
