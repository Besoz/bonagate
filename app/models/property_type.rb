class PropertyType < ActiveRecord::Base
  extend Enumerize

  enumerize :state, in: [:active, :inactive], default: :active , predicates: true, scope: true

  validates :code, uniqueness: true

  has_many :property_type_details
  has_many :property_details, through: :property_type_details


end
