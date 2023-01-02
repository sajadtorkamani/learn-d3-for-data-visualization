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
    .id(function (datum) {
      // Determine unique identifier
      return datum.child
    })
    .parentId(function (datum) {
      // Determine parent
      return datum.parent
    })(data)

  // Create tree structure
  // ----------------------
  // This is a key step. D3 will use the size attributes we pass (500, 300) it
  // to generate scaled x and y coordinates for each tree node. We can then use
  // those coordinates to plot each node on the chart.
  const treeStructure = d3.tree().size([500, 300])
  const information = treeStructure(dataStructure)

  const circles = container
    .append('g')
    .selectAll('circle')
    .data(information.descendants()) // Join the dataset to the circle elements

  console.log({ descendants: information.descendants(), circles })

  // Create circle elements for each node
  circles
    .enter()
    .append('circle')
    .attr('cx', (datum) => datum.x) // Set x coordinate
    .attr('cy', (datum) => datum.y) // Set x coordinate
    .attr('r', 5) // Set radius
}

draw()
