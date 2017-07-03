class Property < ActiveRecord::Base
  extend Enumerize

  enumerize :state, in: [:active, :inactive], default: :active , predicates: true, scope: true

  belongs_to :company
  belongs_to :property_type
  belongs_to :property_state
  belongs_to :property_status

  has_many :shared_properties
  has_many :companies, through: :shared_properties

  has_many :property_details, through: :property_type

  has_many :property_detail_instances
  accepts_nested_attributes_for :property_detail_instances

  has_many :service_type_instances

  has_many :property_images, :dependent => :destroy

  # validates :service_type_instances, :length => { :minimum => 1 }

  validates :company_id, :property_status_id, :property_type_id,
    presence: true


end
