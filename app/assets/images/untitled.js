////// SEPARATE y axis
var margin = {top: 30, right: 40, bottom: 30, left: 50}, // Increase the right margin to fit
  width = 600 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale().range([0, width]);
var y0 = d3.scale.linear().range([height, 0]);  // Change to y0
var y1 = d3.scale.linear().range([height, 0]);  // add in y1

var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(7);

var yAxisLeft = d3.svg.axis().scale(y0)     // Change to yAxisLeft and y0
  .orient("left").ticks(7);

var yAxisRight = d3.svg.axis().scale(y1)    // Add yAxisRight as y1
  .orient("right").ticks(7);          // and the appropriate orientation 

var valueline = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y0(d.cpm); });  // Change to y0
    
var valueline2 = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y1(d.cpc); });   // Change to y1
  
var svg = d3.select("#advertisers_chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
 // getting a different data file
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.cpm = +d.cpm;
    d.cpc = +d.cpc;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y0.domain([0, d3.max(data, function(d) { return Math.max(d.cpm); })]);  // Change to y0 remove d.cpc
  y1.domain([0, d3.max(data, function(d) { return Math.max(d.cpc); })]);   // add in y1 with only d.cpm

  svg.append("path")          // Add the valueline path.
    .attr("class", "line")
    .attr("d", valueline(data));

  svg.append("path")          // Add the valueline2 path.
    .attr("class", "line")
    .style("stroke", "red")
    .attr("d", valueline2(data));

  svg.append("g")           // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // edit the Y Axis Left
  svg.append("g") 
    .attr("class", "y axis")
    .style("fill", "steelblue")   // make text steelblue
    .call(yAxisLeft);       // Change to yAxisLeft

  svg.append("g")           // Add the Y Axis Right
    .attr("class", "y axis")    // Add the Y Axis Right
    .attr("transform", "translate(" + width + " ,0)") // move to the right
    .style("fill", "red")     // make text red
    .call(yAxisRight);        // Add the Y Axis Right
