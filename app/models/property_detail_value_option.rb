class PropertyDetailValueOption < ActiveRecord::Base

  before_destroy :confirm_not_used
  
  translate :name
  belongs_to :property_detail

  has_many :property_detail_instances, through: :property_detail_instance_value_option

  def confirm_not_used
    return true if property_detail_instances.count == 0
    errors.add :base, "Cannot delete used option"
    # or errors.add_to_base in Rails 2
    false
  end
end
