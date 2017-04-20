class Company < ActiveRecord::Base
  belongs_to :user


  has_many :shared_properties
  has_many :properties, through: :shared_properties
end
