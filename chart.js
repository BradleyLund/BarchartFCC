fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(data=> {
  
  var dataset = []
  
  data.data.forEach(val=>dataset.push(val))
  
  const width = 900
  const height = 500
  const padding = 50
  const barWidth = 800/dataset.length
  
  var tooltip = d3.select('body').append('div')
      .attr("id", "tooltip")
      .style("opacity",0)

      var yAxisScale = d3.scaleLinear()
    .domain([0, d3.max(dataset,d=>d[1])])
    .range([height-padding,padding]);
  
    var xAxisScale = d3.scaleTime()
    .domain([new Date(dataset[0][0]), new Date(dataset[dataset.length-1][0])])
    .range([padding,width-padding])
 
    const svg = d3.select("body")
    .append("svg")
    .attr("width",width)
    .attr("height",height);

    svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr("x",(d,i)=>xAxisScale(new Date(d[0])))
    .attr("y",d=>yAxisScale(d[1]))
    .attr("width",barWidth)
    .attr("height",d=>450-yAxisScale(d[1]))
    .attr("class","bar")
    .attr("data-date",d=>d[0])
    .attr("data-gdp",d=>d[1])
    .on('mouseover',function(d,i) {
      tooltip.transition()
        .style('opacity',1)
        .attr("data-date",d[0])
      tooltip.html(d[0])
    })
    .on('mouseout',function(d,i) {
      tooltip.transition()
        .style('opacity',0)
    })




  var yAxis = d3.axisLeft(yAxisScale)

  
  var yAxisGroup = svg.append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
    .attr('transform', 'translate('+padding+', 0)');
  




  
  var xAxis = d3.axisBottom(xAxisScale)

  
  var xAxisGroup = svg.append('g')
    .call(xAxis)
    .attr('id','x-axis')
    .attr('transform','translate(0,'+(height-padding)+')')

 

  
  
  
  
  
  
  
  
})