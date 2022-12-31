const data = [10, 20, 30, 40, 50]

// Update selection
const el = d3
  .select('ul')
  .selectAll('li')
  .data(data)
  .text((d) => d)

// Enter selection
el.enter()
  .append('li')
  .text((d) => d)

// Exit selection
el.exit().remove()

console.log(el)
