class PropertyDetailsController < ApplicationController
  before_action :set_property_detail, only: [:show, :edit, :update, :destroy]

  # GET /property_details
  # GET /property_details.json
  def index
    @property_details = PropertyDetail.all
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
      params.require(:property_detail).permit(:code, :name)
    end
end
