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
        d3.json('../data/states/AK.json', function(json){
            console.log(json.features.counties);
            d3.select('#map').selectAll('path')
            .data(json.features.counties)
            .enter()
            .append('path')
            .attr('d', path);
        });
    }
}
