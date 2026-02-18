// definitions
var appModule = angular.module('myApp', []);

appModule.controller('myCtrl1', function($scope){

    // 1. The list of subjects to display
    $scope.subList = ['FSWD', 'Python'];

    // 2. The data for the lookup (Keys are lowercase)
    $scope.subject = {
        fswd: "Full Stack Web Development",
        python: "Python Programming"
    };
});