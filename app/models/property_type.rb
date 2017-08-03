class PropertyType < ActiveRecord::Base
  extend Enumerize

  enumerize :state, in: [:active, :inactive], default: :active , predicates: true, scope: true

  validates :code, uniqueness: true

  has_many :property_type_details
  has_many :property_details, through: :property_type_details
  has_many :property_type_states
  has_many :property_states, through: :property_type_states
  validates :property_type_details, :presence => true
  validates :property_type_states, :presence => true


  def set_property_details property_details_arr
    property_detail_ids = property_details_arr.map { |x| x[:id] }
    property_details = PropertyDetail.where(id: property_detail_ids)
    self.property_details = property_details
  end

  def self.get_affected_with_property_detail detail_id
    PropertyType.joins(:property_type_details).where(property_type_details: { property_detail_id: detail_id })
  end

end
