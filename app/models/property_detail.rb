class PropertyDetail < ActiveRecord::Base
  extend Enumerize

  VALUE_OPTIONS_COUNT_MIN = 1

  # serialize :value_options, Array
  default_value_for :mandatory, false

  enumerize :state, in: %i[active inactive], default: :active, predicates: true, scope: true

  validates :code, uniqueness: true

  enumerize :value_type, in: %i[string number text bool select multi_select],
                         default: :string, predicates: true, scope: true, i18n_scope: 'value_types'

  has_many :property_detail_value_options

  validate do
    check_value_options_number
  end

  accepts_nested_attributes_for :property_detail_value_options, allow_destroy: true
  # validates_associated :property_detail_value_options

  private

  def check_value_options_number
    if selectable? && !value_options_count_valid?
      errors.add(:property_detail_value_options, :not_enough,
                 count: VALUE_OPTIONS_COUNT_MIN)
    end
  end

  def value_options_count_valid?
    property_detail_value_options.reject(&:marked_for_destruction?)
                                 .count >= VALUE_OPTIONS_COUNT_MIN
 end

  def selectable?
    value_type.select? || value_type.multi_select?
  end
end
