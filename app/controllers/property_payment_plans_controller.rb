class PropertyPaymentPlansController < ApplicationController
  before_action :set_property_payment_plan, only: [:show, :edit, :update, :destroy]

  # GET /property_payment_plans
  # GET /property_payment_plans.json
  def index
    @property_payment_plans = PropertyPaymentPlan.all
  end

  # GET /property_payment_plans/1
  # GET /property_payment_plans/1.json
  def show
  end

  # GET /property_payment_plans/new
  def new
    @property_payment_plan = PropertyPaymentPlan.new
  end

  # GET /property_payment_plans/1/edit
  def edit
  end

  # POST /property_payment_plans
  # POST /property_payment_plans.json
  def create
    @property_payment_plan = PropertyPaymentPlan.new(property_payment_plan_params)

    respond_to do |format|
      if @property_payment_plan.save
        format.html { redirect_to @property_payment_plan, notice: 'Property payment plan was successfully created.' }
        format.json { render :show, status: :created, location: @property_payment_plan }
      else
        format.html { render :new }
        format.json { render json: @property_payment_plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /property_payment_plans/1
  # PATCH/PUT /property_payment_plans/1.json
  def update
    respond_to do |format|
      if @property_payment_plan.update(property_payment_plan_params)
        format.html { redirect_to @property_payment_plan, notice: 'Property payment plan was successfully updated.' }
        format.json { render :show, status: :ok, location: @property_payment_plan }
      else
        format.html { render :edit }
        format.json { render json: @property_payment_plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /property_payment_plans/1
  # DELETE /property_payment_plans/1.json
  def destroy
    @property_payment_plan.destroy
    respond_to do |format|
      format.html { redirect_to property_payment_plans_url, notice: 'Property payment plan was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_property_payment_plan
      @property_payment_plan = PropertyPaymentPlan.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def property_payment_plan_params
      params.require(:property_payment_plan).permit(:name, :description, :total_value, :property_id)
    end
end
