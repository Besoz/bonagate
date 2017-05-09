class CompanyUser < ActiveRecord::Base
	extend Enumerize

	enumerize :role, in: [:company_admin, :company_sales], default: :company_sales , predicates: true

	belongs_to :user
	belongs_to :company

	scope :company, -> (id) { where(:id => id) }

end
