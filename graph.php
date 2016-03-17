<?php
include 'core/init.php';
protect_page();
include 'includes/overall/header.php'; ?>

<h2 class="qube">QUBE</h2>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/screen.css">
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="assets/css/style.css">
        <title></title>
    </head>
<body>

<h2>Sensor Values</h2>

<div class="grid">
    <div class="col-1-2">
        <div id="chart_div" class="chart"></div>
    </div>
</div>



<script src="css/bootstrap.min.css"></script>
<script src="assets/js/jquery-2.1.3.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="assets/js/myscript.js"></script>
</body>
</html>


<?php include 'includes/overall/footer.php'; ?>
