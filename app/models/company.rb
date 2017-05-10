class Company < ActiveRecord::Base


	validates_uniqueness_of :email

	has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: ""
	validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

	belongs_to :user

	has_many :company_users 

	has_many :shared_properties
	has_many :properties, through: :shared_properties
end
