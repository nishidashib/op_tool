<?php
$server = $_POST['server_name'];
$path = $_SERVER['DOCUMENT_ROOT'] . '/' . $server . '/';
function DirTree($path){
	if ($handle = opendir($path)){
		$Array = array();
		while (false !== ($file = readdir($handle))){
			if(is_dir($path.$file) && $file != '.' && $file !='..'){
				$Array[] = array("dir" => $file,"dirContents" => array_map("subDirTree", array($path.$file."/")));
			} else if ($file != '.' && $file !='..') {
				$Array[] = array("file" => $file ,"path" => $path.$file);
			}
		}
	}
	return $Array;
}
function subDirTree($path){
	$Array = array();
	if ($handle = opendir($path)){
		while (false !== ($file = readdir($handle))){
			if(is_dir($path.$file) && $file != '.' && $file !='..'){
				array_push($Array,array("dir" => $file,"dirContents" => array_map("subDirTree", array($path.$file."/"))));
			}
			else if ($file != '.' && $file !='..') {
				array_push($Array,array("file" => $file ,"path" => $path.$file));
			};
		};
		return $Array;
	};
}
echo json_encode(DirTree($path));
?>