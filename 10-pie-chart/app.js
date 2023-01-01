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

  // Draw shape
  const arcGroup = ctr
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.ctrHeight / 2}, ${dimensions.ctrWidth / 2})`
    )

  arcGroup.selectAll('path').data(slices).join('path').attr('d', arc)
}

draw()
