class PropertyDetailCategory < ActiveRecord::Base
  extend Enumerize
  
  translate :name

  enumerize :state, in: %i[active inactive], default: :active, predicates: true, scope: true

  has_many :property_details
end
