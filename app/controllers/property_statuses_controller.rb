class PropertyStatusesController < ApplicationController
  before_action :set_property_status, only: [:show, :edit, :update, :destroy]

  # GET /property_statuses
  # GET /property_statuses.json
  def index
    @property_statuses = PropertyStatus.all
  end

  # GET /property_statuses/1
  # GET /property_statuses/1.json
  def show
  end

  # GET /property_statuses/new
  def new
    @property_status = PropertyStatus.new
  end

  # GET /property_statuses/1/edit
  def edit
  end

  # POST /property_statuses
  # POST /property_statuses.json
  def create
    @property_status = PropertyStatus.new(property_status_params)

    respond_to do |format|
      if @property_status.save
        format.html { redirect_to @property_status, notice: 'Property status was successfully created.' }
        format.json { render :show, status: :created, location: @property_status }
      else
        format.html { render :new }
        format.json { render json: @property_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /property_statuses/1
  # PATCH/PUT /property_statuses/1.json
  def update
    respond_to do |format|
      if @property_status.update(property_status_params)
        format.html { redirect_to @property_status, notice: 'Property status was successfully updated.' }
        format.json { render :show, status: :ok, location: @property_status }
      else
        format.html { render :edit }
        format.json { render json: @property_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /property_statuses/1
  # DELETE /property_statuses/1.json
  def destroy
    @property_status.destroy
    respond_to do |format|
      format.html { redirect_to property_statuses_url, notice: 'Property status was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_property_status
      @property_status = PropertyStatus.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def property_status_params
      params.require(:property_status).permit(:code, :name, :name_en, :name_ar)
    end
end
