<?php
include 'core/init.php';
protect_page();
include 'includes/overall/header.php'; ?>
    <script src="assets/js/jquery-2.1.3.min.js"></script>
<h2 class="qube">QUBE</h2>

<div class="widget">
    <h1>Hello, <?php echo $user_data['first_name'];?>!</h1>
    <ul>
        <li>
            <a href="logout.php">Log out</a>
        </li>
        <li> <a href="changepassword.php">Change password</a>
        </li>

    </ul>
    <div class="inner">
    </div>
</div>


<?php include 'includes/overall/footer.php'; ?>