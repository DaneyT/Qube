<?php
function register_user($connection, $register_data) {
    array_walk($register_data, 'array_sanitize', $connection);
    $register_data['password'] = md5($register_data['password']);

    $fields = '`' .  implode('`,`', array_keys($register_data)) . '`';
    $data = '\'' .  implode('\', \'', $register_data) . '\'';
    // echo $fields;
    //echo "INSERT INTO `users` ($fields) VALUES ($data)";
    //die();

    mysqli_query($connection, "INSERT INTO `users` ($fields) VALUES ($data)");
}

function user_count($connection) {
    return mysqli_result(mysqli_query($connection, "SELECT COUNT(`user_id`) FROM `users` WHERE `active` = 1"), 0);
}

function mysqli_result($res, $row, $field=0) {
    $res->data_seek($row);
    $datarow = $res->fetch_array();
    return $datarow[$field];
}

function user_data($connection, $user_id) {
    $data = array();
    $user_id = (int)$user_id;

    $func_num_args = func_num_args();
    $func_get_args = func_get_args();

    //echo $func_num_args;
    //print_r($func_get_args);

    if($func_num_args > 1){
        unset($func_get_args[0]);
        unset($func_get_args[1]);

        $fields = '`' . implode('`, `', $func_get_args) . '`';
        //echo $fields;
        //echo "SELECT $fields FROM `users` WHERE `user_id` = $user_id";
        //die();
        $data = mysqli_fetch_assoc(mysqli_query($connection, "SELECT $fields FROM `users` WHERE `user_id` = $user_id"));

        //print_r($data);
        //die();

        return $data;
    }
    // print_r($func_get_args);
}

function logged_in() {
    return (isset($_SESSION['user_id'])) ? true : false;
}

function user_exists($connection, $username) {
    $username = sanitize($connection, $username);
    $query = mysqli_query($connection, "SELECT COUNT(`user_id`) FROM `users` WHERE `username` = '$username'");
    return (mysqli_result($query, 0) == 1) ? true : false;
}

function email_exists($connection, $email) {
    $username = sanitize($connection, $email);
    $query = mysqli_query($connection, "SELECT COUNT(`user_id`) FROM `users` WHERE `email` = '$email'");
    return (mysqli_result($query, 0) == 1) ? true : false;
}

function user_active($connection, $username) {
    $username = sanitize($connection, $username);
    $query = mysqli_query($connection, "SELECT COUNT(`user_id`) FROM `users` WHERE `username` = '$username' AND `active` = 1");
    return (mysqli_result($query, 0) == 1) ? true : false;
}
function user_id_from_username($connection, $username){
    $username - sanitize($connection, $username);
    return mysqli_result(mysqli_query($connection, "SELECT `user_id` FROM `users` WHERE `username` = '$username'"), 0, 'user_id');
}

function login($connection, $username, $password) {
    $user_id = user_id_from_username($connection, $username);
    $username = sanitize($connection, $username);
    $password = md5($password);

    return (mysqli_result(mysqli_query($connection, "SELECT COUNT(`user_id`) FROM `users` WHERE `username` = '$username' AND `password` = '$password'"), 0) == 1) ? $user_id : false;
}
?>



