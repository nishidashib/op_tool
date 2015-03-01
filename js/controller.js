var app = angular.module('app')
app.controller('mainsCtrl', function($http, $scope){
	/*
	$scope.show = function($event) {
		console.log($event.target.attributes.name.value);
	}
	*/
});
app.controller('selectController', ['$scope' , '$sce' ,'$http' ,'$uibModal',function($scope , $sce, $http ,$modal){
	$scope.servers = [
		{name: 'kibana',group: 'group1'},
		{name: 'js_samples',group: 'group2'},
		{name: 'angular',group: 'group3'}
	];
	$scope.selectServer = "--select--";
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
			//httpで取得してくるshowメソッドが勝手に消されるのを防止する。
			//でshowメソッドをクリックしてもscopeとして認識されないからng-clickされない。
			// $scope.dirTree = $sce.trustAs($sce.HTML,response.data);

			//あれ？これでも勝手にサニタイズされないけど。
			//かつhttpで取得してきたshowメソッドがscopeで認識された。
			$scope.dirTree = response.data;
			loadingModal.close();
		})
		.finally(function(){
		})
	}
	$scope.show = function($event) {
		// console.log($event.target.attributes.name.value);
	    $http({
	        method:'POST',
	        url:'/op_tool/modules/show_source.php',
	        data: $.param({ 'source' : $event.target.attributes.name.value}),
	        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
	      })
	      .then(function dataGet(response){
	          $scope.getSource = response.data;
	      },function dataError(response){
	        //alert(response);
	      })

	    // $scope.getSource = "test";
	    var sourceModal = $modal.open({
	      templateUrl: 'template/sourceView.html',
	      controller: 'ModalCtrl',
	      scope: $scope
	    });
	}
}]);
app.controller('ModalCtrl', ['$scope', '$uibModalInstance' ,function($scope, $sourceModal) {
      $scope.message = $scope.getSource;
      $scope.ok = function() {
            $sourceModal.close();
      }
    }])
$(document).on('click', 'span.dir', function(event) {
  event.preventDefault();
  $(this).next().toggle("fast");
  var v = $(this).text().substring( 0, 1 );
      if ( v == "+" )
        $(this).text( "-" + $(this).text().substring( 1 ) );
      else if ( v == "-" )
        $(this).text( "+" + $(this).text().substring( 1 ) );
});

