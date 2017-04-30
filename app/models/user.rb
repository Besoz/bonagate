class User < ActiveRecord::Base
	acts_as_authentic

  	has_many :property_detail_queries

	#[Role Values]
	@@NORMAL_USER = '10'
	@@ADMIN = '20'
	@@COMPANY_MANGER = '30'


	def self.NORMAL_USER
		@@NORMAL_USER
	end

	def self.ADMIN
		@@ADMIN
	end

  	def admin?
		self.role == @@ADMIN
  	end

end
