<?php
session_start();

if(!empty($_SESSION["USERID"])){
	echo true; //1
}else{
	echo false;
}
?>

