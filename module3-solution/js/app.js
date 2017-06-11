(function () {
    'use strict'

    // narrowItDownApp MODULE
    angular.module('NarrowItDownApp', [])
			.controller('narrowItDownController', NarrowItDownController)
			.service('menuSearchService', MenuSearchService)
			.directive('foundItems', FoundItems)
			.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    // NarrowItDown CONTROLLER
	  NarrowItDownController.$inject = ['menuSearchService'];
    function NarrowItDownController(menuSearchService) {
      var narrowItDownController = this;
      narrowItDownController.search = function(searchTerm) {
        menuSearchService.getMatchedMenuItems(searchTerm)
          .then(result => {
            narrowItDownController.found = result;
          });
      };

      narrowItDownController.removeItem = function(index) {
        narrowItDownController.found.splice(index, 1);
      };
    };

    // MenuSearch SERVICE
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;

      service.getMatchedMenuItems = function(searchTerm) {
        return $http({ method: "GET", url: (ApiBasePath + "/menu_items.json") }).then(function(result) {
        	if(!searchTerm) { return []; };
        	var foundItems = result.data.menu_items.filter(item => item.description.indexOf(searchTerm) !== -1);
    			return foundItems;
        });
      }
    };

    // FoundItems controller DIRECTIVE
    function FoundItemsController() {
      var found = this;
      found.nothingFound = function () {
        return found.items && found.items.length === 0;
      };
    }

    // FoundItems DIRECTIVE
    function FoundItems() {
      var ddo = {
	      templateUrl: 'foundItems.html',
	      scope: { items: '<', onRemove: '&' },
	      controller: FoundItemsController,
	      controllerAs: 'found',
	      bindToController: true
      };
      return ddo;
    };})();