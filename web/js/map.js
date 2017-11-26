let path;
let svg = d3.select('#map');
let width = parseInt(svg.style('width'));
let height = parseInt(svg.style('height'));
let projection = d3.geoAlbersUsa()
            .translate([width/2, height/2])
            .scale([width]);
path = d3.geoPath()
.projection(projection);

d3.json('../data/map.json', function(json){
    drawMap('usa');
    function  drawMap(state){
        if (typeof(state) === 'string'){

            d3.selectAll('#state_map path').remove();
            d3.select('#whole_map').selectAll('path')
            .data(json[state].features)
            .enter()
            .append('path')
            .attr('d', path)
            .on("click", drawMap);
            d3.select('#map').transition().duration(1000).attr('viewBox', [0, 0, width, height]);
        }
        else if(typeof(state) === 'object'){
            let x0, y0, x1, y1;
            let bounds = path.bounds(state);
            x0 = bounds[0][0];
            y0 = bounds[0][1];
            x1 = bounds[1][0];
            y1 = bounds[1][1];
            let viewBox = x0 + ' ' + y0 + ' ' + (x1-x0) + ' ' +(y1-y0);
            let svg = d3.select('#map');
            svg.transition().duration(1500).attr('viewBox', viewBox);

            console.log(state.properties.NAME);
            let maps = d3.select('#state_map').selectAll('path')
                    .data(json[state.properties.NAME].features);
            maps = maps.enter().append('path').merge(maps);
            maps.attr('d', path);
            d3.select('body').on('keydown', function(d){
                if (d3.event.keyCode == 27){
                    drawMap('usa');
                    }
                });
        }
    }
});


