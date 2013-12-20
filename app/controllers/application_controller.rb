class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_filter :get_advertisers
  
  def get_advertisers
    @advertisers =  Advertiser.pluck(:advertiser_name).uniq
  end

  protect_from_forgery with: :exception

end
