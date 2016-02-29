var app = angular.module('app')
app.controller('mainsCtrl', function($http, $scope){
});

app.controller('selectController', ['$scope' , '$sce' ,'$http' ,'$uibModal',function($scope , $sce, $http ,$modal){
	$scope.change = function(){
		$scope.selectServer = $scope.server.name;
		// console.log($scope.server.name);
		var loadingModal = $modal.open({
			templateUrl:'template/loading.html',
			backdrop:"static",keyboard:false
		})
		$http({
			method:'POST',
			url:'/op_tool/modules/dir_tree.php',
			data: $.param({ 'server_name' : $scope.server.name}),
			headers:{'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function dataGet(response){
			//ng-clickも当然信頼ずみ。勝手にサニタイズされないように。
			//$scope.dirTree = $sce.trustAs($sce.HTML,response.data);
			$scope.tree = response.data;
			loadingModal.close();
		},function errorCallback(response){
			alert(response);
		})
	}
	$scope.show = function($event) {
		// console.log($event.target.attributes.name.value);
	    $http({
	        method:'POST',
	        url:'/op_tool/modules/show_source.php',
	        data: $.param({ 'source' : $event.target.attributes.name.value}),
	        headers:{'Content-Type': 'application/x-www-form-urlencoded' , 'Cache-Control': 'no-cache'}
	      })
	      .then(function sourceGet(response){
	        $scope.getSource = response.data;
	      	// console.log("show() = " + $scope.getSource)
	      },function errorCallback(response){
	        alert(response);
	      })
	      .finally(function sourceShow(){
		    var sourceModal = $modal.open({
		      templateUrl: 'template/sourceView.html',
		      controller: 'ModalCtrl',
		      scope: $scope
		    });
	      })
	}
}]);

app.controller('ModalCtrl', ['$scope', '$uibModalInstance' ,function($scope, $sourceModal) {
      $scope.source = $scope.getSource;
      // console.log("Modal = " + $scope.source);
      $scope.ok = function() {
            $sourceModal.close();
      }
    }])
/*
ここだけj-queryのままっす。
*/
$(document).on('click', 'span.dir', function(event) {
  event.preventDefault();
  $(this).next().toggle("fast");
  var v = $(this).text().substring( 0, 1 );
      if ( v == "+" )
        $(this).text( "-" + $(this).text().substring( 1 ) );
      else if ( v == "-" )
        $(this).text( "+" + $(this).text().substring( 1 ) );
});

