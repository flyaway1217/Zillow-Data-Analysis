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
    drawlinechart_houseprice({},[],[]);
    drawlinechart({},[]);
    //console.log(data["ListPricePerSqft_1Bedroom"])
    d3.select("body").select("#hometypebutton").on("click",function(){
        let selected_type = [];

        for (let i =0;i < document.getElementsByName("Home_Type").length;i++){
            if(document.getElementsByName("Home_Type")[i].checked){
                selected_type.push(document.getElementsByName("Home_Type")[i].value);
            }

        }


        //console.log(getSelectedValue("Home_Type"))

        drawlinechart_houseprice(data,selected_type,selected_states);


    });

    d3.select("body").select("#prratio").on("click",function(){
        drawlinechart(data,selected_states);

    });

    d3.select("body").select("#fc1").on("click",function(){

        drawlinechart(data,selected_states);

    });
    d3.select("body").select("#fc2").on("click",function(){

        drawlinechart(data,selected_states);

    });
    d3.select("body").select("#fc3").on("click",function(){

        drawlinechart(data,selected_states);

    });
    d3.select("body").select("#fc4").on("click",function(){

        drawlinechart(data,selected_states);

    });


    /*
    d3.select("body").select("#economychoicebutton").on("click",function(){

        let selected = []

        for (let i =0;i < document.getElementsByName("choice").length;i++){
            if(document.getElementsByName("choice")[i].checked){
                selected.push(document.getElementsByName("choice")[i].value)
            }

        }
        //console.log(selected)
        drawlinechart("data/economy/ecodata.csv",selected)

    })
    */
    //drawMap('usa');
});
