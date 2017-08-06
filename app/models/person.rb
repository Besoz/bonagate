class Person < ActiveRecord::Base
  belongs_to :company_user

  has_many :payments
end
