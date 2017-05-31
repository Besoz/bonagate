json.list @companies, partial: 'companies/company', as: :company
json.state_options Company.state.values