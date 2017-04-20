class Property < ActiveRecord::Base

  belongs_to :company
  belongs_to :property_type

  has_many :shared_properties
  has_many :companies, through: :shared_properties

  has_many :property_details, through: :property_type

  has_many :service_type_instances


  validates :service_type_instances, :length => { :minimum => 1 }

  validates :company_id, :property_status_id, :property_type_id,
            presence: true
end
