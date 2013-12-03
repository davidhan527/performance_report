class AdvertisersController < ApplicationController
  def index
    @advertisers = Advertiser.order("date asc")
  end

  def show
    @advertiser = Advertiser.where(advertiser_name: params[:format])
  end
end
