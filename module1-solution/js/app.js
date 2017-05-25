(function(){
  'use strict'

  angular.module('LunchCheck', [])
		.controller('lunchCheckController', LunchCheckController)

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.addLunchItems = function() {
      if ($scope.menu) { 
        if($scope.menu.split(',').length <= 3) {
          $scope.message = "Enjoy!";
        } else {$scope.message = "Too much!";}
      } else {$scope.message = "Please enter data first";}
    }
  }
})();
