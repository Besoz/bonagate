class PropertyStatesController < ApplicationController
  before_action :set_property_state, only: [:show, :edit, :update, :destroy]

  # GET /property_states
  # GET /property_states.json
  def index
    @property_states = PropertyState.all
  end

  def index_by_id
    @property_states = PropertyState.all
  end


  # GET /property_states/1
  # GET /property_states/1.json
  def show
  end

  # GET /property_states/new
  def new
    @property_state = PropertyState.new
  end

  # GET /property_states/1/edit
  def edit
  end

  # POST /property_states
  # POST /property_states.json
  def create
    @property_state = PropertyState.new(property_state_params)

    respond_to do |format|
      if @property_state.save
        format.html { redirect_to @property_state, notice: 'Property state was successfully created.' }
        format.json { render :show, status: :created, location: @property_state }
      else
        format.html { render :new }
        format.json { render json: @property_state.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /property_states/1
  # PATCH/PUT /property_states/1.json
  def update
    respond_to do |format|
      if @property_state.update(property_state_params)
        format.html { redirect_to @property_state, notice: 'Property state was successfully updated.' }
        format.json { render :show, status: :ok, location: @property_state }
      else
        format.html { render :edit }
        format.json { render json: @property_state.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /property_states/1
  # DELETE /property_states/1.json
  def destroy
    @property_state.destroy
    respond_to do |format|
      format.html { redirect_to property_states_url, notice: 'Property state was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_property_state
      @property_state = PropertyState.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def property_state_params
      params.require(:property_state).permit(:code, :name, :name_en, :name_ar, :state)
    end
end
