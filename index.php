<?php
include 'core/init.php';
include 'includes/overall/header.php'; ?>
    <script src="assets/js/jquery-2.1.3.min.js"></script>
        <?php
        if (logged_in() === true) {
            include 'includes/widgets/loggedin.php';
        }else {
            include 'includes/widgets/login.php';
        }
        include 'includes/widgets/user_count.php';
        ?>

<?php include 'includes/overall/footer.php'; ?>