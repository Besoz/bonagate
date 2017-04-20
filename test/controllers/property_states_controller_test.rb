require 'test_helper'

class PropertyStatesControllerTest < ActionController::TestCase
  setup do
    @property_state = property_states(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:property_states)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create property_state" do
    assert_difference('PropertyState.count') do
      post :create, property_state: { code: @property_state.code, name: @property_state.name }
    end

    assert_redirected_to property_state_path(assigns(:property_state))
  end

  test "should show property_state" do
    get :show, id: @property_state
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @property_state
    assert_response :success
  end

  test "should update property_state" do
    patch :update, id: @property_state, property_state: { code: @property_state.code, name: @property_state.name }
    assert_redirected_to property_state_path(assigns(:property_state))
  end

  test "should destroy property_state" do
    assert_difference('PropertyState.count', -1) do
      delete :destroy, id: @property_state
    end

    assert_redirected_to property_states_path
  end
end
