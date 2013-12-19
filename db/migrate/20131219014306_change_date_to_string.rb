class ChangeDateToString < ActiveRecord::Migration
  def up
   change_column :advertisers, :date, :string
  end
  def down
   change_column :advertisers, :date, :string
  end
end
