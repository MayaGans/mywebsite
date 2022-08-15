// d.duration to access the duration column
const yAccessor = d => d.duration
const dateParser = d3.timeParse("%Y-%m-%d") 
const xAccessor = d => dateParser(d.date)

let dimensions = {
  // I dont think R2D3 liked detectecting the browser width
  // so I changed to a static number
width: 600, height: 400,
margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
}, }

dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
    
dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

// const wrapper = d3.select("#wrapper") 
// .append("svg")
// we don't need to select a div to put the 
const wrapper = svg
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("background", "#fadadd")
      
const bounds = wrapper.append("g") .
        style("transform", `translate(${
          dimensions.margin.left
          }px, ${ dimensions.margin.top
          }px)`)

const yScale = d3.scaleLinear() 
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])

// const freezingTemperaturePlacement = yScale(32) 
// changing the name of this to meanSongPlacement
// and placing the line at the mean duration
const meanSongPlacement = yScale(d3.mean(data, yAccessor))

/*
const freezingTemperatures = bounds.append("rect") 
      .attr("x", 0)
      .attr("width", dimensions.boundedWidth)
      .attr("y", freezingTemperaturePlacement)
      .attr("height", dimensions.boundedHeight
        - freezingTemperaturePlacement)
      .attr("fill", "#e0f3f3")
*/

//
meanSong = bounds.append("rect")
      .attr("x", 0)
      .attr("width", dimensions.boundedWidth)
      // we want the line to start 10 above the mean
      .attr("y", meanSongPlacement + 10)
       // placeholder and end 10 below
      .attr("height", 20)
      .attr("fill", "#e0f3f3")

const xScale = d3.scaleTime() 
    .domain(d3.extent(data, xAccessor)) 
    .range([0, dimensions.boundedWidth])
    
const lineGenerator = d3.line() 
    .x(d => xScale(xAccessor(d))) 
    .y(d => yScale(yAccessor(d)))
    
const line = bounds.append("path") 
     // change dataset to data
    .attr("d", lineGenerator(data)) 
    .attr("fill", "none") 
    .attr("stroke", "#af9358") 
    .attr("stroke-width", 2)

const yAxisGenerator = d3.axisLeft().scale(yScale)
const yAxis = bounds.append("g").call(yAxisGenerator)

const xAxisGenerator = d3.axisBottom().scale(xScale)

const xAxis = bounds.append("g") 
      .call(xAxisGenerator)
      //.style("transform", `translateY(${ dimensions.boundedHeight} px)`)
      // this is .style in the book
      // but it looks like R2D3 doesn't allow for CSS transforms
      .attr("transform", `translate(0, ${dimensions.boundedHeight})`)