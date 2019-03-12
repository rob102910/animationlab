datap = d3.json("daydata.json");

datap.then(function(data)
{
  drawGraph();
},
function(err)
{
  console.log(err);
})

var drawGraph = function()
{
  var screen =
  {
    width:500,
    height:500
  };

  var svg = d3.select("svg")
              .attr("width",screen.width)
              .attr("height",screen.height);

var margins =
{
  top: 10,
  bottom: 10,
  left: 10,
  right:10
};
var width = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;

var xScale = d3.scaleLinear()
              .domain([0,100])
              .range(0,width);

var yScale = d3.scaleLinear()
                .domain([0,100])
                .range(height,0);

var colors = d3.scaleOrdinal(d3.schemeSet3);

var barLand = svg.append("g")
                  .classed("bar",true)
                  .attr("transform","translate("+margins.left+","+margins.top+ ")");

var students = barLand.selectAll("g")
                        .data(data)
                        .enter()
                        .append("g")
                        .attr("fill",function(d){return colors(d.name);})

students.selectAll("rect")
        .data(function(d)
      {
        return d.grade;
      });
       .enter()
       .append("rect")
       .attr("x",function(d,i)
     {
       return xScale(i);
     })
      .attr("y",function(d)
    {
        return yScale(d);
    })
      .attr("width",width/4)
      .attr("height",function(d,i)
    {
      return height-d.grade;
    })
}
