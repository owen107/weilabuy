'use strict';

var ctrls = angular.module('weilatbuy.controllers', []);

ctrls.controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
    
    $scope.$location = $location;
    
    $scope.items = [
      { path: '/mostViewed', title: 'Most Popular Viewed' },
      { path: '/trendingViewed', title: 'Trending Products' },
      { path: '/search/findastore', title: 'Find A Store' }
    ];
    $scope.isActive = function(item) {
      if (item.path == $location.path()) {
        return true;
      }
      return false;
    };
}]);

ctrls.controller('FooterCtrl', function($scope) {
    
    var date = new Date();
    $scope.year = date.getFullYear();
});

ctrls.controller('RecomCtrl', function($scope, $routeParams, Bestbuy) {
    
    var recom = $routeParams.recom;
    $scope.prodName = $routeParams.recom;
    if (recom !== 'findastore') {
    	Bestbuy.list(recom).then(function(data) {
	    	$scope.products = data.data.results;
	    });
    }
});

ctrls.controller('ProductCtrl', function($scope, $routeParams, Bestbuy, MoreResults) {
	
    var sku = $routeParams.sku;

    Bestbuy.product(sku).then(function(data) {
		$scope.product = data.data;
	});

	Bestbuy.reviews(sku).then(function(data) {

		$scope.reviews = new MoreResults('reviews', sku, 'reviews').loadMore();
	});


	Bestbuy.similarItems(sku).then(function(data) {
		$scope.similarItems = data.data.results;
	});

	Bestbuy.alsoViewed(sku).then(function(data) {
		$scope.alsoViewed = data.data.results;
    });

	//initiate an array to hold all active tabs
    $scope.activeTabs = ['tab1'];
 
    //check if the tab is active
    $scope.isOpenTab = function (tab) {
        //check if this tab is already in the activeTabs array
        if ($scope.activeTabs.indexOf(tab) > -1) {
            //if so, return true
            return true;
        } else {
            //if not, return false
            return false;
        }
    }
 
    //function to 'open' a tab
    $scope.openTab = function (tab) {
        //check if tab is already open
        if ($scope.isOpenTab(tab)) {
            //if it is, remove it from the activeTabs array
            $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
        } else {
            //if it's not, add it!
            $scope.activeTabs.push(tab);
        }
    }

});

ctrls.controller('StoreCtrl', function($scope, Bestbuy, MoreResults) {

	$scope.stores = 'undefined';
	$scope.hours = [];

	function splitHours(data) {
		angular.forEach(data, function(value, key) {
            $scope.hours.push(value.hoursAmPm.split('; '));
            value.hours = $scope.hours;
            $scope.hours = [];
		});
	}

	$scope.searchStore = function(zipCode) {
		
		$scope.zipcode = this.zipCode;

        Bestbuy.stores(zipCode).then(function(data) {
        	
        	$scope.stores = data.data.stores;
        	$scope.currentPage = data.data.currentPage;
        	$scope.totalPages = data.data.totalPages;

        	splitHours(data.data.stores);
        });

        $scope.zipCode = '';
	}

	$scope.loadMore = function() {
		Bestbuy.stores($scope.zipcode, {page: parseInt($scope.currentPage, 10) + 1})
		  .then(function(data) {

			$scope.currentPage = data.data.currentPage;
			splitHours(data.data.stores);

			$scope.stores = $scope.stores.concat(data.data.stores);
		});
	}
});

