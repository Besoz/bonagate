require 'test_helper'

class PropertyDetailInstancesControllerTest < ActionController::TestCase
  setup do
    @property_detail_instance = property_detail_instances(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:property_detail_instances)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create property_detail_instance" do
    assert_difference('PropertyDetailInstance.count') do
      post :create, property_detail_instance: { property_detail_id: @property_detail_instance.property_detail_id, property_id: @property_detail_instance.property_id, value: @property_detail_instance.value }
    end

    assert_redirected_to property_detail_instance_path(assigns(:property_detail_instance))
  end

  test "should show property_detail_instance" do
    get :show, id: @property_detail_instance
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @property_detail_instance
    assert_response :success
  end

  test "should update property_detail_instance" do
    patch :update, id: @property_detail_instance, property_detail_instance: { property_detail_id: @property_detail_instance.property_detail_id, property_id: @property_detail_instance.property_id, value: @property_detail_instance.value }
    assert_redirected_to property_detail_instance_path(assigns(:property_detail_instance))
  end

  test "should destroy property_detail_instance" do
    assert_difference('PropertyDetailInstance.count', -1) do
      delete :destroy, id: @property_detail_instance
    end

    assert_redirected_to property_detail_instances_path
  end
end
