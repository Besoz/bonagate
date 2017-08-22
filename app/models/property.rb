class Property < ActiveRecord::Base
  extend Enumerize

  enumerize :state, in: %i[active inactive], default: :active, predicates: true, scope: true

  default_value_for :publish, false

  belongs_to :company
  belongs_to :property_type
  belongs_to :property_state
  belongs_to :property_status

  has_many :shared_properties
  has_many :companies, through: :shared_properties

  has_many :property_details, through: :property_type

  has_many :property_detail_instances
  accepts_nested_attributes_for :property_detail_instances, allow_destroy: true

  validates_associated :property_detail_instances

  has_many :service_type_instances

  has_many :property_images, dependent: :destroy

  has_one :property_as_template_datum, :dependent => :destroy 
  accepts_nested_attributes_for :property_as_template_datum

  has_many :user_favorite_properties
  has_many :users , through: :user_favorite_properties

  # validates :service_type_instances, :length => { :minimum => 1 }

  validates :company_id, :property_status_id, :property_type_id,
            presence: true

  has_many :property_payment_plans
  accepts_nested_attributes_for :property_payment_plans, allow_destroy: true

  scope :published, ->  { Property.where publish: true }
  scope :templates, -> { PropertyAsTemplateDatum.all.includes :property}
  
  scope :company_properties, -> (company_id) {
    #properties shared with the company or owned by it
    Property.joins("LEFT JOIN shared_properties ON shared_properties.property_id = properties.id")
            .where("shared_properties.company_id = ? or properties.company_id = ?", company_id, company_id)
            .distinct
  }

  def self.get_affected_with_property_detail detail_id
    Property.joins(:property_detail_instances).where(property_detail_instances: { property_detail_id: detail_id })
  end

  def self.get_affected_with_property_detail_value_option value_option_ids
    Property.joins(:property_detail_instances).where(property_detail_instances: { property_detail_id: detail_id })
 end
end
