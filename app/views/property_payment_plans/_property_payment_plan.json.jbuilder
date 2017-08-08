json.extract! property_payment_plan, :id, :name, :description, :total_value, :property_id, :created_at, :updated_at
json.url property_payment_plan_url(property_payment_plan, format: :json)
json.property_payment_plan_records_attributes property_payment_plan.property_payment_plan_records,
                                       partial: 'property_payment_plan_records/property_payment_plan_record.json.jbuilder',
                                       as: :property_payment_plan_record