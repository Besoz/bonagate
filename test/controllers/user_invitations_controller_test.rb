require 'test_helper'

class UserInvitationsControllerTest < ActionController::TestCase
  setup do
    @user_invitation = user_invitations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:user_invitations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user_invitation" do
    assert_difference('UserInvitation.count') do
      post :create, user_invitation: { company_id: @user_invitation.company_id, random_key: @user_invitation.random_key, reciever_email: @user_invitation.reciever_email, reciever_name: @user_invitation.reciever_name, user_id: @user_invitation.user_id }
    end

    assert_redirected_to user_invitation_path(assigns(:user_invitation))
  end

  test "should show user_invitation" do
    get :show, id: @user_invitation
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user_invitation
    assert_response :success
  end

  test "should update user_invitation" do
    patch :update, id: @user_invitation, user_invitation: { company_id: @user_invitation.company_id, random_key: @user_invitation.random_key, reciever_email: @user_invitation.reciever_email, reciever_name: @user_invitation.reciever_name, user_id: @user_invitation.user_id }
    assert_redirected_to user_invitation_path(assigns(:user_invitation))
  end

  test "should destroy user_invitation" do
    assert_difference('UserInvitation.count', -1) do
      delete :destroy, id: @user_invitation
    end

    assert_redirected_to user_invitations_path
  end
end
