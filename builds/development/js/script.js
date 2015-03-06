"use strict";

var myApp = angular.module("weilatbuy", [ "weilatbuy.controllers", "ngRoute", "weilabuy.services", "weilabuy.directives", "weilabuy.filters", "angular-flexslider" ]).constant("API_KEY", "?apiKey=yexp92nck8b2zjan5qaeeueg");

myApp.config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/:recom", {
        controller: "RecomCtrl",
        templateUrl: "views/recom_list.html"
    }).when("/products/:sku", {
        controller: "ProductCtrl",
        templateUrl: "views/product.html"
    }).when("/search/findastore", {
        controller: "StoreCtrl",
        templateUrl: "views/store.html"
    }).otherwise({
        redirectTo: "/mostViewed"
    });
} ]);

"use strict";

var ctrls = angular.module("weilatbuy.controllers", []);

ctrls.controller("RecomCtrl", function($scope, $routeParams, Bestbuy) {
    var recom = $routeParams.recom;
    $scope.prodName = $routeParams.recom;
    if (recom !== "findastore") {
        Bestbuy.list(recom).then(function(data) {
            $scope.products = data.data.results;
        });
    }
});

ctrls.controller("ProductCtrl", function($scope, $routeParams, Bestbuy, MoreResults) {
    var sku = $routeParams.sku;
    Bestbuy.product(sku).then(function(data) {
        $scope.product = data.data;
    });
    Bestbuy.reviews(sku).then(function(data) {
        $scope.reviews = new MoreResults("reviews", sku, "reviews").loadMore();
    });
    Bestbuy.similarItems(sku).then(function(data) {
        $scope.similarItems = data.data.results;
    });
    Bestbuy.alsoViewed(sku).then(function(data) {
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

ctrls.controller("StoreCtrl", function($scope, Bestbuy, MoreResults) {
    $scope.stores = "undefined";
    $scope.hours = [];
    function splitHours(data) {
        angular.forEach(data, function(value, key) {
            $scope.hours.push(value.hoursAmPm.split("; "));
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
        $scope.zipCode = "";
    };
    $scope.loadMore = function() {
        Bestbuy.stores($scope.zipcode, {
            page: parseInt($scope.currentPage, 10) + 1
        }).then(function(data) {
            $scope.currentPage = data.data.currentPage;
            splitHours(data.data.stores);
            $scope.stores = $scope.stores.concat(data.data.stores);
        });
    };
});

"use strict";

var directives = angular.module("weilabuy.directives", []);

directives.directive("itemInfo", function() {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "views/item_info.html"
    };
});

"use strict";

var filters = angular.module("weilabuy.filters", []);

filters.filter("getDay", function() {
    return function(input) {
        var day = input.split(":")[0];
        var result = "";
        switch (day) {
          case "Mon":
            result = "Monday";
            break;

          case "Tue":
            result = "Tuesday";
            break;

          case "Wed":
            result = "Wednesday";
            break;

          case "Thurs":
            result = "Thursday";
            break;

          case "Fri":
            result = "Friday";
            break;

          case "Sat":
            result = "Satursday";
            break;

          case "Sun":
            result = "Sunday";
            break;
        }
        return result;
    };
});

filters.filter("getHours", function() {
    return function(input) {
        var start = input.split("am")[0];
        var end = input.split("-")[1].split("pm")[0];
        var result = start + ":00 am - " + end + ":00 pm";
        return result;
    };
});

"use strict";

var services = angular.module("weilabuy.services", []);

services.factory("Bestbuy", function($http, API_KEY, $q) {
    function load(path, params) {
        params = params || {};
        params.callback = "JSON_CALLBACK";
        return $http.jsonp("http://api." + path + API_KEY, {
            params: params
        });
    }
    return {
        list: function(type) {
            return load("bestbuy.com/beta/products/" + type);
        },
        product: function(sku) {
            return load("remix.bestbuy.com/v1/products/" + sku + ".json");
        },
        reviews: function(sku, params) {
            params = params || {};
            params.format = "json";
            return load("remix.bestbuy.com/v1/reviews(sku=" + sku + ")", params);
        },
        similarItems: function(sku) {
            return load("bestbuy.com/beta/products/" + sku + "/similar");
        },
        alsoViewed: function(sku) {
            return load("bestbuy.com/beta/products/" + sku + "/alsoViewed");
        },
        stores: function(zipcode, params) {
            params = params || {};
            params.format = "json";
            return load("remix.bestbuy.com/v1/stores(area(" + zipcode + ",50))", params);
        }
    };
});

services.factory("MoreResults", function(Bestbuy) {
    return function MoreResults(method, arg, collection_name) {
        var self = this;
        self.currentPage = 0;
        var collection = this[collection_name] = [];
        this.loadMore = function() {
            Bestbuy[method](arg, {
                page: parseInt(self.currentPage, 10) + 1
            }).then(function(data) {
                self.currentPage = data.data.currentPage;
                self.totalPages = data.data.totalPages;
                [].push.apply(collection, data.data[collection_name]);
            });
            return this;
        };
    };
});