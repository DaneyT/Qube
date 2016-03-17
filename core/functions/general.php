<?php
function logged_in_redirect() {
    if (logged_in() === true) {
        header('Location: index.php');
    }
}

function protect_page(){
    if(logged_in() === false) {
        header('Location: protected.php');
    }
}

function array_sanitize(&$item, $key, $connection) {
    return mysqli_real_escape_string($connection, $item);
}

function sanitize($connection, $data) {
    return mysqli_real_escape_string($connection, $data);
}

function output_errors($errors){
    return '<ul><li>' . implode('</li><li>', $errors) . '</li></ul>';
}
?>