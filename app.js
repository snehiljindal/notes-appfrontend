let modal = angular.module('modal',['ngRoute','ngAnimate']);

modal.config(['$routeProvider', '$locationProvider',function($routeProvider,$locationProvider){

        //$locationProvider.html5Mode(true)
        $routeProvider
                .when('/home', {
                        templateUrl:'views/home.html',
                        controller:"ninjacontroller"
                })
                .when('/contact', {
                        templateUrl:'views/contact.html',
                        controller:'mycontroller'
                })
                .when('/successcontact', {
                        templateUrl:'views/successcontact.html',
                        controller:'mycontroller'
                })
     
                .when('/directory', {
                        templateUrl:'views/directory.html',
                        controller: 'ninjacontroller'
                })
               .otherwise({
                        redirectTo:'/home'
                })
}])
modal.directive("randomNinja",[function(){
        return {
                restrict:"E",
                scope:{
                        ninjas:"=",
                        title:"="
                },
                templateUrl:'views/random.html',
                transclude:true,
                replace:true,
                controller:function($scope){
                        $scope.random=Math.floor(Math.random()*4)
                }
        }
}])

modal.controller('ninjacontroller',['$scope','$http' ,function($scope, $http){
    $scope.message='hello how are you'
    $scope.removeninja=function(ninja){
            let removeninja=$scope.arrays.indexOf(ninja)
            $scope.arrays.splice(removeninja,1)
    }


    $scope.removeall=function(){
            $scope.arrays=[]
    }


    $scope.addninja=function(){
            $scope.arrays.push({
                    name:$scope.addnewninja.name,
                    belt:$scope.addnewninja.belt,
                    rate:parseInt($scope.addnewninja.rate),
                    available:true
            })
            $scope.addnewninja.name=""
            $scope.addnewninja.belt=""
            $scope.addnewninja.rate=""
    }
    $http.get('data/ninja.json').then(function(response){
            $scope.arrays = response.data
            console.log($scope.arrays)
    }, function(error){
            console.log(error)
    })
}])
modal.controller("mycontroller",["$scope","$location", function($scope,$location){
        $scope.yourmessage=function(){
                $location.path("/successcontact")
                
        }
        
      
}])