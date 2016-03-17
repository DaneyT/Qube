<div class="widget">
<!--    <h3>Users</h3>-->
    <div class="inner">

        <?php
        $user_count = user_count($connection);
        $suffix = ($user_count != 1) ? 's' : '';
        ?>
        We current have <?php echo $user_count; ?> registered user<?php echo $suffix; ?>.
    </div>
</div>