'use strict'

async function draw(el, scale) {
  // Data
  const dataset = await d3.json('data.json')
  dataset.sort((a, b) => a - b)

  const box = 30

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

  // Scales
  let colorScale

  if (scale === 'linear') {
    colorScale = d3
      .scaleLinear()
      .domain(d3.extent(dataset))
      .range(['white', 'red'])
  } else if (scale === 'quantize') {
    colorScale = d3
      .scaleQuantize()
      .domain(d3.extent(dataset))
      .range(['white', 'pink', 'red'])
  } else if (scale === 'quantile') {
    colorScale = d3
      .scaleQuantile()
      .domain(dataset)
      .range(['white', 'pink', 'red'])
  }

  // Rectangles
  svg
    .append('g')
    .attr('transform', 'translate(2, 2)')
    .attr('stroke', 'black')
    .selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('width', box - 3)
    .attr('height', box - 3)
    .attr('x', (d, i) => box * (i % 20))
    .attr('fill', (d) => colorScale(d))
    .attr('y', (d, i) => box * ((i / 20) | 0))
}

draw('#heatmap1', 'linear')
draw('#heatmap2', 'quantize')
draw('#heatmap3', 'quantile')
