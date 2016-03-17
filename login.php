<?php
include 'core/init.php';
logged_in_redirect();


if (empty($_POST) === false) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (empty($username) === true || empty ($password) === true){
        $errors[] = 'You need to enter a username and password';
    } else if (user_exists($connection, $username) === false) {
        $errors[] = 'we can\'t find that username. Have you registered?';
    } else if (user_active($connection, $username === false)) {
        $errors[] = 'You haven\'t activated your account!';
    } else {
       if (strlen($password) > 32){
            $errors[] = 'Password too long!';

        }
        $login = login($connection, $username, $password);
        if($login === false){
            $errors [] = 'That username/password combination is incorrect';
        }else {
        $_SESSION['user_id'] = $login;
        header('Location: index.php');
        exit();
        }
    }
} else {
    echo[] == 'No data received';
}

include 'includes/overall/header.php';
if(empty($errors) === false){
    ?>

    <div class="col-md-12 alert alert-warning">
    <h4>We tried to log you in, but...</h4>
<?php
    echo output_errors($errors);
}
?>
    </div>

<?php

include 'includes/widgets/login.php';
include 'includes/widgets/user_count.php';
include 'includes/overall/footer.php';

?>