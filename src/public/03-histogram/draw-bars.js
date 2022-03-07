async function drawBars() {
  // your code goes here

  // load dataset
  const dataset = await d3.json('./../my_weather_data.json')

  // accessor for single metric
  const metricAccessor = d => d.humidity
  const yAccessor = d => d.length

  // chart width
  // Note: histograms are more effective
  //       when they are wider than they
  //       are tall
  const width = 600
  let dimensions = {
    width: width,
    height: width * 0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50
    }
  }

  // calculate bounds of chart
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right

  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
    .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

  // create xScale
  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, metricAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  // create data bins
  const binsGenerator = d3.bin()
    .domain(xScale.domain())
    .value(metricAccessor)
    .thresholds(12)

  // create the bins
  // x0 key = lower bound of humidity values
  // x1 key = upper bound of humidity values
  const bins = binsGenerator(dataset)

  // create y scale
  // use d3.max() to 
  // determine height of bar
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice()
  
  // draw the data

  // create element to contain bins
  const binsGroup = bounds.append("g")

  // select all "g" elements within binsGroup
  // and use .data() to bind bins to the selection
  // this creates a new <g> element for each
  // bin
  const binGroups = binsGroup.selectAll("g")
    .data(bins)
    .join("g")

  // padding between bars
  const barPadding = 1

  // create the bars (one for each bin)
  const barRects = binGroups.append("rect")
    .attr("x", d => xScale(d.x0) + barPadding / 2)
    .attr("y", d => yScale(yAccessor(d)))
    .attr("width", d => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
    .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
    .attr("fill", "cornflowerblue")

  // add labels to bars
  const barText = binGroups.filter(yAccessor)
    .append("text")
      .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
      .attr("y", d => yScale(yAccessor(d)) - 5)
      .text(yAccessor)
      .style("text-anchor", "middle")
      .attr("fill", "darkgrey")
      .style("font-size", "12px")
      .style("font-family", "sans-serif")

  // calculate the mean
  const mean = d3.mean(dataset, metricAccessor)

  // draw the mean line
  // at the mean humidity level
  // starting 15px above our chart
  // ending at x axis
  const meanLine = bounds.append("line")
    .attr("x1", xScale(mean))
    .attr("x2", xScale(mean))
    .attr("y1", -15)
    .attr("y2", dimensions.boundedHeight)
    .attr("stroke", "maroon")
    .attr("stroke-dasharray", "2px 4px")

  // label for mean
  const meanLabel = bounds.append("text")
    .attr("x", xScale(mean))
    .attr("y", -20)
    .text("mean")
    .attr("fill", "maroon")
    .style("font-size", "12px")
    .style("text-anchor", "middle")

  // x Axis Generator
  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  // x Axis
  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)

  // x Axis Label
  const aAxisLabel = xAxis.append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom)
    .attr("fill", "black")
    .style("fone-size", "1.4em")
    .text("Humidity")

  

  

  

  

}

drawBars()