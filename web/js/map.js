class Map {
    constructor(){
        this.svg = d3.select('#map');
    }

    drawMap(){
        let projection = d3.geoAlbersUsa();
        let path = d3.geoPath()
            .projection(projection);
    }
}
