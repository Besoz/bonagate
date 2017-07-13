class PropertyDetail < ActiveRecord::Base
  extend Enumerize
  # serialize :value_options, Array
  default_value_for :value_options, '[]'

  enumerize :state, in: [:active, :inactive], default: :active , predicates: true, scope: true

  validates :code, uniqueness: true

  enumerize :value_type, in: [:string, :number, :text, :bool, :select, :multi_select],
    default: :string , predicates: true, scope: true, i18n_scope: "value_types"
      
  has_many :property_detail_value_options
  accepts_nested_attributes_for :property_detail_value_options, allow_destroy: true
end
