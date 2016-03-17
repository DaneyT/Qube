<?php
include 'core/init.php';
protect_page();
include 'includes/overall/header.php'; ?>

    <h2 class="qube">QUBE</h2>

    <!DOCTYPE html>
    <html>
        <head lang="en">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=1024, maximum-scale=1">
            <title></title>
            <link href="assets/css/jquery-gauge.css" rel="stylesheet">
            <!--            <link rel="stylesheet" href="assets/css/bootstrap.min.css">-->
            <!--            <link rel="stylesheet" href="assets/css/bootstrap-theme.min.css">-->
            <link rel="stylesheet" href="assets/css/style.css">
            <script src="http://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
            <script src="assets/js/jquery-2.1.3.min.js"></script>
        </head>

    <body>


    <div id="meter1" >
        <h2 class="page-header">Temperature</h2>
    </div>
    <div id="meter2" >
        <h2 class="page-header">Gasses</h2>
    </div>

    <div id="meter3" >
        <h2 class="page-header">Humidity</h2>
    </div>

    <div id="meter4" >
        <h2 class="page-header">Particulate Matter</h2>
    </div>

    <div id="meter5" >
        <h2 class="page-header">Formaldehyde</h2>
    </div>


    <!--Kan deze regel hieronder nog removed worden??-->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>

<!--    <script src="js/bootstrap.min.js"></script>-->
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="assets/js/jquery-gauge.js"></script>
    <script src="assets/js/myscript.js"></script>

    </body>
    </html>








