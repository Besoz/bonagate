class UserInvitationsController < ApplicationController
  before_action :set_user_invitation, only: [:show, :edit, :update, :destroy]

  before_filter :require_user

  load_and_authorize_resource except: [:populate]

  # GET /user_invitations
  # GET /user_invitations.json
  def index
    @user_invitations = UserInvitation.all
  end

  # GET /user_invitations/1
  # GET /user_invitations/1.json
  def show
  end

  # GET /user_invitations/new
  def new
    @user_invitation = UserInvitation.new
  end

  # GET /user_invitations/1/edit
  def edit
  end

  # POST /user_invitations
  # POST /user_invitations.json
  def create
        puts "ppppppppppppppppp"

    user_invitation_params = {reciever_email: user_params[:email],
                                      user_id: current_user.id,
                                      company_id: current_user.company_user.company_id,
                                      random_key: Digest::SHA1.hexdigest([Time.now, rand].join)}
        puts "ppppppppppppppppp"

    @user_invitation = UserInvitation.new(user_invitation_params)
    # @user_invitation = UserInvitation.new(user_invitation_params)
    puts "ppppppppppppppppp"
    respond_to do |format|
      if @user_invitation.save

        UserMailer.invitation_email(@user_invitation.reciever_email, 
          @user_invitation.random_key).deliver_later


        format.html { redirect_to @user_invitation, notice: 'User invitation was successfully created.' }
        format.json { render :show, status: :created, location: @user_invitation }
      else
        format.html { render :new }
        format.json { render json: @user_invitation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /user_invitations/1
  # PATCH/PUT /user_invitations/1.json
  def update
    respond_to do |format|
      if @user_invitation.update(user_invitation_params)
        format.html { redirect_to @user_invitation, notice: 'User invitation was successfully updated.' }
        format.json { render :show, status: :ok, location: @user_invitation }
      else
        format.html { render :edit }
        format.json { render json: @user_invitation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_invitations/1
  # DELETE /user_invitations/1.json
  def destroy
    @user_invitation.destroy
    respond_to do |format|
      format.html { redirect_to user_invitations_url, notice: 'User invitation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def populate

    user_invitation = UserInvitation.with_state(:active).find_by(random_key: params[:rand_key])
    if(user_invitation)
      company = Company.find(user_invitation.company_id)
      render json: {reciever_email: user_invitation.reciever_email, company: company}
    else
      render json: 'Invitation not found', status: :unprocessable_entity
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_invitation
      @user_invitation = UserInvitation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_invitation_params
      params.require(:user_invitation).permit(:reciever_email, :reciever_name, :company_id)
    end

    def user_params
      params.require(:user).permit(:email, :role)
    end

end
