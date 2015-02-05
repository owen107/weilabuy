"use strict";

var myApp = angular.module("weilatbuy", [ "weilatbuy.controllers", "ngRoute" ]).constant("API_KEY", "?apiKey=yexp92nck8b2zjan5qaeeueg");

myApp.config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/:recom", {
        controller: "RecomCtrl",
        templateUrl: "views/recom_list.html"
    }).when("/products/:sku", {
        controller: "ProductCtrl",
        templateUrl: "views/product.html"
    }).otherwise({
        redirectTo: "/mostViewed"
    });
} ]);

"use strict";

var ctrls = angular.module("weilatbuy.controllers", []);

// ctrls.controller('AppCtrl', function($scope, $http) {
// });
ctrls.controller("RecomCtrl", function($scope, $routeParams, $http, API_KEY) {
    var recom = $routeParams.recom;
    $http.jsonp("http://api.bestbuy.com/beta/products/" + recom + API_KEY + "&callback=JSON_CALLBACK").then(function(data) {
        console.log(data);
        $scope.products = data.data.results;
    });
});

ctrls.controller("ProductCtrl", function($scope, $routeParams, $http, API_KEY) {
    var sku = $routeParams.sku;
    $http.jsonp("http://api.remix.bestbuy.com/v1/products/" + sku + ".json" + API_KEY + "&callback=JSON_CALLBACK").then(function(data) {
        console.log(data);
        $scope.product = data.data;
    });
    $http.jsonp("http://api.remix.bestbuy.com/v1/reviews(sku=" + sku + ")" + API_KEY + "&format=json&pageSize=20&callback=JSON_CALLBACK").then(function(data) {
        console.log(data);
        $scope.reviews = data.data.reviews;
    });
    $http.jsonp("http://api.bestbuy.com/beta/products/" + sku + "/similar" + API_KEY + "&callback=JSON_CALLBACK").then(function(data) {
        console.log(data);
        $scope.similarItems = data.data.results;
    });
    $http.jsonp("http://api.bestbuy.com/beta/products/" + sku + "/alsoViewed" + API_KEY + "&callback=JSON_CALLBACK").then(function(data) {
        console.log(data);
        $scope.alsoViewed = data.data.results;
    });
    //initiate an array to hold all active tabs
    $scope.activeTabs = [ "tab1" ];
    //check if the tab is active
    $scope.isOpenTab = function(tab) {
        //check if this tab is already in the activeTabs array
        if ($scope.activeTabs.indexOf(tab) > -1) {
            //if so, return true
            return true;
        } else {
            //if not, return false
            return false;
        }
    };
    //function to 'open' a tab
    $scope.openTab = function(tab) {
        //check if tab is already open
        if ($scope.isOpenTab(tab)) {
            //if it is, remove it from the activeTabs array
            $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
        } else {
            //if it's not, add it!
            $scope.activeTabs.push(tab);
        }
    };
});