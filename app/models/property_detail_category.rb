class PropertyDetailCategory < ActiveRecord::Base
  extend Enumerize
  
  translate :name
  validates :name_en, :name_ar, presence: true

  enumerize :state, in: %i[active inactive], default: :active, predicates: true, scope: true

  has_many :property_details
end
