class PropertyDetail < ActiveRecord::Base
  extend Enumerize
  validates :code, uniqueness: true

  enumerize :value_type, in: [:string, :text, :bool, :select, :multi_select],
    default: :string , predicates: true, scope: true, i18n_scope: "value_types"
end
[{ddd: 'dd'}, {sss: "ssss"}, {sss: 'sss'}]
