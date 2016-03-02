var app = angular.module('app')
app.controller('mainsCtrl', function($http, $scope){
});
app.controller('selectController', ['$scope' , '$sce' ,'$http' ,'$uibModal','getTree','getShowSource',function($scope,$sce, $http ,$modal,getTree,getShowSource){
	$scope.change = function(){
		$scope.selectServer = $scope.server.name;
		// console.log($scope.server.name);
		var loadingModal = $modal.open({
			templateUrl:'template/loading.html',
			backdrop:"static",keyboard:false
		})
		getTree.tree($scope.server.name).then(function(res){
			$scope.tree = res.data;
		}).finally(function(){loadingModal.close()})
	}
	$scope.show = function($event) {
		getShowSource.source($event.target.attributes.name.value).then(function(res){
			$scope.getSource = res.data;
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

