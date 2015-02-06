"use strict";

var myApp = angular.module('weilatbuy', 
  ['weilatbuy.controllers', 'ngRoute', 
   'weilabuy.services', 'weilabuy.directives', 'angular-flexslider'])
  .constant('API_KEY', '?apiKey=yexp92nck8b2zjan5qaeeueg');

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/:recom', {
      	 controller: 'RecomCtrl',
      	 templateUrl: 'views/recom_list.html'
      })
      .when('/products/:sku', {
         controller: 'ProductCtrl',
         templateUrl: 'views/product.html'
      })
      .otherwise({
      	 redirectTo: '/mostViewed'
      });
}]);
