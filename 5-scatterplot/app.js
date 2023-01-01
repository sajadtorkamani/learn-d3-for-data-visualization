'use strict'

async function draw() {
  // Get data
  const dataset = await d3.json('data.json')

  const xAccessor = (d) => d.currently.humidity
  const yAccessor = (d) => d.currently.apparentTemperature

  // Set dimensions
  let dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    },
  }

  dimensions.containerWidth =
    dimensions.width - dimensions.margin.right - dimensions.margin.left

  dimensions.containerHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // Draw image
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  const container = svg
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    )

  const tooltip = d3.select('#tooltip')

  // Set scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .rangeRound([0, dimensions.containerWidth])
    .clamp(true)

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .rangeRound([dimensions.containerHeight, 0])
    .nice()
    .clamp(true)

  // Draw circles
  container
    .selectAll('circle')
    .data(dataset)
    .join('circle')
    .attr('cx', (d) => xScale(xAccessor(d)))
    .attr('cy', (d) => yScale(yAccessor(d)))
    .attr('r', 5)
    .attr('fill', 'red')
    .attr('data-temp', yAccessor)
    .on('mouseenter', function (event, datum) {
      // Style the active dot
      d3.select(this).attr('fill', '#120078').attr('r', 8)

      // Show tooltip and position it next to the dot
      tooltip
        .style('display', 'block')
        .style('top', yScale(yAccessor(datum)) - 25 + 'px')
        .style('left', xScale(xAccessor(datum)) + 'px')

      const formatter = d3.format('.2f')
      const dateFormatter = d3.timeFormat('%B %-d, %Y')

      // Set tooltip contents
      tooltip.select('.metric-humidity span').text(formatter(xAccessor(datum)))
      tooltip.select('.metric-temp span').text(formatter(yAccessor(datum)))
      tooltip
        .select('.metric-date')
        .text(dateFormatter(datum.currently.time * 1000))
    })
    .on('mouseleave', function (event) {
      // Revert styles of active dot
      d3.select(this).attr('fill', 'red').attr('r', 5)

      // Hide tooltip
      tooltip.style('display', 'none')
    })

  // Draw X axis
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(5)
    .tickFormat((d) => d * 100 + '%')

  const xAxisGroup = container
    .append('g')
    .call(xAxis)
    .style('transform', `translateY(${dimensions.containerHeight}px)`)
    .classed('axis', true)

  xAxisGroup
    .append('text')
    .attr('x', dimensions.containerWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .attr('fill', 'black')
    .text('Humidity')

  // Draw Y axis
  const yAxis = d3.axisLeft(yScale)

  const yAxisGroup = container.append('g').call(yAxis).classed('axis', true)

  yAxisGroup
    .append('text')
    .attr('x', -dimensions.containerHeight / 2)
    .attr('y', -dimensions.margin.left + 15)
    .attr('fill', 'black')
    .html('Temperature &deg; F')
    .style('transform', 'rotate(270deg)')
    .style('text-anchor', 'middle')
}

draw()
