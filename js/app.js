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
    .run(["$rootScope","$uibModal", "$http", 'getSelect',function($scope, $modal,$http,getSelect){
        $scope.open = function() {
            $modal.open({templateUrl:"template/login.html", scope: $scope});
        };
        getSelect.select()
        .then(function(res){
            $scope.servers = res.data;
            $scope.selectServer = "--select--";
        },function(error){
            alert(error.messeage);
        })
    }]);

