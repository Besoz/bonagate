require 'test_helper'

class PropertyDetailCategoriesControllerTest < ActionController::TestCase
  setup do
    @property_detail_category = property_detail_categories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:property_detail_categories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create property_detail_category" do
    assert_difference('PropertyDetailCategory.count') do
      post :create, property_detail_category: { name_ar: @property_detail_category.name_ar, name_en: @property_detail_category.name_en }
    end

    assert_redirected_to property_detail_category_path(assigns(:property_detail_category))
  end

  test "should show property_detail_category" do
    get :show, id: @property_detail_category
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @property_detail_category
    assert_response :success
  end

  test "should update property_detail_category" do
    patch :update, id: @property_detail_category, property_detail_category: { name_ar: @property_detail_category.name_ar, name_en: @property_detail_category.name_en }
    assert_redirected_to property_detail_category_path(assigns(:property_detail_category))
  end

  test "should destroy property_detail_category" do
    assert_difference('PropertyDetailCategory.count', -1) do
      delete :destroy, id: @property_detail_category
    end

    assert_redirected_to property_detail_categories_path
  end
end
