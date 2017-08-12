Rails.application.routes.draw do
  root to: "homes#index"
  resource :sign, only: [:show]

  namespace :api, defaults: { format: 'json' }  do
    resource :sign_in, only: [:create]
    resource :sign_out, only: [:destroy]

    resources :homes, only: [:index, :show]
    # # devise_for :users, controllers: { registrations: "api/users/registrations", sessions: "api/users/sessions", passwords: "api/users/passwords" }
    # resources :gifs, only: [:create]

    # resources :users, only: [] do
    #   namespace :profile, module: :users do
    #     resources :gifs, only: [:index], module: :profile
    #     resource :account, only: [:show, :update], module: :profile
    #     resource :cash_out, only: [:show, :create], module: :profile
    #   end
    # end

    # namespace :boss do
    #   resources :gifs, only: [:index]
    #   resources :users, only: [:index, :show] do
    #     resource :lock, only: [:update], module: :users
    #     resources :cash_outs, only: [:update], module: :users
    #   end
    #   resources :countries, only: [:index, :update]
    #   resources :web_ads, only: [:index, :update]
    # end
  end
end
