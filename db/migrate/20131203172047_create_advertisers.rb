class CreateAdvertisers < ActiveRecord::Migration
  def change
    create_table :advertisers do |t|
      t.date :date
      t.string :advertiser_name
      t.integer :impressions
      t.integer :clicks
      t.integer :post_click_activities
      t.integer :post_view_activities
      t.decimal :spend, :precision => 4, :scale => 2
      t.decimal :cpm, :precision => 3, :scale => 2
      t.decimal :cpa, :precision => 4, :scale => 2
      t.decimal :cpc, :precision => 4, :scale => 2
      t.decimal :ctr, :precision => 3, :scale => 2
      t.timestamps
    end
  end
end
