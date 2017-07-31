class UsersController < ApplicationController
  layout "cliptheme-layout", :only => [:new]

  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :require_user, except: [:new, :create, :create_user]

  load_and_authorize_resource  :except => [:new, :create, :create_user]

  # GET /users
  # GET /users.json
  def index
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /user_profile
  # GET /user_profile.json
  def user_profile
    @tab = params[:tab] || 'favorites'
    @user = current_user
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create

    errors = {}
    company = nil
    user_invitation = nil
    invited_user = false
    companyUser = nil

    company_user_role = 'company_admin'

    if(!params[:invitation_code].blank?)

      user_invitation = UserInvitation.find_by(random_key: params[:invitation_code])

      if(!user_invitation.blank? && user_invitation.active?)
        
        invited_user =  true

        # adding already known data
        company = user_invitation.company
        company_user_role = 'company_sales'
        user_params[:emial] = user_invitation.reciever_email
      else
        # invitation not found
        render json: user_invitation.errors, status: :unprocessable_entity
      end
    end

    begin

      ActiveRecord::Base.transaction do

        @user = User.new(user_params)
        @user.role = :company_user
        @user.save!

        if !invited_user  # create company if not from invitation
          company = Company.new(company_params)
          company.save!
        end

        # create company user
        companyUser = CompanyUser.new(user: @user, company: company, role: company_user_role)
        companyUser.save!

        if invited_user
          user_invitation.set_expired
        end
 
      end

      render :show, status: :created, location: @user
      
    rescue Exception => e
      puts e
      puts errors.to_json
      # errors = @user.errors
      errors.merge! @user.errors if @user && @user.errors.size > 0
      puts errors.to_json
      errors.merge! company.errors if company && company.errors.size > 0
      puts errors.to_json
      errors.merge! companyUser.errors if companyUser && companyUser.errors.size > 0
      puts errors.to_json

      render json: errors, status: :unprocessable_entity
    end
    
  end

  # POST /create_user
  # POST /create_user.json
  def create_user
    @user = User.new(normal_user_params)
    @user.role = :user

    if @user.save
      render '/users/create_user.json.jbuilder'
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update

    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/change_password
  # PATCH/PUT /users/change_password.json
  def change_password
    @user = current_user
    if @user.valid_password? params[:user][:current_password]
      @user.password = params[:user][:password]
      @user.password_confirmation = params[:user][:password_confirmation]
      if @user.changed? && @user.save
        render '/users/show.json.jbuilder'
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: {error: t('authlogic.error_messages.old_password_invalid')}, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation,
                                   :confirmed, :approved, :active,
                                   :first_name, :last_name, :phone,
                                   :avatar)
    end
    # Never trust parameters from the scary internet, only allow the white list through.
    def normal_user_params
      params.require(:user).permit(:email, :password, :password_confirmation,
                                   :first_name, :last_name, :phone,
                                   :avatar)
    end
    def company_params
      params.require(:company).permit(:name)
      
    end
end
