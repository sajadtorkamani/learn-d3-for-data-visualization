function draw() {
  // Data
  const data = [
    { child: 'John', parent: '' },
    { child: 'Aaron', parent: 'Kevin' },
    { child: 'Kevin', parent: 'John' },
    { child: 'Hannah', parent: 'Ann' },
    { child: 'Rose', parent: 'Sarah' },
    { child: 'Ann', parent: 'John' },
    { child: 'Sarah', parent: 'Kevin' },
    { child: 'Mark', parent: 'Ann' },
    { child: 'Angel', parent: 'Sarah' },
    { child: 'Tom', parent: 'Hannah' },
  ]

  // Dimensions
  const dimensions = {
    width: 900,
    height: 600,
    margins: 50,
    rectangleWidth: 80,
    rectangleHeight: 40,
  }

  // Draw SVG image
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  // Draw container image
  const container = svg
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )

  // Convert tabular data to hierarchical data
  const dataStructure = d3
    .stratify()
    .id((datum) => datum.child) // Determine unique identifier
    .parentId((datum) => datum.parent)(data) // Determine parent

  // Create tree structure
  // ----------------------
  // This is a key step. D3 will use the size attributes we pass (500, 300) it
  // to generate scaled x and y coordinates for each tree node. We can then use
  // those coordinates to plot each node on the chart.
  const treeStructure = d3.tree().size([650, 300])
  const information = treeStructure(dataStructure)

  // Draw connections
  const connections = container
    .append('g')
    .style('fill', 'none')
    .style('stroke', 'silver')
    .style('stroke-width', 2)
    .selectAll('path')
    .data(information.links()) // Bind link data to the path elements

  // View the SVG paths in the DevTools elements tab to understand how the
  // lines connect.
  connections
    .enter()
    .append('path')
    // Draw connection between current node and child nodes
    .attr('d', (d) => {
      const sourceX = d.source.x
      const sourceY = d.source.y
      const targetX = d.target.x
      const targetY = d.target.y
      const controlPointY = (sourceY + targetY) / 2

      // Set starting point to current node's coordinates
      const startPoint = `${sourceX},${sourceY}`

      return `M${startPoint} v 50 H${targetX} V${targetY}`
    })

  // Draw rectangles
  const rectangles = container
    .append('g')
    .style('fill', 'white')
    .style('stroke', 'silver')
    .style('stroke-width', 2)
    .selectAll('rect')
    .data(information.descendants()) // Join the dataset to the circle elements

  rectangles
    .enter()
    .append('rect')
    // Set X coordinate. Subtract 40 (half of the rectangle width) to
    // horizontally align the rectangle with the point.
    .attr('x', (datum) => datum.x - dimensions.rectangleWidth / 2)

    // Set Y coordinate. Subtract 20 (half of the rectangle height) to
    // vertically align the rectangle with the point.
    .attr('y', (datum) => datum.y - dimensions.rectangleHeight / 2) // Set x coordinate
    .attr('width', dimensions.rectangleWidth)
    .attr('height', dimensions.rectangleHeight)

  // Draw labels
  const names = container
    .append('g')
    .style('dominant-baseline', 'middle')
    .style('text-anchor', 'middle')
    .style('font-size', '20px')
    .selectAll('text')
    // Bind descendant info to text elements
    .data(information.descendants())

  names
    .enter()
    .append('text')
    .text((datum) => datum.data.child) // The `data` property contains the original data
    .attr('x', (datum) => datum.x)
    .attr('y', (datum) => datum.y)
}

draw()

// ## Sources
// ---------
// https://tinyurl.com/3b7783ax
// https://tinyurl.com/mwpefwb6
// [Demystifyingish SVG paths | HTTP 203](https://www.youtube.com/watch?v=9qen5CKjUe8
