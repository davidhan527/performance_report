class AdvertisersController < ApplicationController
  def index
    @advertisers =  Advertiser.pluck(:advertiser_name).uniq
  end

  def show
    @advertiser = Advertiser.where(advertiser_name: params[:format])
  end
end
