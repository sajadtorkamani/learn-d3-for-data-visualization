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
  ]

  // Dimensions
  const dimensions = {
    width: 600,
    height: 600,
    margins: 50,
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
  const treeStructure = d3.tree().size([500, 300])
  const information = treeStructure(dataStructure)

  // Draw container
  const circles = container
    .append('g')
    .selectAll('circle')
    .data(information.descendants()) // Join the dataset to the circle elements

  console.log({ descendants: information.descendants(), circles })

  // Draw circle elements for each node
  circles
    .enter()
    .append('circle')
    .attr('cx', (datum) => datum.x) // Set x coordinate
    .attr('cy', (datum) => datum.y) // Set x coordinate
    .attr('r', 5) // Set radius
    .style('fill', 'blue')

  // Draw connections
  const connections = container
    .append('g')
    .selectAll('path')
    .data(information.links()) // Bind link data to the path elements

  connections
    .enter()
    .append('path')
    .attr('d', (d) => {
      // Draw connection between current node and child nodes

      const sourceX = d.source.x
      const sourceY = d.source.y
      const targetX = d.target.x
      const targetY = d.target.y
      const midPoint = (sourceY + targetY) / 2

      // Set starting point to current node's coordinates
      const startPoint = `${sourceX},${sourceY}`

      // Set control points
      const controlPoints = `${sourceX},${midPoint} ${targetX},${midPoint}`

      // Set end points
      const endPoint = `${targetX},${targetY}`

      const path = `M${startPoint} C ${controlPoints} ${endPoint}`

      console.log(path)
      return path
    })
    .style('fill', 'none')
    .style('stroke', 'red')

  // Bezier curvies
  // ------------------------------
  // Practice drawing bezier curves (maybe to draw a smiley face)
  // M: Source/starting point
  // C(n): Control points
  // E: End point
}

draw()
