let path;
let svg = d3.select('#map');
let width = parseInt(svg.style('width'));
let height = parseInt(svg.style('height'));
let projection = d3.geoAlbersUsa()
            .translate([width/2, height/2])
            .scale([width/2]);
path = d3.geoPath()
.projection(projection);

let selected_states = [];
let STATE;

// Prepare the color scale.
let color = d3.scaleLinear()
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb("#90EE90"),  d3.rgb('#006400')]);

tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.properties.NAME || d.properties.NAME10; });
d3.select('#whole_map').call(tip);


let STATES_MAPPING={
    "State":"Abbreviation",
    "Alabama":"AL",
    "Alaska":"AK",
    "Arizona":"AZ",
    "Arkansas":"AR",
    "California":"CA",
    "Colorado":"CO",
    "Connecticut":"CT",
    "Delaware":"DE",
    "District of Columbia":"DC",
    "Florida":"FL",
    "Georgia":"GA",
    "Hawaii":"HI",
    "Idaho":"ID",
    "Illinois":"IL",
    "Indiana":"IN",
    "Iowa":"IA",
    "Kansas":"KS",
    "Kentucky":"KY",
    "Louisiana":"LA",
    "Maine":"ME",
    "Montana":"MT",
    "Nebraska":"NE",
    "Nevada":"NV",
    "New Hampshire":"NH",
    "New Jersey":"NJ",
    "New Mexico":"NM",
    "New York":"NY",
    "North Carolina":"NC",
    "North Dakota":"ND",
    "Ohio":"OH",
    "Oklahoma":"OK",
    "Oregon":"OR",
    "Maryland":"MD",
    "Massachusetts":"MA",
    "Michigan":"MI",
    "Minnesota":"MN",
    "Mississippi":"MS",
    "Missouri":"MO",
    "Pennsylvania":"PA",
    "Rhode Island":"RI",
    "South Carolina":"SC",
    "South Dakota":"SD",
    "Tennessee":"TN",
    "Texas":"TX",
    "Utah":"UT",
    "Vermont":"VT",
    "Virginia":"VA",
    "Washington":"WA",
    "West Virginia":"WV",
    "Wisconsin":"WI",
    "Wyoming":"WY",
};

d3.json('data/map.json', function(json){
    color.domain([
        d3.min(json.usa.features, function(d){return d.properties.CENSUSAREA;}),
        d3.max(json.usa.features, function(d){return d.properties.CENSUSAREA;})
    ]);
    drawMap('usa');
    function  drawMap(state){
        d3.selectAll('#state_map path').remove();
        if (typeof(state) === 'string'){
            d3.select('#whole_map').selectAll('path')
            .data(json[state].features)
            .enter()
            .append('path')
            .attr('d', path)
            .style('fill', function(d){
                return color(d.properties.CENSUSAREA);
            })
            .attr('stroke', '#fff')
            .attr('stroke-width', 0.5)
            .on("click", drawMap)
            .on('mouseover', function(d){
                d3.select(this).classed('chosen', true);
                tip.show(d);
            })
            .on('mouseout', function(d){
                d3.selectAll('.chosen').classed('chosen', false);
                tip.hide(d);
            });
            d3.select('#map').transition().duration(1000).attr('viewBox', [0, 0, width, height]);
        }
        else if(typeof(state) === 'object'){
            STATE = state.properties.NAME;
            let x0, y0, x1, y1;
            let bounds = path.bounds(state);
            x0 = bounds[0][0];
            y0 = bounds[0][1];
            x1 = bounds[1][0];
            y1 = bounds[1][1];
            let viewBox = x0 + ' ' + y0 + ' ' + (x1-x0) + ' ' +(y1-y0);
            let svg = d3.select('#map');
            svg.transition().duration(1500).attr('viewBox', viewBox);

            let maps = d3.select('#state_map').selectAll('path')
                    .data(json[state.properties.NAME].features);
            maps = maps.enter().append('path').merge(maps);
            maps.attr('d', path)
                .style('fill', function(d){
                    let key = d.properties.NAME10 + ',' + STATES_MAPPING[STATE];
                    if (json.key.indexOf(key) > 0){
                        return 'orange';
                    }
                    else{
                        return '#848484';
                    }
                })
                .attr('stroke', '#FFFFFF')
                .attr('stroke-width', 0.05)
                .on('mouseout', function(d){
                    d3.selectAll('.chosen').classed('chosen', false);
                    tip.hide(d);
                })
                .on('mouseover', function(d){
                    d3.select(this).classed('chosen', true);
                    tip.show(d);
                })
                .on('click', buttonClick);

            d3.select('body').on('keydown', function(d){
                if (d3.event.keyCode == 27){
                    drawMap('usa');
                    }
                });
        }
    }
});

function buttonClick(d){
    if(typeof(d) === 'object'){
        let label = d.properties.NAME10;
        if (selected_states.length < 4){
            selected_states.push([label, STATES_MAPPING[STATE]]);
        }
    } 
    let buttons = d3.select('#button').selectAll('button')
        .data(selected_states);
    buttons.exit().remove();
    buttons = buttons.enter().append('button').merge(buttons);

    buttons.attr('type', 'button')
        .attr('class', 'btn btn-primary')
        .text(function(d){
            return d;
        })
        .on('click', function(d){
            index = selected_states.indexOf(d);
            selected_states.splice(index, 1);
            buttonClick('aaa');
        });
}
