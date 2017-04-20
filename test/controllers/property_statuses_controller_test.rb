require 'test_helper'

class PropertyStatusesControllerTest < ActionController::TestCase
  setup do
    @property_status = property_statuses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:property_statuses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create property_status" do
    assert_difference('PropertyStatus.count') do
      post :create, property_status: { code: @property_status.code, name: @property_status.name }
    end

    assert_redirected_to property_status_path(assigns(:property_status))
  end

  test "should show property_status" do
    get :show, id: @property_status
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @property_status
    assert_response :success
  end

  test "should update property_status" do
    patch :update, id: @property_status, property_status: { code: @property_status.code, name: @property_status.name }
    assert_redirected_to property_status_path(assigns(:property_status))
  end

  test "should destroy property_status" do
    assert_difference('PropertyStatus.count', -1) do
      delete :destroy, id: @property_status
    end

    assert_redirected_to property_statuses_path
  end
end
