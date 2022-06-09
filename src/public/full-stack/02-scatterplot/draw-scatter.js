async function drawScatter() {
  // your code goes here

  // load dataset
  const dataset = await d3.json('./../my_weather_data.json')

  // accessors
  const xAccessor = d => d.dewPoint
  const yAccessor = d => d.humidity
  const colorAccessor = d => d.cloudCover

  // use same dimensions for chart
  // use width or height, whichever
  // is smaller
  const width = d3.min([
    window.innerWidth * 0.9,
    window.innerHeight * 0.9
  ])

  // wrapper is entire SVG element.
  // bounds lives inside wrapper, 
  // containing just data elements.
  // this allows space for static
  // chart elements (e.g. axes and legends)
  // note margins allow more space in left
  // and bottom areas of chart
  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50
    }
  }

  // define height and width of bounds, 
  // calculated from space remaining after
  // we add margins
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right

  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

  // SVG elements. Set size explicitly
  // due to inconsistent scaling of SVG elements
  // everything we draw will be within the svg
  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  // create bounds and shift them to accomodate
  // top & left margins. The left margin pushes
  // bounds to the right, and the top margin
  // pushes the bounds down
  const bounds = wrapper.append("g")
    .style("transform", `translate(${dimensions.margin.left}px, 
              ${dimensions.margin.top}px)`)

  // create the scales
  // nice() function rounds scale
  // values to friendlier bounds
  const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset, xAccessor))
      .range([0, dimensions.boundedWidth])
      .nice()
      
  const yScale = d3.scaleLinear()
      .domain(d3.extent(dataset, yAccessor))
      .range([dimensions.boundedHeight, 0])
      .nice()

  // color scale for dots
  const colorScale = d3.scaleLinear()
      .domain(d3.extent(dataset, colorAccessor))
      .range(["skyblue", "darkslategrey"])

  // draw chart data
  const dots = bounds.selectAll("circle")
      .data(dataset)
    .enter().append("circle")
      .attr("cx", d => xScale(xAccessor(d)))
      .attr("cy", d => yScale(yAccessor(d)))
      .attr("r", 5)
      .attr("fill", d => colorScale(colorAccessor(d)))
  
  // x axis
  const xAxisGenerator = d3.axisBottom()
      .scale(xScale)

  const xAxis = bounds.append("g")
      .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`)

  // x axis label
  const xAxisLabel = xAxis.append("text")
      .attr("x", dimensions.boundedWidth / 2)
      .attr("y", dimensions.margin.bottom - 10)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .html("Dew point (&deg;F)")

  // y axis
  const yAxisGenerator = d3.axisLeft()
      .scale(yScale)
      .ticks(4)

  const yAxis = bounds.append("g")
      .call(yAxisGenerator)

  // y axis label
  const yAxisLabel = yAxis.append("text")
      .attr("x", -dimensions.boundedHeight / 2)
      .attr("y", -dimensions.margin.left + 10)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .text("Relative Humidity")
      .style("transform", "rotate(-90deg)")
      .style("text-anchor", "middle")

  
}
drawScatter()