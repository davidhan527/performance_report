require 'csv'

desc "Import advertisers from csv file"
task :import => [:environment] do
  CSV.foreach('db/MediaMathPerformanceReport.csv', :headers => true) do |row|
    Advertiser.create!(row.to_hash)
  end
end
