class PropertyServiceTypesController < ApplicationController
  before_action :set_property_service_type, only: [:edit, :update, :destroy]

  load_and_authorize_resource
  # GET /property_service_types
  # GET /property_service_types.json
  def index
  end

  # GET /property_service_types/1
  # GET /property_service_types/1.json
  def show
  end

  # GET /property_service_types/new
  def new
    @property_service_type = PropertyServiceType.new
  end

  # GET /property_service_types/1/edit
  def edit
  end

  # POST /property_service_types
  # POST /property_service_types.json
  def create
    @property_service_type = PropertyServiceType.new(property_service_type_params)

    respond_to do |format|
      if @property_service_type.save
        format.html { redirect_to @property_service_type, notice: 'Property service type was successfully created.' }
        format.json { render :show, status: :created, location: @property_service_type }
      else
        format.html { render :new }
        format.json { render json: @property_service_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /property_service_types/1
  # PATCH/PUT /property_service_types/1.json
  def update
    respond_to do |format|
      if @property_service_type.update(property_service_type_params)
        format.html { redirect_to @property_service_type, notice: 'Property service type was successfully updated.' }
        format.json { render :show, status: :ok, location: @property_service_type }
      else
        format.html { render :edit }
        format.json { render json: @property_service_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /property_service_types/1
  # DELETE /property_service_types/1.json
  def destroy
    @property_service_type.destroy
    respond_to do |format|
      format.html { redirect_to property_service_types_url, notice: 'Property service type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_property_service_type
      @property_service_type = PropertyServiceType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def property_service_type_params
      params.require(:property_service_type).permit(:code, :name, :name_en, :name_ar, :state)
    end
end
