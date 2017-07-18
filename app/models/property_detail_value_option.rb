class PropertyDetailValueOption < ActiveRecord::Base

  before_destroy :confirm_not_used
  translate :name
  belongs_to :property_detail
  
  has_many :property_detail_instance_value_option
  has_many :property_detail_instances, through: :property_detail_instance_value_option, counter_cache: true

  def confirm_not_used
    puts property_detail_instances.count
    if property_detail_instances.any?
      puts "hopaaaaaaaaaaaaaaaaaaaa"
      self.errors[:base] << "Cannot delete used option"
      puts "hopaaaaaaaaaaaaaaaaaaaa"
      return false
    end
  end
end
