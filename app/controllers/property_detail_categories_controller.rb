class PropertyDetailCategoriesController < ApplicationController
  before_action :set_property_detail_category, only: [:show, :edit, :update, :destroy]

  # GET /property_detail_categories
  # GET /property_detail_categories.json
  def index
    @property_detail_categories = PropertyDetailCategory.all
  end

  # GET /property_detail_categories/1
  # GET /property_detail_categories/1.json
  def show
  end

  # GET /property_detail_categories/new
  def new
    @property_detail_category = PropertyDetailCategory.new
  end

  # GET /property_detail_categories/1/edit
  def edit
  end

  # POST /property_detail_categories
  # POST /property_detail_categories.json
  def create
    @property_detail_category = PropertyDetailCategory.new(property_detail_category_params)

    respond_to do |format|
      if @property_detail_category.save
        format.html { redirect_to @property_detail_category, notice: 'Property detail category was successfully created.' }
        format.json { render :show, status: :created, location: @property_detail_category }
      else
        format.html { render :new }
        format.json { render json: @property_detail_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /property_detail_categories/1
  # PATCH/PUT /property_detail_categories/1.json
  def update
    respond_to do |format|
      if @property_detail_category.update(property_detail_category_params)
        format.html { redirect_to @property_detail_category, notice: 'Property detail category was successfully updated.' }
        format.json { render :show, status: :ok, location: @property_detail_category }
      else
        format.html { render :edit }
        format.json { render json: @property_detail_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /property_detail_categories/1
  # DELETE /property_detail_categories/1.json
  def destroy
    @property_detail_category.destroy
    respond_to do |format|
      format.html { redirect_to property_detail_categories_url, notice: 'Property detail category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_property_detail_category
      @property_detail_category = PropertyDetailCategory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def property_detail_category_params
      params.require(:property_detail_category).permit(:name_en, :name_ar)
    end
end
