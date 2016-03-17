<div class="row">
<div class="col-md-6 col-md-offset-3">
    <img src="img/Logo_Qube.png" style="width:122.75px;height:172px;">
    <h2>Welcome!</h2>
    Login form <br>

    <form action="login.php" method="post">
    <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" class="form-control" id="username" placeholder="username" name="username">
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" placeholder="password" name="password">
        </div>
        <div class="form-group">
        <button type="submit" class="btn btn-default clearfix">Login</button>
        </div>
        <div class="form-group">
        <a class="btn btn-primary" href="register.php">Register here</a>
        </div>
<!--            <ul id="login">-->
<!--                <li>Username:<br> <input type="text" name="username"></li>-->
<!--                <li>Password:<br> <input type="password" name="password"></li>-->
<!--                <li><input type="submit" value="Log in"</li>-->
<!--                <li><a href="register.php">Register</a>-->
<!--            </ul>-->
        </form>

    </div>
</div>
