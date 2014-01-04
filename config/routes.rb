Performance::Application.routes.draw do

  get "advertisers/index"
  get "advertisers/show"
  get "advertisers/aggregate"

  root 'advertisers#index'
  
end
