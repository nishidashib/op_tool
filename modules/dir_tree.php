<?php
sleep(1);//loading_test

//global varibale
$server = $_POST['server_name'];
$path = '/Applications/XAMPP/xamppfiles/htdocs/' . $server . '/';

function DirTree($path){
	if ($handle = opendir($path)){
		echo "\n<ul>\n";
		$queue = array();
		while (false !== ($file = readdir($handle))){
			if(is_dir($path.$file) && $file != '.' && $file !='..'){
				SubDir($path,$file);
			} else if ($file != '.' && $file !='..') {
				$queue[] = $file;
			}
		}
		printQueue($path,$queue);
		echo "</ul>\n";
	}
}
function SubDir($path,$dir){
	echo "<li><span class=\"dir\">$dir</span>";
	DirTree($path.$dir."/");
	echo "</li>\n";
}

function printQueue($path,$queue){
	foreach ($queue as $file){
		echo "<li><a rel=\"leanModal\" name=\"".$path.$file."\" href=\"".$path.$file."\">$file</a></li>\n";
	}
}
echo "<div id=\"dir_tree\">";
echo DirTree($path);
echo "</div>\n";
?>