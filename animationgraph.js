datap = d3.json("daydata.json");

datap.then(function(data)
{
  drawGraph(data,0);
},
function(err)
{
  console.log(err);
})

var drawGraph = function(data,day)
{
  d3.selectAll("button.n")
    .on("click",updateGraph(data,day+1))
    d3.selectAll("button.p")
      .on("click",updateGraph(data,day-1))
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


var colors = d3.scaleOrdinal(d3.schemeSet3);

var barLand = svg.append("g")
                  .classed("bar",true)
                  .attr("transform","translate("+margins.left+","+margins.top+ ")");

var bars = barLand.selectAll("rect")
                        .data(data[0].grades)
                        .enter()
                        .append("rect")
                        .attr("x",function(d,i)
                      {
                        return i*120;
                      })
                       .attr("y",function(d)
                     {
                         return height - d.grade*3;
                     })
                       .attr("width",(width/4)-5)
                       .attr("height",function(d)
                     {
                       return d.grade*5;
                     })
                      .attr("fill",function(d){return colors(d.name);})


}

var updateGraph = function(data,day)
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


var colors = d3.scaleOrdinal(d3.schemeSet3);

var barLand = svg.append("g")
                  .classed("bar",true)
                  .attr("transform","translate("+margins.left+","+margins.top+ ")");

var bars = barLand.selectAll("rect")
                        .data(data[day].grades)
                        .append("rect")
                        .attr("x",function(d,i)
                      {
                        return i*120;
                      })
                       .attr("y",function(d)
                     {
                         return height - d.grade*3;
                     })
                       .attr("width",(width/4)-5)
                       .attr("height",function(d)
                     {
                       return d.grade*5;
                     })
                      .attr("fill",function(d){return colors(d.name);})

}
