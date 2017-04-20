class PropertyServiceTypeInstance < ActiveRecord::Base
  belongs_to :service_type
  belongs_to :property

  validates :service_type_id, :property_id, :unit, :unit_price, presence: true
  validates :unit, :uniqueness => {:scope => [:property_id]}
end
