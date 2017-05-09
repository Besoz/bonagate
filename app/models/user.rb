class User < ActiveRecord::Base
	extend Enumerize
	acts_as_authentic

  	has_many :property_detail_queries

	enumerize :role, in: [:user, :admin], default: :user , predicates: true

	has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: ""
       validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

end
