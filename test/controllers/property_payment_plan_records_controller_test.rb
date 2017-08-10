require 'test_helper'

class PropertyPaymentPlanRecordsControllerTest < ActionController::TestCase
  setup do
    @property_payment_plan_record = property_payment_plan_records(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:property_payment_plan_records)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create property_payment_plan_record" do
    assert_difference('PropertyPaymentPlanRecord.count') do
      post :create, property_payment_plan_record: { description: @property_payment_plan_record.description, period: @property_payment_plan_record.period, periodic: @property_payment_plan_record.periodic, property_payment_plan_id: @property_payment_plan_record.property_payment_plan_id, value: @property_payment_plan_record.value }
    end

    assert_redirected_to property_payment_plan_record_path(assigns(:property_payment_plan_record))
  end

  test "should show property_payment_plan_record" do
    get :show, id: @property_payment_plan_record
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @property_payment_plan_record
    assert_response :success
  end

  test "should update property_payment_plan_record" do
    patch :update, id: @property_payment_plan_record, property_payment_plan_record: { description: @property_payment_plan_record.description, period: @property_payment_plan_record.period, periodic: @property_payment_plan_record.periodic, property_payment_plan_id: @property_payment_plan_record.property_payment_plan_id, value: @property_payment_plan_record.value }
    assert_redirected_to property_payment_plan_record_path(assigns(:property_payment_plan_record))
  end

  test "should destroy property_payment_plan_record" do
    assert_difference('PropertyPaymentPlanRecord.count', -1) do
      delete :destroy, id: @property_payment_plan_record
    end

    assert_redirected_to property_payment_plan_records_path
  end
end
