class ChangeValueTypeToDecimal < ActiveRecord::Migration
  def change
    change_column :property_payment_plans, :total_value, :decimal
    change_column :property_payment_plan_records, :value, :decimal
  end
end
