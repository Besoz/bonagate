class PropertyPaymentPlanRecordsController < ApplicationController
  before_action :set_property_payment_plan_record, only: [:show, :edit, :update, :destroy]

  # GET /property_payment_plan_records
  # GET /property_payment_plan_records.json
  def index
    @property_payment_plan_records = PropertyPaymentPlanRecord.all
  end

  # GET /property_payment_plan_records/1
  # GET /property_payment_plan_records/1.json
  def show
  end

  # GET /property_payment_plan_records/new
  def new
    @property_payment_plan_record = PropertyPaymentPlanRecord.new
  end

  # GET /property_payment_plan_records/1/edit
  def edit
  end

  # POST /property_payment_plan_records
  # POST /property_payment_plan_records.json
  def create
    @property_payment_plan_record = PropertyPaymentPlanRecord.new(property_payment_plan_record_params)

    respond_to do |format|
      if @property_payment_plan_record.save
        format.html { redirect_to @property_payment_plan_record, notice: 'Property payment plan record was successfully created.' }
        format.json { render :show, status: :created, location: @property_payment_plan_record }
      else
        format.html { render :new }
        format.json { render json: @property_payment_plan_record.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /property_payment_plan_records/1
  # PATCH/PUT /property_payment_plan_records/1.json
  def update
    respond_to do |format|
      if @property_payment_plan_record.update(property_payment_plan_record_params)
        format.html { redirect_to @property_payment_plan_record, notice: 'Property payment plan record was successfully updated.' }
        format.json { render :show, status: :ok, location: @property_payment_plan_record }
      else
        format.html { render :edit }
        format.json { render json: @property_payment_plan_record.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /property_payment_plan_records/1
  # DELETE /property_payment_plan_records/1.json
  def destroy
    @property_payment_plan_record.destroy
    respond_to do |format|
      format.html { redirect_to property_payment_plan_records_url, notice: 'Property payment plan record was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_property_payment_plan_record
      @property_payment_plan_record = PropertyPaymentPlanRecord.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def property_payment_plan_record_params
      params.require(:property_payment_plan_record).permit(:description, :value, :period, :periodic, :property_payment_plan_id)
    end
end
