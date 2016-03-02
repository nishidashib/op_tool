var app = angular.module('app')
app.factory('getTree', ['$http' , function($http){
    var getTree = function(param){
        return $http({
			method:'POST',
			url:'./modules/dir_tree.php',
			data: $.param({ 'server_name' : param}),
			headers:{'Content-Type': 'application/x-www-form-urlencoded'}
		})
        .then(function(data, status, headers, config) {
        	// console.log(data);
            return data;
        });
    }
	return {tree:getTree}
}])
app.factory('getShowSource', ['$http' , function($http){
    var getShowSource = function(param){
        return $http({
	        method:'POST',
	        url:'./modules/show_source.php',
	        data: $.param({ 'source' : param}),
	        headers:{'Content-Type': 'application/x-www-form-urlencoded' , 'Cache-Control': 'no-cache'}
	      })
        .then(function(data, status, headers, config) {
        	// console.log(data);
            return data;
        });
    }
	return {source:getShowSource}
}])