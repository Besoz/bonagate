require 'test_helper'

class PropertyPaymentPlansControllerTest < ActionController::TestCase
  setup do
    @property_payment_plan = property_payment_plans(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:property_payment_plans)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create property_payment_plan" do
    assert_difference('PropertyPaymentPlan.count') do
      post :create, property_payment_plan: { description: @property_payment_plan.description, name: @property_payment_plan.name, property_id: @property_payment_plan.property_id, total_value: @property_payment_plan.total_value }
    end

    assert_redirected_to property_payment_plan_path(assigns(:property_payment_plan))
  end

  test "should show property_payment_plan" do
    get :show, id: @property_payment_plan
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @property_payment_plan
    assert_response :success
  end

  test "should update property_payment_plan" do
    patch :update, id: @property_payment_plan, property_payment_plan: { description: @property_payment_plan.description, name: @property_payment_plan.name, property_id: @property_payment_plan.property_id, total_value: @property_payment_plan.total_value }
    assert_redirected_to property_payment_plan_path(assigns(:property_payment_plan))
  end

  test "should destroy property_payment_plan" do
    assert_difference('PropertyPaymentPlan.count', -1) do
      delete :destroy, id: @property_payment_plan
    end

    assert_redirected_to property_payment_plans_path
  end
end
