<?php
    $username = trim($_POST['username']);

    $existed_username = array("hunger");
    $is_existed = FALSE;
    foreach ($existed_username as $value) {
        if ($value == $username) {
            $is_existed = TRUE;
        }
    }

    $result = array("username"=>$username, "is_existed"=>$is_existed);
    echo json_encode($result);