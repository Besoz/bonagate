require 'test_helper'

class PropertyServiceTypesControllerTest < ActionController::TestCase
  setup do
    @property_service_type = property_service_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:property_service_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create property_service_type" do
    assert_difference('PropertyServiceType.count') do
      post :create, property_service_type: { code: @property_service_type.code, name: @property_service_type.name }
    end

    assert_redirected_to property_service_type_path(assigns(:property_service_type))
  end

  test "should show property_service_type" do
    get :show, id: @property_service_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @property_service_type
    assert_response :success
  end

  test "should update property_service_type" do
    patch :update, id: @property_service_type, property_service_type: { code: @property_service_type.code, name: @property_service_type.name }
    assert_redirected_to property_service_type_path(assigns(:property_service_type))
  end

  test "should destroy property_service_type" do
    assert_difference('PropertyServiceType.count', -1) do
      delete :destroy, id: @property_service_type
    end

    assert_redirected_to property_service_types_path
  end
end
