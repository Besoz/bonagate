class PropertiesController < ApplicationController
  before_action :set_property, only: [:show, :edit, :update, :destroy, 
  :upload_image]

  #loads items in @properties
  load_and_authorize_resource

  # GET /properties
  # GET /properties.json
  def index
    unless current_user && current_user.company_user?

      if params[:page].to_i > 0
        page_number = params[:page].to_i
      else
        page_number = 1
      end

      @properties = @properties.paginate(page: page_number, per_page: 1)

    end
  end

  # GET /properties/search
  # GET /properties/search.json
  def search
    respond_to do |format|
      format.html { render :index }
      format.json { render :search }
    end
  end

  # GET /properties/1
  # GET /properties/1.json
  def show
  end

  # GET /properties/new
  def new
    @property = Property.new
  end

  # GET /properties/1/edit
  def edit
  end

  # POST /properties
  # POST /properties.json
  def create 
    @property = Property.new(property_params)
    @property.company_id = current_user.company_user.company_id

    respond_to do |format|
      if @property.save!
        format.html { redirect_to @property, notice: 'Property was successfully created.' }
        format.json { render :show, status: :created, location: @property }
      else
        format.html { render :new }
        format.json { render json: @property.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /properties/1
  # PATCH/PUT /properties/1.json
  def update    
    respond_to do |format|
      if @property.update(property_params)
        if(params[:property][:deleted_images_ids])
          @property.property_images.where(id: params[:property][:deleted_images_ids]).destroy_all
        end 

        format.html { redirect_to @property, notice: 'Property was successfully updated.' }
        format.json { render :show, status: :ok, location: @property }
      else
        format.html { render :edit }
        format.json { render json: @property.errors, status: :unprocessable_entity}
      end
    end
  end

  def upload_image
    @property.property_images << PropertyImage.create(property_params[:property_images_attributes])
    render json: "",status: :ok
  end


  # DELETE /properties/1
  # DELETE /properties/1.json
  def destroy
    @property.destroy
    respond_to do |format|
      format.html { redirect_to properties_url, notice: 'Property was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  #GET /properties/templates.json
  def templates
    @properties = @properties.joins :property_as_template_datum
    
    respond_to do |format|
      format.json {render 'properties/index'}
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_property
    @property = Property.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def property_params
    params.require(:property).permit(:address, :company_id, :property_type_id, :property_status_id,
                                     :property_state_id, :lat, :lng, :country, :city, :area, :street, 
                                     :number, :floor, :publish, :company_ids,
                                     {company_ids: []},
                                     {property_images_attributes: :avatar},
                                     {property_detail_instance_value_options_attributes: :property_detail_value_option_id},
                                     {property_as_template_datum_attributes: [:name_en, :name_ar]},
                                     property_detail_instances_attributes: ['_destroy', :id, 
                                      :property_detail_id, :value, :property_detail_value_option_ids,
                                     property_detail_value_option_ids: [],
                                     property_detail_instance_value_options_attributes: 
                                     [:property_detail_value_option_id]],
                                     property_payment_plans_attributes: [:id, :total_value, :name,
                                      property_payment_plan_records_attributes: 
                                      [:id, :value, :description, :periodic, :period]])
  end
end
