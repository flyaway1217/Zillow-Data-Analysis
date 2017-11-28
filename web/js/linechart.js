function getSelectedValue(name){
    var select = document.getElementByName(name);
    var str = [];
    for(i=0;i<select.length;i++){
        if(select.options[i].selected){
            str.push(select[i].value);
        }
    }
    return str;
}

function drawlinechart_houseprice(data,choices,cities){

    //console.log(cities);
    cities = [["Philadelphia","PA"],["Maricopa","AZ"],["Salt Lake","UT"]];

    //cities = [["Salt Lake","UT"]];

    d3.select("#price").selectAll("path").remove();
    d3.select("#price").selectAll("line").remove();
    d3.select("#price").selectAll("text").remove();
    d3.select("#price").select("#price_x").remove();
    d3.select("#price").select("#price_y").remove();

    var svg = d3.select("#price_chart")

    let svgwidth = parseInt(svg.style('width'));
    let svgheight = parseInt(svg.style('height'));
    var margin = {top: 20, right: 170, bottom: 30, left: 50};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;
    let x1 = new Date("2010-01");
    let x2 = new Date("2017-09");
    let x_range = [x1,x2]

/*

    var svg = d3.select("#price").append("svg")
        .attr("width",960)
        .attr("height",500)
        .append("g")
        .attr("transform","translate(" + margin.left + ", 0)");
*/
    var x = d3.scaleTime().range([0, width]);
    var y_axis = d3.scaleLinear().range([height-20, 0]);
    var y = d3.scaleLinear().range([0,height-20]);
    x.domain(x_range)
/*
    if (data == []){
        x.domain("[Thu Dec 31 2009 17:00:00 GMT-0700 (Mountain Standard Time), Mon Jul 31 2017 18:00:00 GMT-0600 (Mountain Daylight Time)]")
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        return
    }
    */
    let choice_length = choices.length;
    let city_length = cities.length;
    for(let i = 0;i<choice_length;i++){
        //console.log(data[choices[i]])
    }
    if (city_length == 0){


        let max_ave = 0;
        let national_ave = {};
        for(let i = 0;i<choice_length;i++){
            national_ave[choices[i]]={};
            //console.log(data[choices[i]][0])
            let cur_choice_len = data[choices[i]].length;

            for (let j = 0;j<cur_choice_len;j++){
                for(let key in data[choices[i]][j]){
                    if (!data[choices[i]][j].hasOwnProperty(key)) continue;
                    if ((key!="CountyName")&&(key!="Metro")&&(key!="RegionName")&&(key!="SizeRank")&&(key!="State")){
                        if (!(key in national_ave[choices[i]])){

                            var obj = Number(data[choices[i]][j][key]);
                            if (obj>0){
                                national_ave[choices[i]][key]={};
                                national_ave[choices[i]][key].sum=0;
                                national_ave[choices[i]][key].count=0;
                                national_ave[choices[i]][key].sum=national_ave[choices[i]][key].sum+obj;
                                national_ave[choices[i]][key].count=national_ave[choices[i]][key].count+1;
                            }
                        }
                        else{
                            let obj = Number(data[choices[i]][j][key]);
                            if (obj>0){
                                national_ave[choices[i]][key].sum=national_ave[choices[i]][key].sum+obj;
                                national_ave[choices[i]][key].count=national_ave[choices[i]][key].count+1;
                            }
                        }
                    }
                }
            }

            for (let key in national_ave[choices[i]]){
                if (!national_ave[choices[i]].hasOwnProperty(key)) continue;
                national_ave[choices[i]][key].ave=national_ave[choices[i]][key].sum/national_ave[choices[i]][key].count;
                if (national_ave[choices[i]][key].ave > max_ave){
                    max_ave = national_ave[choices[i]][key].ave;
                }
                //console.log(key)
                //console.log(national_ave[choices[i]][key]["ave"])
            }
        }

        let colors = {
            "ListPrice_1Bedroom":"red",
            "ListPrice_2Bedroom":"orange",
            "ListPrice_3Bedroom":"yellow",
            "ListPrice_4Bedroom":"green",
            "ListPrice_5BedroomOrMore":"cyan",
            "ListPrice_CondoCoop":"blue",
            "ListPrice_DuplexTriplex":"purple",
            "ListPrice_Sfr":"pink",
            "ListPrice_AllHomes":"gray"

        };
        //console.log(colors["ListPrice_AllHomes"])

        //let colors = ["red","orange","yellow","green","cyan","blue","pink","purple","gray"]


        if (choice_length>8){
            alert("Too Many House Types Are Picked. Please Pick Less Than 9 Types");
        }
        else{

            y.domain([0, max_ave+50000]);
            y_axis.domain([0, max_ave+50000]);
            //x.domain()
            var LineFunction = d3.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.price); });
            let data_list = [];

            let size = 0, key;
            for (key in data) {
                if (data.hasOwnProperty(key)) size++;
            }



            if ((size>0)&&(cities.length==0)){

                //console.log("hahaha")
                //console.log(data)
                //console.log(size)

                svg.append("g").append("text")
                    .text("National Average List Price")
                    .attr("y", 55)
                    .attr("x",200)
                    .attr("dy", "0.71em")
                    .attr("fill", "black");

            }



            let x_domain = [];

            let legendcount = 0;



            for (let i = 0;i<choice_length;i++){

                let ave_data = [];
                for (let key in national_ave[choices[i]]){
                    if (!national_ave[choices[i]].hasOwnProperty(key)) continue;
                    temp = {};
                    temp.date=new Date(key);
                    temp.price=national_ave[choices[i]][key].ave;
                    ave_data.push(temp);
                    //console.log(temp)
                }

                ave_data.sort(function(a, b){
                    return a.date-b.date; //sort by date ascending
                });
                data_list.push(ave_data);
                if (x_domain.length == 0){
                    x_domain = d3.extent(ave_data, function(d) { return d.date; });
                }
                else{
                    let temp = d3.extent(ave_data, function(d) { return d.date; });
                    if (x_domain[0]>temp[0]){
                        x_domain = temp;
                    }
                }
                x.domain(x_domain);
                x.domain(x_range);
                //x.domain("[Thu Dec 31 2009 17:00:00 GMT-0700 (Mountain Standard Time), Mon Jul 31 2017 18:00:00 GMT-0600 (Mountain Daylight Time)]")
                //console.log(x_domain)
                //console.log(d3.extent(ave_data, function(d) { return d.date; }))
                var priceplot = svg.append("g").append("path")
                    .attr("transform", "translate(35," + height + ")"+" scale(1,-1)")
                    .data([ave_data])
                    .attr("d", LineFunction)
                    .style("stroke",colors[choices[i]])
                    .style("stroke-width",3)
                    .style("fill","none");
                svg.append("g").append("line")
                    .attr("x1",svgwidth-180)
                    .attr("y1",20*legendcount + 25)
                    .attr("x2",svgwidth-160)
                    .attr("y2",20*legendcount + 25)
                    .style("stroke",colors[choices[i]])
                    .style("stroke-width",3)

                svg.append("g").append("text")
                    .attr("id",choices[i])
                    .attr("x",svgwidth-150)
                    .attr("y",20*legendcount+30)
                    .attr("fill", colors[choices[i]])
                    .style("font-weight","normal")
                    .text(choices[i].substr(10))

                legendcount = legendcount+1

                priceplot
                    .on("mouseover", function(d){
                        svg.select("#"+choices[i])
                            .style("font-weight",900)
                        /*
                        svg.append("g")
                            .attr("id",choices[i])
                            .append("text")
                            //.attr("transform", "rotate(-90)")
                            .attr("y", 5)
                            .attr("x",10)
                            .attr("dy", "0.71em")
                            .attr("fill", colors[choices[i]])
                            .text(choices[i]);
                            */
                    })
                    .on("mouseout", function(){svg.select("#"+choices[i])
                        .style("font-weight","normal");});


                //console.log(d3.extent(ave_data, function(d) { return d.date; }))
            }

            // Add the X Axis
            svg.append("g")
                .attr("id","price_x")
                .attr("transform", "translate(35," + height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .attr("id","price_y")
                .attr("transform","translate(35,20)","scale(1,-1)")
                .call(d3.axisLeft(y_axis));
            svg.append("g")
                .attr("id","y_unit")
                .append("text")
                .attr("y",15)
                .attr("x",40)
                .attr("dy", "0.71em")
                .text("($)")

        }
    }
    else if (city_length*choice_length>8){
        alert("Too many lines are requested. Please only choose less than 9 lines to display");
    }
    else if (city_length>4){
        alert("Too many cities are requested. Please only choose less than 5 cities to display");
    }
    else{

        //let colors = ["red","orange","yellow","green","cyan","blue","pink","purple"]
        let colors = {
            "ListPrice_1Bedroom":"red",
            "ListPrice_2Bedroom":"orange",
            "ListPrice_3Bedroom":"yellow",
            "ListPrice_4Bedroom":"green",
            "ListPrice_5BedroomOrMore":"cyan",
            "ListPrice_CondoCoop":"blue",
            "ListPrice_DuplexTriplex":"purple",
            "ListPrice_Sfr":"pink",
            "ListPrice_AllHomes":"gray"

        };
        let linetype = ["5,5","10,10","20,10,5,5,5,10","5,0"];
        let max_price = 0;
        let all_data = [];
        let date_extent = [];
        let legendcount = 0;
        for(let i = 0;i<choice_length;i++){
            let this_choice = {};
            this_choice.choice=choices[i];
            let city_data = [];




            let cur_choice_len = data[choices[i]].length;
            for (let j=0;j<city_length;j++){
                let county_name = cities[j][0];
                let state_name = cities[j][1];
                let cur_choice_data = {};
                cur_choice_data.county=county_name;
                cur_choice_data.state=state_name;
                cur_choice_data.data=[];
                //console.log(county_name)
                //console.log(state_name)
                //console.log(data[choices[i]][j])
                for (let k=0;k<cur_choice_len;k++){
                    //console.log(data[choices[i]][k]["CountyName"])
                    //console.log(data[choices[i]][k]["State"])

                    if ((data[choices[i]][k].CountyName==county_name)&&(data[choices[i]][k].State==state_name)){
                        for (let key in data[choices[i]][k]){
                            if (!data[choices[i]][k].hasOwnProperty(key)) continue;
                            if ((key!="CountyName")&&(key!="Metro")&&(key!="RegionName")&&(key!="SizeRank")&&(key!="State")){

                                let temp = {};
                                temp.date=new Date(key);
                                temp.price=Number(data[choices[i]][k][key]);
                                cur_choice_data.data.push(temp);
                                if (max_price<Number(data[choices[i]][k][key])){
                                    max_price = Number(data[choices[i]][k][key]);
                                }
                            }
                        }
                        cur_choice_data.data.sort(function(a, b){
                            return a.date-b.date; //sort by date ascending
                        });

                        if (date_extent.length==0){
                            date_extent = d3.extent(cur_choice_data.data, function(d) { return d.date; });
                        }
                        else{
                            let temp = d3.extent(cur_choice_data.data, function(d) { return d.date; });
                            if (date_extent[0]>temp[0]){
                                date_extent = temp;
                            }
                        }

                        //console.log(cur_choice_data)

                        city_data.push(cur_choice_data);

                        break;

                    }
                }
            }
            //I should have all of the data for this choice now, which is stored in city_data
            this_choice.data=city_data;
            //console.log(city_data)
            all_data.push(this_choice);
        }
        //I should have all the data I needed now, which is all_data

        //console.log(all_data)

        y.domain([0, max_price+50000]);
        y_axis.domain([0, max_price+50000]);
        //x.domain()
        let LineFunction = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.price); });

        let data_list = [];
/*
        svg.append("g").append("text")
            .text("National Average List Price")
            .attr("y", 100)
            .attr("x",width/2)
            .attr("dy", "0.71em")
            .attr("fill", "black")
            */


        x.domain(date_extent);
        x.domain(x_range)
        //x.domain("[Thu Dec 31 2009 17:00:00 GMT-0700 (Mountain Standard Time), Mon Jul 31 2017 18:00:00 GMT-0600 (Mountain Daylight Time)]")
        //console.log(date_extent)



        for (let i = 0;i<all_data.length;i++){
            let this_color = colors[all_data[i].choice];
            //console.log(this_color)
            for (let j = 0;j<all_data[i].data.length;j++){
                //console.log(all_data[i]["data"][j]["data"])
                zero_range = 0;
                //let k = 0
                while(all_data[i].data[j].data[0].price==0){
                    all_data[i].data[j].data.shift();

                }
                //console.log(all_data[i].data[j].data);

                let this_line = linetype[j];
                let priceplot = svg.append("g").append("path")
                    .attr("transform", "translate(35," + height + ")"+" scale(1,-1)")
                    .data([all_data[i].data[j].data])
                    .attr("d", LineFunction)
                    .style("stroke",this_color)
                    .style("stroke-width",3)
                    .style("stroke-dasharray",this_line)
                    .style("fill","none");

                let cur_text_id = all_data[i].choice+all_data[i].data[j].county.substr(0,2)+legendcount

                console.log(cur_text_id)

                svg.append("g").append("line")
                    .attr("x1",svgwidth-180)
                    .attr("y1",50*legendcount + 25)
                    .attr("x2",svgwidth-60)
                    .attr("y2",50*legendcount + 25)
                    .style("stroke",this_color)
                    .style("stroke-dasharray",this_line)
                    .style("stroke-width",3)

                svg.append("g").append("text")
                    .attr("id",cur_text_id)
                    .attr("x",svgwidth-180)
                    .attr("y",50*legendcount+45)
                    .attr("fill", this_color)
                    .style("font-weight","normal")
                    .text(all_data[i].data[j].county+" "+all_data[i].choice.substr(10))

                legendcount = legendcount+1




                priceplot
                    .on("mouseover", function(d){
                        svg.select("#"+cur_text_id)
                            .style("font-weight",900)
                        /*
                        svg.append("g")
                            //.attr("id",all_data[i].choice+all_data[i].data[j].county)
                            .attr("id","choicepluscounty")
                            .append("text")
                            //.attr("transform", "rotate(-90)")
                            .attr("y", 45)
                            .attr("x",200)
                            .attr("dy", "0.71em")
                            .attr("fill", this_color)
                            .text(all_data[i].choice+" "+all_data[i].data[j].county);
                            */
                    })
                    .on("mouseout", function(){svg.select("#"+cur_text_id)
                        .style("font-weight","normal");});


            }


            //console.log(d3.extent(ave_data, function(d) { return d.date; }))
        }

        // Add the X Axis
        svg.append("g")
            .attr("id","price_x")
            .attr("transform", "translate(35," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .attr("id","price_y")
            .attr("transform","translate(35,20)","scale(1,-1)")
            .call(d3.axisLeft(y_axis));



        //code to display the line chart for all choices of all selected cities





    }

}

function drawlinechart(){
    let csvfile = "data/economy/ecodata.csv";

    if (document.getElementsByName("history")[0].checked){
        //console.log("history")
        csvfile = "data/economy/ecodata_history.csv"
    }

    let choices = [];

    for (let i =0;i < document.getElementsByName("choice").length;i++){
        if(document.getElementsByName("choice")[i].checked){
            choices.push(document.getElementsByName("choice")[i].value);
        }

    }
    //choices = selected

    d3.select("#financial").select("#xaxis").remove()
    d3.select("#financial").selectAll("path").remove();

    /*
    var svg = d3.select("#financial").append("svg")
            .attr("width",960)
            .attr("height",500);
            */

    var svg = d3.select("#financial_chart")

    let svgwidth = parseInt(svg.style('width'));
    let svgheight = parseInt(svg.style('height'));

    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    /*

    var svg = d3.select("#financial").append("svg")
        .attr("width",960)
        .attr("height",500)
        .append("g")
        .attr("transform","translate(" + margin.left + ", 0)");
    */
    var parseTime = d3.timeFormat("%m/%d/%Y");
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var stockscale = d3.scaleLinear().range([0, height-20]);
    var unemploymentscale = d3.scaleLinear().range([0, height-20]);
    var mortgagescale = d3.scaleLinear().range([0, height-20]);
    var stockscale_axis = d3.scaleLinear().range([height-20, 0]);
    var unemploymentscale_axis = d3.scaleLinear().range([height-20,0]);
    var mortgagescale_axis = d3.scaleLinear().range([height-20,0]);

    var StockFunction = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return stockscale(d.stock); });
    var MortgageFunction = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return mortgagescale(d.mortgage); });
    var UnemploymentFunction = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return unemploymentscale(d.unemployment); });

    d3.csv(csvfile, function(error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function(d) {

            let temp = new Date(d.date);
            //console.log(temp)

            d.date = temp;
            d.index = +d.index;
        });

        // Scale the range of the data
        /*
                var lineData = [
                    { "x": 1,   "y": 5},
                    { "x": 20,  "y": 20},
                    { "x": 40,  "y": 10},
                    { "x": 60,  "y": 40},
                    { "x": 80,  "y": 5},
                    { "x": 100, "y": 60}
                ];
                */
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.stock; })]);
        var stockmax = d3.max(data, function(d) { return d.stock; });
        //console.log(stockmax);
        stockscale_axis.domain([0, 22500]);
        stockscale.domain([0, 22500]);
        unemploymentscale_axis.domain([0, d3.max(data, function(d) { return d.unemployment; })]);
        unemploymentscale.domain([0, d3.max(data, function(d) { return d.unemployment; })]);
        mortgagescale_axis.domain([0, d3.max(data, function(d) { return d.mortgage; })]);
        mortgagescale.domain([0, d3.max(data, function(d) { return d.mortgage; })]);

        // Add the valueline path.

        //console.log(data)

        choice_length = choices.length;
        for(let i = 0;i<choice_length;i++){
            if (choices[i]== "stock"){
                var stockplot = svg.append("g").append("path")
                    .attr("transform", "translate(25," + height + ")"+" scale(1,-1)")
                    .data([data])
                    .attr("d", StockFunction)
                    .style("stroke","red")
                    .style("stroke-width",2)
                    .style("fill","none");

                stockplot
                    .on("mouseover", function(d){
                        svg.append("g")
                            .attr("id","stock_yaxis")
                            .attr("transform","translate(25,20)","scale(1,-1)")
                            .call(d3.axisLeft(stockscale_axis));
                        svg.append("g")
                            .attr("id","stock_text")
                            .append("text")
                            //.attr("transform", "rotate(-90)")
                            .attr("y", 35)
                            .attr("x",200)
                            .attr("dy", "0.71em")
                            .attr("fill", "red")
                            .text("Stock Index");
                    })
                    .on("mouseout", function(){svg.select("#stock_yaxis").remove();
                        svg.select("#stock_text").remove();});

            }
            else if (choices[i]== "mortgage"){
                var mortgageplot = svg.append("g").append("path")
                    .attr("transform", "translate(25," + height + ")"+" scale(1,-1)")
                    .data([data])
                    .attr("d", MortgageFunction)
                    .style("stroke","green")
                    .style("stroke-width",3)
                    .style("fill","none");
                mortgageplot
                    .on("mouseover", function(d){
                        svg.append("g")
                            .attr("id","mortgage_yaxis")
                            .attr("transform","translate(25,20)","scale(1,-1)")
                            .call(d3.axisLeft(mortgagescale_axis));
                        svg.append("g")
                            .attr("id","mortgage_text")
                            .append("text")
                            //.attr("transform", "rotate(-90)")
                            .attr("y", 35)
                            .attr("x",200)
                            .attr("dy", "0.71em")
                            .attr("fill", "green")
                            .text("Mortgage Interest Rate");
                    })
                    .on("mouseout", function(){svg.select("#mortgage_yaxis").remove();
                        svg.select("#mortgage_text").remove();});

            }
            else if (choices[i]=="unemployment"){
                var unemploymentplot = svg.append("g").append("path")
                    .attr("transform", "translate(25," + height + ")"+" scale(1,-1)")
                    .data([data])
                    .attr("d", UnemploymentFunction)
                    .style("stroke","blue")
                    .style("stroke-width",3)
                    .style("fill","none");

                unemploymentplot
                    .on("mouseover", function(d){
                        svg.append("g")
                            .attr("id","unemployment_yaxis")
                            .attr("transform","translate(25,20)","scale(1,-1)")
                            .call(d3.axisLeft(unemploymentscale_axis));
                        svg.append("g")
                            .attr("id","unemployment_text")
                            .append("text")
                            //.attr("transform", "rotate(-90)")
                            .attr("y", 35)
                            .attr("x",200)
                            .attr("dy", "0.71em")
                            .attr("fill", "blue")
                            .text("Unemployment Rate");
                    })
                    .on("mouseout", function(){svg.select("#unemployment_yaxis").remove();
                        svg.select("#unemployment_text").remove();});

            }
        }

        // Add the X Axis
        svg.append("g")
            .attr("id","xaxis")
            .attr("transform", "translate(25," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        //svg.append("g")
        //    .attr("transform","translate(0,20)","scale(1,-1)")
        //    .call(d3.axisLeft(stockscale_axis));

    });

}
drawlinechart_houseprice({},[],[])
drawlinechart()


