async function drawScatter() {
  // your code goes here

  // load dataset
  const dataset = await d3.json('./../my_weather_data.json')

  // accessors
  const xAccessor = d => d.dewPoint
  const yAccessor = d => d.dhumidity

  


  
}
drawScatter()