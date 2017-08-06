json.array! @payments.includes(:payment_records, :person).order('created_at DESC'), partial: 'payments/payment', as: :payment
