class User < ActiveRecord::Base
	extend Enumerize
	acts_as_authentic

  	has_many :property_detail_queries

	enumerize :role, in: [:user, :admin], default: :user , predicates: true

end
