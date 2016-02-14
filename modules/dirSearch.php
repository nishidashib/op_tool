<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
function dirSearch($path){
	if ($handle = opendir($path)){
		$dirQueue = array();
		while (false !== ($dir= readdir($handle))){
			if(is_dir($path.$dir) && $dir != '.' && $dir !='..'){
				// $dirQueue[] = array("name" =>$dir, "group" =>  "group1");
				$dirQueue[] = array("name" =>$dir);
			}
		}
	}
	//print_r(json_encode($dirQueue));
	return json_encode($dirQueue);
}
$dirArray = dirSearch($path);
echo $dirArray;

?>