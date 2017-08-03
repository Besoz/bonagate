class PropertyTypesController < ApplicationController
  before_action :set_property_type, only: [:show, :edit, :update, :destroy]

  # GET /property_types
  # GET /property_types.json
  def index
    @property_types = PropertyType.all
  end

  # GET /property_types/1
  # GET /property_types/1.json
  def show
  end

  # GET /property_types/new
  def new
    @property_type = PropertyType.new
    respond_to do |format|
      format.json { render 'property_types/_form_helper.json.jbuilder' }
    end
  end

  # GET /property_types/1/edit
  def edit
  end

  # POST /property_types
  # POST /property_types.json
  def create
    @property_type = PropertyType.new(property_type_params.except(:property_details_attributes))
    @property_type.set_property_details property_type_params[:property_details_attributes]

    respond_to do |format|
      if @property_type.save
        format.html { redirect_to @property_type, notice: 'Property type was successfully created.' }
        format.json { render :show, status: :created, location: @property_type }
      else
        format.html { render :new }
        format.json { render json: @property_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /property_types/1
  # PATCH/PUT /property_types/1.json
  def update
    @property_type.assign_attributes(property_type_params.except(:property_details_attributes))
    puts property_type_params[:property_details_attributes].to_json
    @property_type.set_property_details property_type_params[:property_details_attributes]

    respond_to do |format|
      if  @property_type.save
        format.html { redirect_to @property_type, notice: 'Property type was successfully updated.' }
        format.json { render :show, status: :ok, location: @property_type }
      else
        format.html { render :edit }
        format.json { render json: @property_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /property_types/1
  # DELETE /property_types/1.json
  def destroy
    @property_type.destroy
    respond_to do |format|
      format.html { redirect_to property_types_url, notice: 'Property type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_property_type
    @property_type = PropertyType.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def property_type_params
    params.require(:property_type).permit(:code, :name, :state, :property_details_attributes =>[:id], :property_state_ids =>[])
  end
end
