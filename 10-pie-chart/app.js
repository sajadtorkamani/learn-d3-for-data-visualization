async function draw() {
  // Data
  const dataset = await d3.csv('data.csv')

  // Dimensions
  let dimensions = {
    width: 600,
    height: 600,
    margins: 10,
  }

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

  const radius = dimensions.ctrWidth / 2

  // Draw Image
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  const ctr = svg
    .append('g') // <g>
    .attr(
      'transform',
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )

  // Scales
  const populationPie = d3.pie().value((d) => d.value)
  const slices = populationPie(dataset)

  const arc = d3.arc().outerRadius(radius).innerRadius(0)

  const colors = d3.quantize((t) => d3.interpolateSpectral(t), dataset.length)
  const colorScale = d3
    .scaleOrdinal()
    .domain(dataset.map((element) => element.name))
    .range(colors)

  // Draw shape
  const arcGroup = ctr
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.ctrHeight / 2}, ${dimensions.ctrWidth / 2})`
    )

  arcGroup
    .selectAll('path')
    .data(slices)
    .join('path')
    .attr('d', arc)
    .attr('fill', (d) => colorScale(d.data.name))

  const labelsGroup = ctr
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.ctrHeight / 2}, ${dimensions.ctrWidth / 2})`
    )
    .classed('labels', true)

  labelsGroup
    .selectAll('text')
    .data(slices)
    .join('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .call((text) =>
      text
        .append('tspan')
        .style('font-weight', 'bold')
        .text((d) => d.data.name)
    )
    .call((text) => text.append('tspan').text((d) => d.data.value))
}

draw()
