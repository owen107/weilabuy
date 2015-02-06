'use strict';

var ctrls = angular.module('weilatbuy.controllers', []);

// ctrls.controller('AppCtrl', function($scope, $http) {
// });

ctrls.controller('RecomCtrl', function($scope, $routeParams, Bestbuy) {
    
    var recom = $routeParams.recom;
    Bestbuy.list(recom).then(function(data) {
    	$scope.products = data.data.results;
    });

});

ctrls.controller('ProductCtrl', function($scope, $routeParams, Bestbuy, MoreResults) {
	
    var sku = $routeParams.sku;

    Bestbuy.product(sku).then(function(data) {
		$scope.product = data.data;
	});

	Bestbuy.reviews(sku).then(function(data) {
		// $scope.reviews = data.data;
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

