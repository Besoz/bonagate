Rails.application.routes.draw do

  root to: 'pages#index'
    
  resources :property_detail_categories do
    collection do
      get 'index_by_id'
    end
  end

  resources :user_invitations do
    collection do
      match "/populate/:rand_key", to: "user_invitations#populate",     via: :get
    end
  end
  resources :property_service_types
  
  resources :property_states do
    collection do
      get 'index_by_id'
    end
  end

  resources :property_statuses
  resources :property_detail_instances
  resources :property_details do
    collection do
      get 'index_by_id'
    end
  end
  resources :property_types
  resources :properties do
    member do
      put 'upload_image'
    end
    collection do
      get 'search'
    end
  end
  resources :companies
  resources :companies
  resources :user_sessions, only: [:create, :destroy, :current_user] do
    collection do
      match "/current_user", to: "user_sessions#show_current_user", via: :get
    end
  end
  resources :users do
    collection do
      post 'create_user'
      put 'change_password'
    end
  end

  delete '/sign_out', to: 'user_sessions#destroy', as: :sign_out
  get '/sign_in', to: 'user_sessions#new', as: :sign_in

  get '/translation', to: 'pages#translation', as: :translation
  put '/change_locale', to: 'pages#change_locale', as: :change_locale

  get '/user_profile/:tab', to: 'users#user_profile', as: :user_profile
  get "/user_profile" , to: redirect('/user_profile/favorites')

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
