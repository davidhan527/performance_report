# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

jQuery ->
  Morris.Line
    element: 'advertisers_chart'
    data: $('#advertisers_chart').data('advertiser')
    xkey: 'date'
    ykeys: ['cpm', 'cpc', 'cpa', 'ctr']
    labels: ['CPM', 'CPC', 'CPA', 'CTR']


  Morris.Line
    element: 'advertisers_chart2'
    data: $('#advertisers_chart').data('advertiser')
    xkey: 'date'
    ykeys: ['impressions', 'clicks']
    labels: ['Impressisons', 'Clicks']    


  Morris.Line
    element: 'advertisers_chart3'
    data: $('#advertisers_chart').data('advertiser')
    xkey: 'date'
    ykeys: ['post_click_activities', 'post_view_activities']
    labels: ['Post Click Activities', 'Post View Activities']