/*
class Data{
    constructor (){
        this.data = new Object({});
        let data = this.data;
        d3.text(dir+'index.csv', function(text){
            let index = d3.csvParse(text);
            index.forEach(function(d){
                let path = dir + d.Name;
                d3.text(path, function(text){
                    let prices = d3.csvParse(text);
                    data[d.Name.replace('.csv', '')] = prices;
                });
            });
        });
    }
}
*/

path = 'data/data.json';
d3.json(path, function(data){
    console.log(data);
});

