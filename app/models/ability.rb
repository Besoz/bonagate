class Ability
  include CanCan::Ability

  def initialize(user)


    alias_action :create, :read, :update, :destroy, :to => :crud
    alias_action :index, :create, :read, :update, :destroy, :to => :crud_all


    user ||= User.new # guest user (not logged in)
    if user.admin?
        can :manage, :all
    
    elsif user.company_user?

        if(user.company_user.company_admin?)

            can :crud_all, Company, :id => user.company_user.company_id # to be changed company_user.company_id


            can :crud_all, User, User.in_company(user.company_user.company.id) do |other_user|
                other_user.company_user.company.id == user.company_user.company.id
            end

            can :crud_all, UserInvitation, :company_id => user.company_user.company_id

        else

            can :index, User, User.in_company(user.company_user.company.id) do |other_user|
                other_user.company_user.company.id == user.company_user.company.id
            end

            can :read, Company, :id => user.company_user.company_id # to be changed company_user.company_id

        end

    end
    #
    # The first argument to `can` is the action you are giving the user 
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on. 
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/ryanb/cancan/wiki/Defining-Abilities
  end
end
