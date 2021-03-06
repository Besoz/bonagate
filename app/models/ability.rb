class Ability
  include CanCan::Ability

  def initialize(user)
    alias_action :index, :read, to: :read_all
    alias_action :update, :destroy, :create, to: :write

    alias_action :create, :read, :update, :destroy, to: :crud
    alias_action :index, :create, :read, :update, :destroy, to: :crud_all

    can :crud, User, id: user.id if user

    user ||= User.new # guest user (not logged in)
    if user.admin?
      can :manage, :all

      cannot [:activate, :deactivate], User do |other_user|
          other_user.role == :admin
      end
    elsif user.company_user?

      if user.company_user.company_admin?
        can :crud_all, Company, id: user.company_user.company_id # to be changed company_user.company_id

        can :read_all, User, User.in_company(user.company_user.company.id).where.not(id: user.id) do |other_user|
          other_user.company_user && other_user.company_user.company.id == user.company_user.company.id
        end

        can :update, User, id: user.id

        can :create, UserInvitation, company_id: user.company_user.company_id

        can :create, Property

        can :templates, Property, company_id: user.company_user.company_id

        can [:activate, :deactivate], User do |other_user|
          other_user.company_user.role == :company_sales
        end
      else
        can :write, User, id: user.id

        can :index, User, company_user: { company_id: user.company_user.company.id }

        can :read_all, User, User.in_company(user.company_user.company.id).where.not(id: user.id) do |other_user|
          other_user.id == user.id
        end

        can :read, Company, id: user.company_user.company_id # to be changed company_user.company_id
      end
      can :templates, Property, company_id: user.company_user.company_id

      company_id = user.company_user.company_id

      can :read_all, Property, Property.company_properties(company_id) do |property|
        (property.company_id == company_id) || SharedProperty.where(company_id: company_id, property_id: property.id).any?
      end

      can :write, Property, company_id: user.company_user.company_id

      can [:search], Property, Property.published do |property|
          property.publish
      end

      can :upload_image, Property, company_id: user.company_user.company_id # to be changed company_user.company_id

      can :read_all, PropertyState, state: :active
      can :index_by_id, PropertyState, state: :active
      can :read_all, PropertyDetail, state: :active
      can :index_by_id, PropertyDetail, state: :active
      can :read_all, PropertyDetailCategory, state: :active
      can :index_by_id, PropertyDetailCategory, state: :active
      can :read_all, PropertyStatus, state: :active

      can :index_by_id, PropertyStatus, state: :active
      can :read_all, PropertyServiceType, state: :active
      can :index_by_id, PropertyServiceType, state: :active
      can :read_all, PropertyType, state: :active
      can :index_by_id, PropertyType, state: :active

      can :read_all, PropertyServiceType, state: :active
      can :read_all, PropertyType, state: :active


    elsif user.user?
      can %i[change_password user_profile], User

      can %i[index read search], Property, Property.published, &:publish

      can :read_all, PropertyState, state: :active
      can :index_by_id, PropertyState, state: :active
      can :read_all, PropertyDetail, state: :active
      can :index_by_id, PropertyDetail, state: :active
      can :read_all, PropertyDetailCategory, state: :active
      can :index_by_id, PropertyDetailCategory, state: :active
      can :read_all, PropertyStatus, state: :active
      can :read_all, PropertyServiceType, state: :active
      can :read_all, PropertyType, state: :active
    else
      can %i[index read search], Property, Property.published, &:publish

      can :read_all, PropertyState, state: :active
      can :index_by_id, PropertyState, state: :active
      can :read_all, PropertyDetail, state: :active
      can :index_by_id, PropertyDetail, state: :active
      can :read_all, PropertyDetailCategory, state: :active
      can :index_by_id, PropertyDetailCategory, state: :active
      can :read_all, PropertyStatus, state: :active
      can :read_all, PropertyServiceType, state: :active
      can :read_all, PropertyType, state: :active
    end
  end
end
