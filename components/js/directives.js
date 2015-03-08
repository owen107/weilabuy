'use strict';

var directives = angular.module('weilabuy.directives', []);

directives.directive('item', function() {
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: "views/item.html",
	};
});