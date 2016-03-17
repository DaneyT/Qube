<?php
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$db = "qube";

$connect_error = 'Sorry we\'re experiencing connection problems';
$connection = mysqli_connect($dbhost, $dbuser, $dbpass) or die($connect_error);

$select_db = mysqli_select_db($connection, $db) or die ($connect_error);

//check the db connection
//if($connection == true) {
//    echo "We're in!";
//}else{
//    echo "You'fail!";
//}
//
//?>
