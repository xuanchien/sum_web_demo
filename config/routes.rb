Rails.application.routes.draw do
  get 'documents/index'

  get 'documents/show'

	root :to => 'home#index'
  get '/about' => 'home#about'
  get '/online' => 'home#online'

  post '/summarize' => 'home#summarize'

  resources :documents
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
