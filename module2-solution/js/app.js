(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService){
    var buy = this;
    buy.items = ShoppingListCheckOffService.GetItemsToBuyList();
    
    buy.buyItem = function(index) {
      ShoppingListCheckOffService.buyItem(index);
    };
  };

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.items = ShoppingListCheckOffService.GetBoughtItemsList();
  };

  function ShoppingListCheckOffService() {
    var service = this;
    var boughtItemsList = [];
    var itemsListToBuy = [
      { name: "cookies",   quantity: 10 },
      { name: "chocolates", quantity: 3 },
      { name: "chips",     quantity: 8 },
      { name: "muffins",   quantity: 2 },
      { name: "sodas",      quantity: 5 }
    ];
    
    service.GetItemsToBuyList = function() {
      return itemsListToBuy;
    };

    service.GetBoughtItemsList = function() {
      return boughtItemsList;
    };

    service.buyItem = function(itemIndex) { 
      boughtItemsList.push(itemsListToBuy[itemIndex]);
      itemsListToBuy.splice(itemIndex, 1);
    };
  };

})();
