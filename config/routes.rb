Performance::Application.routes.draw do

  get "advertisers/index"
  get "advertisers/show"

  root 'advertisers#index'
  
end
