class ChangePrecisionAdvertisersTable < ActiveRecord::Migration
  def up
   change_column :advertisers, :spend, :decimal, :precision => 5, :scale => 2
  end
  def down
   change_column :advertisers, :spend, :decimal, :precision => 4, :scale => 2
  end
end
