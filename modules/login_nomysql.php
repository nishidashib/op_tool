<?php
//session
session_start();
if (!empty($_POST["userid"]) && !empty($_POST["password"])) {
  if ($_POST["password"] == 't-tashibasaki') {
    session_regenerate_id(true);//????
    $_SESSION["USERID"] = $_POST["userid"];
    echo 1;
    exit;
  }else{
    echo 0;
    exit;
  }
}
?>

