class PropertyDetailsController < ApplicationController
  before_action :set_property_detail, only: [:show, :edit, :update, :destroy]

  include PropertyDetailsHelper

  # GET /property_details
  # GET /property_details.json
  def index
    @property_details = PropertyDetail.all
    puts params.to_json
  end

  def index_by_id
    puts params.to_json
    @property_details = PropertyDetail.all

    respond_to do |format|
      format.html { }
      format.json { render :index_by_id }
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
    @property_detail = PropertyDetail.new(property_detail_params)

    duplicate_detail_id = property_detail_extended_params[:duplicate_detail_id]
    types_need_update = property_detail_extended_params[:types_need_update]

    respond_to do |format|
      if @property_detail.save

        if duplicate_detail_id &&
           types_need_update && !types_need_update.empty?

          types_need_update_ids = types_need_update.map { |x| x[:id] }
          PropertyTypeDetail
            .where(property_type_id: types_need_update_ids,
                   property_detail_id: duplicate_detail_id)
            .update_all(property_detail_id: @property_detail.id)
        end

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
    @property_detail.attributes = property_detail_params
    used_value_options = @property_detail.get_used_value_options
    value_type_changed = @property_detail.value_type_changed?
    affected_properties = @property_detail.get_properties_using

    puts 'ddddddddddddddddddddddd'
    # check if value options or value type will change and the details is already used

    if (affected_properties.any? && value_type_changed) || used_value_options.any?

      affected_types = PropertyType.get_affected_with_property_detail(@property_detail.id)

      # response = { affected_properties: affected_properties,
      #              value_options_used: used_value_options,
      #              affected_types: affected_types }

      # puts response.to_json
      render 'property_details/_value_option_effected_data.json.jbuilder',
             locals: {  affected_properties: affected_properties,
                   used_value_options: used_value_options,
                   affected_types: affected_types }, status: :multi_status
    else
      respond_to do |format|
        if @property_detail.save
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
    params.require(:property_detail).permit(:id, :code, :name, :name_en, :name_ar, :value_type, :mandatory, 
    :state, :details_ids, :property_detail_category_id, :value_options => [], 
    property_detail_value_options_attributes: [:id, :name_en, :name_ar, :_destroy])
  end

  def property_detail_extended_params
    params.require(:property_detail).permit(:id, :code, :name, :name_en, :name_ar, :value_type, :mandatory,
    :details_ids, :duplicate_detail_id, :value_options => [], types_need_update: [:id])
  end
end
