class Map {
    constructor(){
        this.svg = d3.select('#map');
    }

    drawMap(){
        let width = parseInt(this.svg.style('width'));
        let height = parseInt(this.svg.style('height'));
        let projection = d3.geoAlbersUsa()
                        .translate([width/2, height/2])
                        .scale([width]);
        let path = d3.geoPath()
            .projection(projection);

        d3.json('../data/states/California.json', function(json){
            console.log(json);
            d3.select('#map').selectAll('path')
            .data(json.features)
            .enter()
            .append('path')
            .attr('d', path);
            //.on("click", clicked);

var centered;

function    clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

let g = d3.select('#map');
  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

        });
    }



}


