class PropertyPaymentPlan < ActiveRecord::Base
  belongs_to :property

  has_many :property_payment_plan_records
  accepts_nested_attributes_for :property_payment_plan_records, allow_destroy: true

end
