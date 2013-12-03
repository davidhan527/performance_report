# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

jQuery ->
  Morris.Line
    element: 'advertisers_chart'
    data: $('#advertisers_chart').data('advertiser')
    xkey: 'date'
    ykeys: ['spend']
    labels: ['Spend']