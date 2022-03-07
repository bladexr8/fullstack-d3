async function drawBars() {
  // your code goes here

  // load dataset
  const dataset = await d3.json('./../my_weather_data.json')

  // accessor for single metric
  const metricAccessor = d => d.humidity

  // chart width
  // Note: histograms are more effective
  //       when they are wider than they
  //       are tall
  

}
drawBars()