'use strict';

var services = angular.module('weilabuy.services', []);

services.factory('Bestbuy', function ($http, API_KEY, $q) {
	
	function load(path, params) {
		params = params || {};
		params.callback = "JSON_CALLBACK";
		return $http.jsonp('http://api.'+ path + API_KEY, {params: params});
	}

	return {
		list: function(type) {
			return load('bestbuy.com/beta/products/' + type);
		},
		product: function(sku) {
			return load('remix.bestbuy.com/v1/products/' + sku + '.json');
		},
		reviews: function(sku, params) {
			params = params || {};
			params.format = 'json';
			return load('remix.bestbuy.com/v1/reviews(sku=' + sku + ')', params);
		},
		similarItems: function(sku) {
			return load('bestbuy.com/beta/products/' + sku + '/similar');
		},
		alsoViewed: function(sku) {
			return load('bestbuy.com/beta/products/' + sku + '/alsoViewed');
		},
		stores: function(zipcode, params) {
			params = params || {};
			params.format = 'json';
			return load('remix.bestbuy.com/v1/stores(area(' + zipcode + ',50))', params);
		}
	}
});

services.factory('MoreResults', function (Bestbuy) {
  return function MoreResults (method, arg, collection_name) {
    var self = this;
    self.currentPage = 0;
    var collection = this[collection_name] = [];

    this.loadMore = function () {
      Bestbuy[method](arg, {page: parseInt(self.currentPage, 10) + 1}).then(function (data){
        self.currentPage = data.data.currentPage;
        self.totalPages = data.data.totalPages;
        [].push.apply(collection, data.data[collection_name])
      });

      return this;
    }
  }
});