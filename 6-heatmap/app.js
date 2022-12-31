async function draw(el) {
  // Data
  const dataset = await d3.json('data.json')

  // Dimensions
  let dimensions = {
    width: 600,
    height: 150,
  }

  // Draw Image
  const svg = d3
    .select(el)
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)
}

draw('#heatmap1')
