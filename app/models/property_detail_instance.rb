class PropertyDetailInstance < ActiveRecord::Base

  after_validation :assign_detail_instance_value_options

  belongs_to :property
  belongs_to :property_detail

  has_many :property_detail_instance_value_options
  accepts_nested_attributes_for :property_detail_instance_value_options
  has_many :property_detail_value_options, through: :property_detail_instance_value_options


  def assign_detail_instance_value_options
    puts "jjjjjjjjjjjjjjjjjjjjjjjjjjjj"
    # puts self.property_detail_instance_value_options.to_json
    puts self.property_detail_instance_value_options.to_json
    self.property_detail_instance_value_options = property_detail_instance_value_options.select {|obj| obj.id == nil }
    puts self.property_detail_instance_value_options.to_json

  end
end
