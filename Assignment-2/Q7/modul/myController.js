var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    
    $scope.greeting = "Welcome to MVC Architecture!";
    $scope.detail = "This message is coming directly from the Controller.";

});