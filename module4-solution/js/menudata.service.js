(function () {
  'use strict'

  angular.module('DataModule').service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var menuDataService = this;
    
    menuDataService.getAllCategories = function() {
      return $http.get( ApiBasePath + '/categories.json' )
        .then(function (result) { return result.data;});
    }

    menuDataService.getItemsForCategory = function(categoryShortName) {
      return $http.get( ApiBasePath + '/menu_items.json?category=' + categoryShortName )
        .then(function (result) { return result.data.menu_items; });
    }
  };
})();
