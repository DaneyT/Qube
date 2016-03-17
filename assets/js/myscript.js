//*********************************************Index*******************************************************
//---------------------------------------------------------------------------------------------------------
//  myscript.js contents:
//  ---------------------
//  1.Document ready function (draws gauges)
//  2.Global variabels
//  3a.Real time updater function (getdata) -> draws/updates gauges and graphs
//  3b.Database data conversion to gauge format
//  3c.Dust values filter function
//  3d.Emptying values for next round
//  4. Url checker to draw gauges or graphs
//  5. Gauge draw function in this order:   1.Temperture
//                                          2.Gasses
//                                          3.humidity
//                                          4.Dust
//                                          5.Formaldehyde
//  6.Draw graph function
//  7.Resize window function (redraws graph to new fitting size)
//  8.(TODO) New warning system to user -> push message/Jquery (dialog)/ other
//  9.(TODO) Save values function to print/view (avarage per month or year)
//  10.(TODO) History graph (past days,week,month)
//  11.(TODO) Active Qube location display on Google Maps
//---------------------------------------------------------------------------------------------------------
//*********************************************1.Document ready function***********************************
//---------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    console.log("ready!");                  //Document linked check
    drawGauges();                           //Calls the function to draw gauges
});

//---------------------------------------------------------------------------------------------------------
//*********************************************2.Global variabels******************************************
//---------------------------------------------------------------------------------------------------------

var alertGiven = false;                     //Boolean to give a Dialog warning in javascript one per reload of the page
var graphTitle ="";                         //Title of the graph

var dbdata = [];                            //dbdata fills the graph with values (values are determined by the clicked link)
var temperture = [];                        //(RAW) Database temperture array
var temp;                                   //Temperture var formatted for the gauge/graph
var gasses = [];                            //(RAW) Database gasses array
var gas;                                    //Gasses var formatted for the gauge/graph
var humidity = [];                          //(RAW) Database humidity array
var rh;                                     //Humidity var formateed for the gauge/graph
var particulateMatter = [];                 //(RAW) Database dust array
var pm;                                     //Dust var formatted for the gauge/graph
var filterdPMValues = [];                   //Var filled with filterd dust values that can be displayed (field in DB with 0 will be ignored)
var formaldehyde = [];                      //(RAW) Database formaldehyde array
var formal;                                 //Formaldehyde var formatted for the gauge/graph

//---------------------------------------------------------------------------------------------------------
//*********************************************3a.Realtime updater function to fill in gauges and graphs***
//---------------------------------------------------------------------------------------------------------

setInterval(function getdata(){             //Function that gets the latest data from the database with a limit of 10 and orderd DESC -> view getdatabseinfo.php
var url="getdatabaseinfo.php"
temperture.length = 0; // wat is dit??
$("#jsondata tbody").html("");
$.getJSON(url,function(data){
    $.each(data.projectnature, function(i,reading){
        temperture.push(reading.Temp);
        humidity.push(reading.Humidity);
        gasses.push(reading.Gas);
        particulateMatter.push(reading.Stof);
        formaldehyde.push(reading.HCHO);
    });

    //-----------------------------------------------------------------------------------------------------
    //*********************************************3b.Database data conversion to gauge format*************
    //-----------------------------------------------------------------------------------------------------
    temp = Math.floor(temperture[0]);          //Makes the temperture a whole number
    if(temp > 30 && alertGiven == false){      //Function to check if the value crossed the red line and if the alert has been given
        alert("Qube heeft uw aandacht nodig!");//javascipt alert
        alertGiven = true;                     //Boolean setter
    }
    temp = (temp+10)*2;
    if(temp > 100){
        temp = 100;
    }
    gas = Math.floor(gasses[0]);
    if(gas > 10 && alertGiven == false){
        alert("Qube heeft uw aandacht nodig!");
        alertGiven = true;
    }
    gas = gas*4;
    if(gas > 100){
        gas = 100;
    }
    rh =  Math.floor(humidity[0]);
    if(rh > 80 && alertGiven == false){
        alert("Qube heeft uw aandacht nodig!");
        alertGiven = true;
    }
    if(rh > 100){
        rh = 100;
    }
    pm =  Math.floor(particulateMatter[0]);
    if(pm > 4000 && alertGiven == false){
        alert("Qube heeft uw aandacht nodig!");
        alertGiven = true;
    }
    if(pm > 500){
        pm = 500;
    }
    pm = pm / 5;

    //HCHO formule
    formal = Math.floor(formaldehyde[0]);
    if(formal > 2) {
        formal = 2;
    }
    formal = formal *50;


    //-----------------------------------------------------------------------------------------------------
    //*********************************************3c.Dust values filter functions*************************
    //-----------------------------------------------------------------------------------------------------
    var correctPMValues = particulateMatter;

    if(filterdPMValues.length > 0){

        filterdPMValues.length = 0;
        filterdPMValues = correctPMValues.filter(function(value) { return value > 1 });

    }else{
        filterdPMValues.length = 0;
        filterdPMValues = correctPMValues.filter(function(value) { return value > 1 });

    }
    console.log(filterdPMValues);
    console.log(humidity);
    particulateMatter = [];
    //-----------------------------------------------------------------------------------------------------
    //*********************************************3d.URL/PAGE checker*************************************
    //-----------------------------------------------------------------------------------------------------

    if(window.location.href.indexOf("measurement") > -1) {     //Checks if the user is on the gauges page
        drawGauges();                                          //Drawn gauges
    }else if(window.location.href.indexOf("graph")){           //Checks if user is on the graph page
        drawBackgroundColor();                                 //Draws graphs
    }


//-------------------------------OLD SPLIT/url checker--------------------------------------
//    var pathname = $(location).attr('href');
//    var split = pathname.split("/");
//    console.log(split[5]);
//    if(split[5] === "measurement.php")                       //if url = gauges draw gauges else if page is graph draw graph
//    {
//        drawGauges();
//    }else if(split[2].indexOf("graph") > -1){
//        drawBackgroundColor();
//    }
    //-----------------------------------------------------------------------------------------------------
    //*********************************************3e.Emptying vars section for next update****************
    //-----------------------------------------------------------------------------------------------------

    dbdata = [];
    temperture = [];
    temp = '';
    gasses = [];
    gas = '';
    humidity = [];
    rh = '';
    particulateMatter = [];
    pm = '';
    filterdPMValues = [];
    formaldehyde = [];
    formal ='';

});
}, 3000);

//---------------------------------------------------------------------------------------------------------
//*********************************************4.Gauge creator function************************************
//---------------------------------------------------------------------------------------------------------

//***********************************************Temperature gauge*****************************************
function drawGauges(){
    $( ".gauge2" ).remove();                                                //removes Temp gauge DIV to redraw it
    $("<div id='gauge2' class='gauge2 demo2'></div>").appendTo( "#meter1"); //Create new temp gauge DIV

    console.log("Gauge2 emptied");
    $('#gauge2').gauge({                                                    //Draws the gauge function from the jquery-gauge.js file in the DIV
        values: {                                                           //The gauge runs from 0 to 100 (first row)
            0 : '-10',                                                      //The second row are our assigned custom values
            20: '0',
            40: '10',
            60: '20',
            80: '30',
            100: '40'
        },
        colors: {                                                           //Sets the line color from and till a value (value first row, color second row)
            0 : '#666',
            9 : '#378618',
            60: '#ffa500',
            80: '#f00'
        },
        angles: [
            180,
            360
        ],
        lineWidth: 10,                                                      //Thickness of the lines
        arrowWidth: 20,                                                     //Thickness of the arrow
        arrowColor: '#ccc',                                                 //Arrow color
        inset:true,

        value: temp                                                         //Value which will be displayed
    });
    var link1 = $("<a href='graph.php?graph=1' id='linktext'>Link to temperature</a>");     //Var which contains the link to graph page ?graph=1 is temperture,2 is gasses, 3 is humidity etc.
    $('#gauge2').append(link1);                                             //Insert the (var)link after the gauge
    console.log("Gauge created");

//***********************************************Gasses gauge********************************************
    $( ".gauge3" ).remove();
    $("<div id='gauge3' class='gauge3 demo2'></div>").appendTo( "#meter2");
    console.log("Gauge3 emptied");
    $('#gauge3').gauge({
        values: {
            0 : '0',
            20: '5',
            40: '10',
            60: '15',
            80: '20',
            100: '25'
        },
        colors: {
            0 : '#666',
            9 : '#378618',
            60: '#ffa500',
            80: '#f00'
        },
        angles: [
            180,
            360
        ],
        lineWidth: 10,
        arrowWidth: 20,
        arrowColor: '#ccc',
        inset:true,

        value: gas
    });
    var link2 = $("<a href='graph.php?graph=2' id='linktext'>Link to gasses</a>");
    $('#gauge3').append(link2);

//***********************************************Humidity gauge********************************************
    $( ".gauge4" ).remove();
    $("<div id='gauge4' class='gauge4 demo2'></div>").appendTo( "#meter3");
    console.log("Gauge4 emptied");
    $('#gauge4').gauge({
        values: {
            0 : '0',
            20: '20',
            40: '40',
            60: '60',
            80: '80',
            100: '100'
        },
        colors: {
            0 : '#666',
            9 : '#378618',
            60: '#ffa500',
            80: '#f00'
        },
        angles: [
            180,
            360
        ],
        lineWidth: 10,
        arrowWidth: 20,
        arrowColor: '#ccc',
        inset:true,
        value: rh
    });
    var link3 = $("<a href='graph.php?graph=3' id='linktext'>Link to humidity</a>");
    $('#gauge4').append(link3);

//***********************************************Dust gauge********************************************
    $( ".gauge5" ).remove();
    $("<div id='gauge5' class='gauge5 demo2'></div>").appendTo( "#meter4");
    console.log("Gauge5 emptied");
    $('#gauge5').gauge({
        values: {
            0 : '0',
            20: '100',
            40: '200',
            60: '300',
            80: '400',
            100: '500'
        },
        colors: {
            0 : '#666',
            9 : '#378618',
            60: '#ffa500',
            80: '#f00'
        },
        angles: [
            180,
            360
        ],
        lineWidth: 10,
        arrowWidth: 20,
        arrowColor: '#ccc',
        inset:true,

        value: pm
    });
    var link4 = $("<a href='graph.php?graph=4' id='linktext'>Link to particulate matter</a>");
    $('#gauge5').append(link4);

//***********************************************Formaldehyde gauge********************************************
    $( ".gauge6" ).remove();
    $("<div id='gauge6' class='gauge6 demo2'></div>").appendTo( "#meter5");
    console.log("Gauge6 emptied");
    $('#gauge6').gauge({
        values: {
            0 : '0',
            20: '20',
            40: '40',
            60: '60',
            80: '80',
            100: '100'
        },
        colors: {
            0 : '#666',
            9 : '#378618',
            60: '#ffa500',
            80: '#f00'
        },
        angles: [
            180,
            360
        ],
        lineWidth: 10,
        arrowWidth: 20,
        arrowColor: '#ccc',
        inset:true,

        value: formal
    });
    var link5 = $("<a href='graph.php?graph=5' id='linktext' >Link to Formaldehyde</a>");
    $('#gauge6').append(link5);
}



//---------------------------------------------------------------------------------------------------------
//*********************************************5.Draw graph function***************************************
//---------------------------------------------------------------------------------------------------------

google.load('visualization', '1', { packages: ['corechart', 'line'] });     //google functions
google.setOnLoadCallback(drawBackgroundColor);                              //google function applied to the draw graph function?



function drawBackgroundColor() {                                            //draw graph function

    function GetURLParameter(sParam)
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++){
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    }


    var graph = GetURLParameter('graph');
    console.log(graph);

    var data = new google.visualization.DataTable();                       //var data gets the graph elements info

    if(graph == 1)                                                         //if ?graph=1 then draw get data from temperture and draw temp graph
    {
        dbdata = temperture;                                               //dynamicly fills Data with the values from the temperture array
        graphTitle = "Temperature";
        data.addColumn('number', 'Hour');
        data.addColumn('number', 'Temperature level');
        data.addColumn('number', 'Safe');
        data.addColumn('number', 'Dangerous');
        data.addColumn('number', 'Lethal');
        var zeropoint = 0;                                                 //Graph zero point (white/bottom line)
        var hazerdous = 30;                                                //Hazerdous line (yellow line height in the graph)
        var dangerous = 40;                                                //Dangerous line (red line height in the graph
                                                                            //The 3 lines above need to be includes to keep the graph in a certain format

    }
    if(graph == 2)
    {
        dbdata = gasses;
        graphTitle = "Gasses";
        data.addColumn('number', 'Hour');
        data.addColumn('number', 'Gasses level');
        data.addColumn('number', 'Safe');
        data.addColumn('number', 'Dangerous');
        data.addColumn('number', 'Lethal');
        var zeropoint = 0;
        var hazerdous = 10;
        var dangerous = 20;
        document.getElementById('coinfodiv').style.display = "block";
    }
    if(graph == 3)
    {
        dbdata = humidity;
        graphTitle = "Humidity";
        data.addColumn('number', 'Hour');
        data.addColumn('number', 'Humidity level');
        data.addColumn('number', 'Safe');
        data.addColumn('number', 'Dangerous');
        data.addColumn('number', 'Lethal');
        var zeropoint = 0;
        var hazerdous = 70;
        var dangerous = 80;
    }
    if(graph == 4)
    {
        dbdata = filterdPMValues;
        graphTitle = "Particulate Matter"
        data.addColumn('number', 'Hour');
        data.addColumn('number', 'Particulate matter level');
        data.addColumn('number', 'Safe');
        data.addColumn('number', 'Dangerous');
        data.addColumn('number', 'Lethal');
        var zeropoint = 0;
        var hazerdous = 400;
        var dangerous = 500;
        document.getElementById('pminfodiv').style.display = "block";
    }

    if(graph == 5)
    {
        dbdata = formaldehyde;
        graphTitle ="Formaldehyde"
        data.addColumn('number', 'Hour');
        data.addColumn('number', 'Formaldehyde level');
        data.addColumn('number', 'Safe');
        data.addColumn('number', 'Dangerous');
        data.addColumn('number', 'Lethal');
        var zeropoint = 0;
        var hazerdous = 75;
        var dangerous = 100;
        document.getElementById('formaldehydeinfodiv').style.display = "block";
    }


    data.addRows([                  //Data which makes up the graph/draws the lines
        [1, Number(dbdata[0]), zeropoint, hazerdous, dangerous],
        [2, Number(dbdata[1]), zeropoint, hazerdous, dangerous],
        [3, Number(dbdata[2]), zeropoint, hazerdous, dangerous],
        [4, Number(dbdata[3]), zeropoint, hazerdous, dangerous],
        [5, Number(dbdata[4]), zeropoint, hazerdous, dangerous],
        [6, Number(dbdata[5]), zeropoint, hazerdous, dangerous],
        [7, Number(dbdata[6]), zeropoint, hazerdous, dangerous],
        [8, Number(dbdata[7]), zeropoint, hazerdous, dangerous],
        [9, Number(dbdata[8]), zeropoint, hazerdous, dangerous],
        [10, Number(dbdata[9]), zeropoint, hazerdous, dangerous],
        [11, Number(dbdata[10]), zeropoint, hazerdous, dangerous],
        [12, Number(dbdata[11]), zeropoint, hazerdous, dangerous]
    ]);


    var options = {                 //Configuration settings for the graph

        height:512,                 //Sets the height in px

        hAxis: {                    //horizontal axis properties
            title: 'Last Readings',
            titleTextStyle: {
                color: '#FF0000'
            }
        },
        vAxis: {                    //vertical axis properties
            title: graphTitle

        },




        series: {                   //line propeties
            0: { color: '#000000', lineWidth: 4}, //temp/gas etc. line
            1: { color: '#01DF3A', lineWidth: 2 }, //safe line
            2: { color: '#F7D358', lineWidth: 2 }, //dangerous line
            3: { color: '#FF0000', lineWidth: 2 } //lethal line
        },

        //animation: {              //graph intro animation
        //    duration: 1000,
        //    startup: 'true',
        //    colors: ['red', '#004411']
        //},

        font: {                     //graph font used
            name: 'Arial'
        },


        backgroundColor: 'none'     //graph background color
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));




    chart.draw(data, options);      //draws the graph with the given data and options



}

//---------------------------------------------------------------------------------------------------------
//*********************************************7.Resize window function************************************
//---------------------------------------------------------------------------------------------------------

$(window).resize(function(){                                    //When window is resized
    drawBackgroundColor();                                      //Redraw graph
    drawGauges();                                               //Redraw gauge
    console.log("resized!");
});


//Check link below how to configure graph
//Source: https://google-developers.appspot.com/chart/interactive/docs/gallery/linechart#configuration-options

//Check link below how to fill graph dynamicly
//Source: https://developers.google.com/chart/interactive/docs/php_example

//---------------------------------------------------------------------------------------------------------
//****************************8.(TODO) New warning system to user -> push message/Jquery (dialog)/ other***
//---------------------------------------------------------------------------------------------------------


//See Jquery dialog on the internet for more info about a warning dialog




//---------------------------------------------------------------------------------------------------------
//****************************9.(TODO) Save values function to print/view (avarage per month or year)*****
//---------------------------------------------------------------------------------------------------------


//In this function you should sort the data to be viewed dynamicly so it can be used for the history graphs




//---------------------------------------------------------------------------------------------------------
//****************************10.(TODO) History graph (past days,week,month)********************************
//---------------------------------------------------------------------------------------------------------


//Tip: Develop a function which sorts the data from the fields based on timestaps from the database
//Sort it in a way so it can be viewed per day,week,month (mayby based on avarage)





//---------------------------------------------------------------------------------------------------------
//****************************11.(TODO) Active Qube location display on Google Maps************************
//---------------------------------------------------------------------------------------------------------

//OPTIONAL: Display Qube with googlemaps based on GPS/ip coordinates
