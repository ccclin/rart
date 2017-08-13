Rails.application.routes.draw do
  root to: "homes#index"
  resource :sign, only: [:show]
  resources :jobs, only: [:new]

  namespace :api, defaults: { format: 'json' }  do
    resource :sign_in, only: [:create]
    resource :sign_out, only: [:destroy]

    resources :homes, only: [:index]
    resources :jobs, only: [:new, :create]

    # resources :users, only: [] do
    #   namespace :profile, module: :users do
    #     resources :gifs, only: [:index], module: :profile
    #     resource :account, only: [:show, :update], module: :profile
    #     resource :cash_out, only: [:show, :create], module: :profile
    #   end
    # end
  end
end
