
/////////// barchart

var data = $('#advertisers_chart').data('advertiser');

var parseDate = d3.time.format("%d-%b-%Y").parse;

var margin = {top: 30, right: 40, bottom: 100, left: 50},
    width = 780 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(8);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>CTR:</strong> <span style='color:red'>" + d.ctr + "</span>" + "<br><strong>Spend:</strong> <span style='color:red'>" + d.spend + "</span>" + "<br><strong>CPA:</strong> <span style='color:red'>" + d.cpa + "</span>";
  });

var svg = d3.select("#advertisers_chart2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.ctr; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function(d) { return "rotate(-65)"; });

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("ctr");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.ctr); })
      .attr("height", function(d) { return height - y(d.ctr); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

// });

function type(d) {
  d.ctr = +d.ctr;
  return d;
}

///// line chart - separate y axis

var marginLine = {top: 30, right: 40, bottom: 30, left: 50},
    widthLine = 780 - marginLine.left - marginLine.right,
    heightLine = 300 - marginLine.top - marginLine.bottom;

var xLine = d3.time.scale().range([0, widthLine]);
var y0 = d3.scale.linear().range([heightLine, 0]);
var y1 = d3.scale.linear().range([heightLine, 0]);

var xAxisLine = d3.svg.axis().scale(xLine)
  .orient("bottom").ticks(7)
  .tickFormat(d3.time.format('%b %d'));

var yAxisLeft = d3.svg.axis().scale(y0)
  .orient("left").ticks(7);

var yAxisRight = d3.svg.axis().scale(y1)
  .orient("right").ticks(7);

var tipcpm = d3.tip()
.attr('class', 'd3-tip')
.offset([-10, 0])
.html(function(d) {
  return "<strong>CPM:</strong> <span style='color:red'>" + d.cpm + "</span>" + "<br><strong>CPC:</strong> <span style='color:red'>" + d.cpc + "</span>";
});


var valueline = d3.svg.line()
  .x(function(d) { return xLine(d.date); })
  .y(function(d) { return y0(d.cpm); });  // Change to y0
    
var valueline2 = d3.svg.line()
  .x(function(d) { return xLine(d.date); })
  .y(function(d) { return y1(d.cpc); });   // Change to y1
  
var svgLine = d3.select("#advertisers_chart")
  .append("svg")
    .attr("width", widthLine + marginLine.left + marginLine.right)
    .attr("height", heightLine + marginLine.top + marginLine.bottom)
  .append("g")
    .attr("transform", "translate(" + marginLine.left + "," + marginLine.top + ")");

svg.call(tipcpm);

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.cpm = +d.cpm;
    d.cpc = +d.cpc;
  });

  
  xLine.domain(d3.extent(data, function(d) { return d.date; }));
  y0.domain([0, d3.max(data, function(d) { return Math.max(d.cpm); })]);
  y1.domain([0, d3.max(data, function(d) { return Math.max(d.cpc); })]);

  svgLine.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));

  svgLine.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", function(d) { return xLine(d.date); })
    .attr("cy", function(d) { return y0(d.cpm); })
    .on('mouseover', tipcpm.show)
    .on('mouseout', tipcpm.hide);

  svgLine.append("path")
    .attr("class", "line")
    .style("stroke", "red")
    .attr("d", valueline2(data));
  
  svgLine.selectAll("dot")
        .data(data)
    .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return xLine(d.date); })
        .attr("cy", function(d) { return y1(d.cpc); })
        .on('mouseover', tipcpm.show)
        .on('mouseout', tipcpm.hide);

  svgLine.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + heightLine + ")")
    .call(xAxisLine);

  svgLine.append("g")
    .attr("class", "y axis")
    .style("fill", "steelblue")
    .call(yAxisLeft)
  .append("text")
    .attr("y", 6)
    .attr("dy", "-1.1em")
    .style("text-anchor", "end")
    .text("CPM");

  svgLine.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + widthLine + " ,0)")
    .style("fill", "red")
    .call(yAxisRight)
  .append("text")
    .attr("y", 6)
    .attr("dy", "-1.1em")
    .style("text-anchor", "top")
    .text("CPC");

