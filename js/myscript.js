//********************************************For testing****************************
$(window).load(function() {

});



$(document).ready(function () {
    console.log("ready!");
    drawGauges();
    //getdata();

    //$( "rect:first" ).wrapAll( "<div class='bgcolor' />");

});




//*****************************************Import data script***********************************************
var dbdata = [];
var temperture = [];
var temp;
var gasses = [];
var gas;
var humidity = [];
var rh;
var particulateMatter = [];
var pm;

setInterval(function getdata(){                                                    //Function that gets the latest data from the database with a limit of 10 and orderd DESC -> view getdatabseinfo.php
var url="getdatabaseinfo.php"
temperture.length = 0; // wat is dit??
$("#jsondata tbody").html("");
$.getJSON(url,function(data){
    $.each(data.projectnature, function(i,reading){
        //console.log(reading.Temp);
        temperture.push(reading.Temp);
        humidity.push(reading.Humidity);
        gasses.push(reading.Gas);
        particulateMatter.push(reading.Stof);

        //var newRow ='<tr>+'+projectnature.Temp+'+</tr>';

        //var newRow ="<img src="+ video.youtube_thumbnail_url+">";
        //$(newRow).appendTo("#jsondata tbody");
    });

    temp = Math.floor(temperture[0]);
    temp = (temp+10)*2;
    rh = Math.floor(humidity[0]);
    //rh=
    gas = Math.floor(gasses[0]);
    gas = 100-((gas-1)/24*100);
    rh =  Math.floor(humidity[0]);
    pm =  Math.floor(particulateMatter[0]);
    pm = pm * 0;


    //console.log(particulateMatter);
    //console.log(temp);
    var correctPMValues = particulateMatter;
    //var filterdPMValues = correctPMValues.slice();

    //for(var i in correctPMValues){
    //    if(correctPMValues[i]<1){
    //        correctPMValues.splice(i,1);
    //        break;
    //    }
    //}

    var filterdPMValues = [];

    if(filterdPMValues.length > 0){

        filterdPMValues.length = 0;
        filterdPMValues = correctPMValues.filter(function(value) { return value > 1 });

    }else{
        filterdPMValues.length = 0;
        filterdPMValues = correctPMValues.filter(function(value) { return value > 1 });

    }
    console.log(filterdPMValues);
    particulateMatter = [];






    var pathname = $(location).attr('href');
    var split = pathname.split("/");
    //console.log(split[5]);
    if(split[5] === "measurement.php")                    //if url = gauges draw gauges else if page is graph draw graph
    {
        drawGauges();
    }else if(split[5].indexOf("graph") > -1){
        drawBackgroundColor();
    }



});
}, 3000);
//console.log(parseFloat(temperture[5]));

//****************************************Temperature meter********************************************
function drawGauges(){
    $( ".gauge2" ).remove();
    $("<div id='gauge2' class='gauge2 demo2'></div>").appendTo( "#meter1");

    console.log("Gauge2 emptied");
    $('#gauge2').gauge({
        values: {
            0 : '-10',
            20: '0',
            40: '10',
            60: '20',
            80: '30',
            100: '40'
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

        value: temp
    });
    //var header1 = $("<h1>Temperature</h1>");
    //$('#gauge2').append(header1);
    var link1 = $("<a href='graph.php?graph=1'>Link to temperature</a>");
    $('#gauge2').append(link1);


    console.log("Gauge created");

    $( ".gauge3" ).remove();
    $("<div id='gauge3' class='gauge3 demo2'></div>").appendTo( "#meter2");
    console.log("Gauge3 emptied");
    $('#gauge3').gauge({
        values: {
            0 : '25',
            20: '20',
            40: '15',
            60: '10',
            80: '5',
            100: '1'
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
    //var header2 = $("<h1>Gasses</h1>");
    //$('#gauge3').append(header2);
    var link2 = $("<a href='graph.php?graph=2'>Link to gasses</a>");
    $('#gauge3').append(link2);

// first example
//    var gauge = new Gauge($('.gauge1'), {value: 40});
// second example
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
    //var header3 = $("<h1>Humidity</h1>");
    //$('#gauge4').append(header3);
    var link3 = $("<a href='graph.php?graph=3'>Link to humidity</a>");
    $('#gauge4').append(link3);

    $( ".gauge5" ).remove();
    $("<div id='gauge5' class='gauge5 demo2'></div>").appendTo( "#meter4");
    console.log("Gauge5 emptied");
    $('#gauge5').gauge({
        values: {
            0 : '-10',
            20: '0',
            40: '10',
            60: '20',
            80: '30',
            100: '40'
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

        value: 0
    });
    //var header4 = $("<h1>Particulate Matter</h1>");
    //$('#gauge5').append(header4);
    var link4 = $("<a href='graph.php?graph=4'>Link to particulate matter</a>");
    $('#gauge5').append(link4);

}



//****************************************Google graph************************************************

google.load('visualization', '1', { packages: ['corechart', 'line'] });
google.setOnLoadCallback(drawBackgroundColor);



function drawBackgroundColor() {

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

    //document.getElementById('.test').innerHTML = temperture;

    var data = new google.visualization.DataTable();

    if(graph == 1)
    {
        dbdata = temperture;
        data.addColumn('number', 'Hour');
        data.addColumn('number', 'Temperature level');
        data.addColumn('number', 'Safe');
        data.addColumn('number', 'Dangerous');
        data.addColumn('number', 'Lethal');
        var zeropoint = 0;
        var hazerdous = 30;
        var dangerous = 40;
    }
    if(graph == 2)
    {
        dbdata = gasses;
        data.addColumn('number', 'Hour');
        data.addColumn('number', 'Gasses level');
        data.addColumn('number', 'Safe');
        data.addColumn('number', 'Dangerous');
        data.addColumn('number', 'Lethal');
        var zeropoint = 25;
        var hazerdous = 15;
        var dangerous = 1;
    }
    if(graph == 3)
    {
        dbdata = humidity;
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
        dbdata = particulateMatter;
        data.addColumn('number', 'Hour');
        data.addColumn('number', 'Particulate matter level');
        data.addColumn('number', 'Safe');
        data.addColumn('number', 'Dangerous');
        data.addColumn('number', 'Lethal');
        var zeropoint = 0;
        var hazerdous = 30;
        var dangerous = 40;
    }


    data.addRows([                  //Data which makes up the graph
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
            title: 'Degrees Celsius'

        },




        series: {                   //line propeties
            0: { color: '#000000', lineWidth: 4}, //gas line
            1: { color: '#01DF3A', lineWidth: 2 }, //safe line
            2: { color: '#F7D358', lineWidth: 2 }, //dangerous line
            3: { color: '#FF0000', lineWidth: 2 } //lethal line
        },

        //animation: {                //graph intro animation
        //    duration: 1000,
        //    startup: 'true',
        //    colors: ['red', '#004411']
        //},

        font: {                     //graph font used
            name: 'Arial'
        },


        backgroundColor: 'none'  //graph background color
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));




    chart.draw(data, options);      //draws the graph



}

$(window).resize(function(){
    drawBackgroundColor();
    drawGauges();
    console.log("resized!");
    //getdata();
    //$( "<div class='bgcolor' ></div>" ).insertAfter( "rect:first" );


});


//Check link below how to configure graph
//Source: https://google-developers.appspot.com/chart/interactive/docs/gallery/linechart#configuration-options

//Check link below how to fill graph dynamicly
//Source: https://developers.google.com/chart/interactive/docs/php_example



//**************************************************************************************************