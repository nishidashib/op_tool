var app = angular.module('app')
app.factory('getSource', ['$http' , function($http){
    var getTree = function(param){
        return $http({
			method:'POST',
			url:'/op_tool/modules/dir_tree.php',
			data: $.param({ 'server_name' : param}),
			// data: $.param({ 'server_name' : this.$scope.server.name}),
			headers:{'Content-Type': 'application/x-www-form-urlencoded'}
		})
        .then(function(data, status, headers, config) {
        	// console.log(data);
            return data;
        });
    }
	return {dirTree:getTree}
}])