async function getData() {
  const data = await d3.json('data.json')
  console.log(data)
}

getData()
