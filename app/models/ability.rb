class Ability
  include CanCan::Ability

  def initialize(user)
    alias_action :index, :read, to: :read_all
    alias_action :update, :destroy, :create, to: :write
    alias_action :create, :read, :update, :destroy, :to => :crud
    alias_action :index, :create, :read, :update, :destroy, :to => :crud_all

    if user
      can :crud, User, id: user.id
    end

    user ||= User.new # guest user (not logged in)
    if user.admin?
      can :manage, :all

    elsif user.company_user?
      if(user.company_user.company_admin?)
        can :crud_all, Company, :id => user.company_user.company_id # to be changed company_user.company_id


        can :crud_all, User, User.in_company(user.company_user.company.id) do |other_user|
          other_user.company_user.company.id == user.company_user.company.id
        end

        can :create, UserInvitation, :company_id => user.company_user.company_id

        can :create, Property
        can :templates, Property, company_id: user.company_user.company_id
      else
        can :crud, User, id: user.id

        can :index, User,  :company_user => { :company_id => user.company_user.company.id }

        can :read, Company, :id => user.company_user.company_id # to be changed company_user.company_id
      end

      company_id = user.company_user.company_id
      
      can :read_all, Property, Property.company_properties(company_id) do |property|
        (property.company_id == company_id) or SharedProperty.where(company_id: company_id, property_id: property.id).any?
      end
      
      can :write, Property, :company_id => user.company_user.company_id
      
      can [:search], Property, Property.published do |property|
          property.publish
      end
      
      can :upload_image, Property, :company_id => user.company_user.company_id # to be changed company_user.company_id

    elsif user.user?
        can [:change_password, :user_profile], User
        
        can [:index, :read, :search], Property, Property.published do |property|
            property.publish
        end
    else
       can [:index, :read, :search], Property, Property.published do |property|
          property.publish
      end
    end
  end
end
