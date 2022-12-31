async function draw() {
  // Data
  const dataset = await d3.json('data.json')

  const sizeAccessor = (d) => d.size
  const nameAccessor = (d) => d.name

  // Dimensions
  let dimensions = {
    width: 200,
    height: 500,
    margin: 50,
  }

  // Draw Image
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)
}

draw()
