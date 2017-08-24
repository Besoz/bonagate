class PropertyStatus < ActiveRecord::Base
  extend Enumerize

  translate :name
  validates :name_en, :name_ar, presence: true

  enumerize :state, in: [:active, :inactive], default: :active , predicates: true, scope: true
end
