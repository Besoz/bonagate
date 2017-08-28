class Payment < ActiveRecord::Base
  belongs_to :person, inverse_of: :payments
  validates_presence_of :person
  accepts_nested_attributes_for :person

  belongs_to :property, inverse_of: :payments
  validates_presence_of :property

  has_many :payment_records, -> { order(:created_at => :desc) }
end
