$(function() {
    $('#side-menu').metisMenu();
});
angular.module('app', ['ui.router','ngSanitize', 'ui.bootstrap'])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('func2' , {
            url:'/func2',
            templateUrl:"pages/func2.html",
            controller: 'mainsCtrl'
        })
        .state('func3' , {
            url:'/func3',
            templateUrl:"pages/func3.html",
            controller: 'mainsCtrl'
        })
        .state('cat' , {
            url:'/cat',
            templateUrl:"pages/cat.html",
            controller: 'selectController'
        })
        $urlRouterProvider.otherwise("/");
    }])
    .run(["$rootScope","$uibModal", function($scope, $modal){
              $scope.open = function() {
                $modal.open({templateUrl:"template/login.html", scope: $scope});
              };
    }])
    .run(["$rootScope","$http",function($scope,$http){
        $http({
            method:'GET',
            url:'/op_tool/modules/dirSearch.php'
        })
        .then(function selectData(response){
            $scope.servers = response.data;
        },function errorCallback(response){
            alert(response);
        })
        $scope.selectServer = "--select--";
    }]);
