class PropertyDetailInstancesController < ApplicationController
  before_action :set_property_detail_instance, only: [:show, :edit, :update, :destroy]

  # GET /property_detail_instances
  # GET /property_detail_instances.json
  def index
    @property_detail_instances = PropertyDetailInstance.all
  end

  # GET /property_detail_instances/1
  # GET /property_detail_instances/1.json
  def show
  end

  # GET /property_detail_instances/new
  def new
    @property_detail_instance = PropertyDetailInstance.new
  end

  # GET /property_detail_instances/1/edit
  def edit
  end

  # POST /property_detail_instances
  # POST /property_detail_instances.json
  def create
    @property_detail_instance = PropertyDetailInstance.new(property_detail_instance_params)

    respond_to do |format|
      if @property_detail_instance.save
        format.html { redirect_to @property_detail_instance, notice: 'Property detail instance was successfully created.' }
        format.json { render :show, status: :created, location: @property_detail_instance }
      else
        format.html { render :new }
        format.json { render json: @property_detail_instance.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /property_detail_instances/1
  # PATCH/PUT /property_detail_instances/1.json
  def update
    respond_to do |format|
      if @property_detail_instance.update(property_detail_instance_params)
        format.html { redirect_to @property_detail_instance, notice: 'Property detail instance was successfully updated.' }
        format.json { render :show, status: :ok, location: @property_detail_instance }
      else
        format.html { render :edit }
        format.json { render json: @property_detail_instance.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /property_detail_instances/1
  # DELETE /property_detail_instances/1.json
  def destroy
    @property_detail_instance.destroy
    respond_to do |format|
      format.html { redirect_to property_detail_instances_url, notice: 'Property detail instance was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_property_detail_instance
      @property_detail_instance = PropertyDetailInstance.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def property_detail_instance_params
      params.require(:property_detail_instance).permit(:property_id, :property_detail_id, :value)
    end
end
