class User < ActiveRecord::Base
	extend Enumerize
	acts_as_authentic

  default_value_for :confirmed, true
  default_value_for :approved, true
  default_value_for :active, true

  has_many :property_detail_queries
  
  has_many :user_favorite_properties
  has_many :properties , through: :user_favorite_properties

  enumerize :role, in: [:visitor, :user, :admin, :company_user], default: :visitor , predicates: true, scope: true, i18n_scope: "roles"

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/assets/default-user.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  has_one :company_user

  scope :in_company, -> (company_id){
  	joins(:company_user).where( 'company_users.company_id = ? && users.role = ?', 
  		company_id,  'company_user')
  }
  def favorites_property?(property)
    property.users.include?(self)
  end

end
