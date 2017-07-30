class PaymentRecord < ActiveRecord::Base
  belongs_to :payment

  has_attached_file :attachment
end
