class PropertyDetailsController < ApplicationController
  before_action :set_property_detail, only: [:show, :edit, :update, :destroy]

  include PropertyTypesHelper

  # GET /property_details
  # GET /property_details.json
  def index
    @property_details = PropertyDetail.all
    puts params.to_json
  end

  def index_by_ids
    puts params.to_json
    @property_details = PropertyDetail.where(id: params[:details_ids])

    respond_to do |format|
      format.html { }
      format.json { render :index }
    end
  end

  # GET /property_details/1
  # GET /property_details/1.json
  def show
  end

  # GET /property_details/new
  def new
    @property_detail = PropertyDetail.new
  end

  # GET /property_details/1/edit
  def edit
  end

  # POST /property_details
  # POST /property_details.json
  def create
    puts property_detail_params.to_json

    puts property_detail_extended_params.to_json

    @property_detail = PropertyDetail.new(property_detail_params)

    respond_to do |format|
      if @property_detail.save
        format.html { redirect_to @property_detail, notice: 'Property detail was successfully created.' }
        format.json { render :show, status: :created, location: @property_detail }
      else
        format.html { render :new }
        format.json { render json: @property_detail.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /property_details/1
  # PATCH/PUT /property_details/1.json
  def update
    # check if value options or value type will change and the details is already used
    if((@property_detail.value_type != property_detail_params[:value_type] || 
      JSON.parse(@property_detail.value_options) != property_detail_params[:value_options]) &&
      !Property.get_affected_with_property_detail(@property_detail.id).empty?)

      affected_properties = Property.get_affected_with_property_detail(@property_detail.id)
      affected_types = PropertyType.get_affected_with_property_detail(@property_detail.id)

      response = {affected_properties: affected_properties, affected_types: affected_types}

      puts response.to_json
      render json: response, status: :multi_status
    else
      respond_to do |format|
        if @property_detail.update(property_detail_params)
          format.html { redirect_to @property_detail, notice: 'Property detail was successfully updated.' }
          format.json { render :show, status: :ok, location: @property_detail }
        else
          format.html { render :edit }
          format.json { render json: @property_detail.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # DELETE /property_details/1
  # DELETE /property_details/1.json
  def destroy
    @property_detail.destroy
    respond_to do |format|
      format.html { redirect_to property_details_url, notice: 'Property detail was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_property_detail
    @property_detail = PropertyDetail.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def property_detail_params
    params.require(:property_detail).permit(:id, :code, :name, :value_type, 
    :details_ids, :old_detail_id, :value_options => [])
  end

  def property_detail_extended_params
    params.require(:property_detail).permit(:id, :code, :name, :value_type, 
    :details_ids, :old_detail_id, :value_options => [], affected_types: [:id])
  end
end
