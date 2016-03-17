<!--<nav>-->
<!--    <ul>-->
<!--        <li><a href="index.php">Home</a></li>-->
<!--        <li><a href="measurement.php">Measurements</a></li>-->
<!--        <li><a href="forum.php">Forum</a></li>-->
<!--        <li><a href="contact.php">Contact us</a></li>-->
<!--    </ul>-->
<!--</nav>-->
<div class="row">
<nav class="navbar navbar-default navbar-static-top" role="navigation">
    <div class="col-md-6 col-md-offset-3">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>

        <div class="collapse navbar-collapse col-md-8 col-md-offset-2 navbar-ex1-collapse">
            <ul class="nav navbar-nav">
<!--                <li><a href="index.php">Home</a>-->
<!--                </li>-->
                <li><a href="<?php echo(logged_in() === true)?'measurement.php' : "index.php" ?>">Dashboard</a>
                </li>
                <li><a href="">About Us</a>
                </li>
                <li><a href="account.php">My Account</a></li>
                <li><a href="contact.php">Contact</a>
                </li>
                <li> <?php
                if (logged_in() === true) {
                ?> <a href="logout.php">Log out</a>
                    <?php
                    }?>
                </li>

            </ul>
        </div>
    </div>
</nav>

<!--    <nav>-->
<!--        <ul>-->
<!--            <li><a href="--><?php //echo(logged_in() === true)?'measurement.php' : "index.php" ?><!--">Home</a></li>-->
<!--            <li><a href="contact.php">Contact us</a></li>-->
<!--        </ul>-->
<!--    </nav>-->