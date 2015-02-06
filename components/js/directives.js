'use strict';

var directives = angular.module('weilabuy.directives', []);

directives.directive('itemInfo', function() {
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: "views/item_info.html",
		// scope: {
		// 	similarItems: '=info'
		// }
	};
});