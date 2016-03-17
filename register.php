<?php
include 'core/init.php';
logged_in_redirect();
include 'includes/overall/header.php';

if(empty($_POST) === false){
  $required_fields = array('username', 'password', 'password_again', 'first_name', 'email');
    foreach($_POST as $key=>$value) {
        if(empty($value) && in_array($key, $required_fields) === true){
            $errors[] = 'Fields marked with an asterisk are required';
            break 1;
        }
    }

    if (empty($errors) === true){
        if(user_exists($connection, $_POST['username']) === true){
            $errors[] = 'Sorry, the username \'' . $_POST['username'] . '\' is already taken.';
        }

    if (preg_match("/\\s/", $_POST['username']) == true){
        $errors[] = 'Your username must not contain any spaces';
    }

    if (strlen($_POST['password']) < 6) {
        $errors[] = 'Your password must be at least 6 characters';
    }

    if ($_POST['password'] !== $_POST['password_again']) {
        $errors[] = 'Your password do not match';
    }
    if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) === false) {
        $errors[] = 'A valid email address is required';
    }

    if (email_exists($connection, $_POST['email']) === true){
        $errors[] = 'Sorry, the email \'' . $_POST['email'] . '\' is already in use.';
    }
  }
}

?>
<!--    <h1>Register</h1>-->

    <div class="row">
    <div class="col-md-6 col-md-offset-3">
    <img src="img/Logo_Qube.png" style="width:122.75px;height:172px;">
    <h2>Registration page</h2>
    Register form <br>


<?php
if(isset($_GET['success']) && empty($_GET['success'])) {
echo 'You\'ve been registered successfully!';
} else {
    if (empty($_POST) === false && empty($errors) === true) {
        // register user
        $register_data = array(
            'username' => $_POST['username'],
            'password' => $_POST['password'],
            'first_name' => $_POST['first_name'],
            'last_name' => $_POST['last_name'],
            'email' => $_POST['email']
        );

        register_user($connection, $register_data);
        // redirect
        header('Location: register.php?success');
        //exit
        exit();

    } else if (empty($errors) === false) {
        // output errors

        ?>
        <div class="col-md-12 alert alert-warning">
        <?php
        echo output_errors($errors);
    }
    ?>
    </div>

    <div class="row">
        <div class="col-md-6 col-md-offset-3">
    <form action="" method="post">
        <div class="form-group">
            <label for="username">Username*:</label>
            <input type="text" class="form-control" id="username" placeholder="username" name="username">
        </div>
        <div class="form-group">
            <label for="password">Password*:</label>
            <input type="password" class="form-control" id="password" placeholder="password" name="password">
        </div>
        <div class="form-group">
            <label for="password_again">Password again*:</label>
            <input type="password" class="form-control" id="password_again" placeholder="password" name="password_again">
        </div>
        <div class="form-group">
            <label for="first_name">First name*:</label>
            <input type="text" class="form-control" id="first_name" placeholder="first name" name="first_name">
        </div>
        <div class="form-group">
            <label for="last_name">Last name*:</label>
            <input type="text" class="form-control" id="last_name" placeholder="last name" name="last_name">
        </div>
        <div class="form-group">
            <label for="email">Email*:</label>
            <input type="text" class="form-control" id="email" placeholder="email" name="email">
        </div>
        <div class="form-group">
            <button type="submit" value="register" class="btn btn-default clearfix">Register</button>
        </div>

        </form>

            <?php
            include 'includes/widgets/user_count.php';
            include 'includes/overall/footer.php'; ?>
    </div>
    </div>

    </div>
    </div>

<!--    <form action="" method="post">-->
<!--        <ul>-->
<!--            <li>-->
<!--                Username*:<br>-->
<!--                <input type="text" name="username">-->
<!--            </li>-->
<!--            <li>-->
<!--                Password*:<br>-->
<!--                <input type="password" name="password">-->
<!--            </li>-->
<!--            <li>-->
<!--                Password again*:<br>-->
<!--                <input type="password" name="password_again">-->
<!--            </li>-->
<!--            <li>-->
<!--                First name*:<br>-->
<!--                <input type="text" name="first_name">-->
<!--            </li>-->
<!--            <li>-->
<!--                Last name:<br>-->
<!--                <input type="text" name="last_name">-->
<!--            </li>-->
<!--            <li>-->
<!--                Email*:<br>-->
<!--                <input type="text" name="email">-->
<!--            </li>-->
<!--            <li>-->
<!--                <input type="submit" value="register">-->
<!--            </li>-->
<!--        </ul>-->
<!--    </form>-->
    <?php
}
