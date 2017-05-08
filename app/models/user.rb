class User < ActiveRecord::Base
	extend Enumerize
	acts_as_authentic

  	has_many :property_detail_queries

	enumerize :role, in: [:user, :admin, :company_user], default: :user , predicates: true, scope: true

	has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: ""
       validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

    has_one :company_user


    scope :in_company, -> (company_id){
    	joins(:company_user).where( 'company_users.company_id = ? && users.role = ?', 
    		company_id,  'company_user')
    }


end
