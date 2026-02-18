var appModule = angular.module("myApp", []);

appModule.controller("myCtrl1", function ($scope) {

    $scope.currency = {
        ind : 82.74,
        usa : 1.00,
        uk : 0.74,
        aus : 1.34,
        can : 1.25,
        ger : 0.85,
        fra : 0.84,
        ita : 0.85,
        esp : 0.84,
        jpn : 110.57
    };

    $scope.convertCurrency = function(amount, fromCountry, toCountry) {
        
        if (amount && fromCountry && toCountry) {
            
            var fromRate = $scope.currency[fromCountry];
            var toRate = $scope.currency[toCountry];

            var result = (amount / fromRate) * toRate;

            return result.toFixed(2); 
        } else {
            return "0.00";
        }   
    };
});