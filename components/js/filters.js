'use strict';

var filters = angular.module('weilabuy.filters', []);

filters.filter('getDay', function() {
	return function (input) {
        var day = input.split(':')[0];
        var result = '';
        
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

filters.filter('getHours', function() {
	return function(input) {
        var start = input.split('am')[0];
        var end = input.split('-')[1].split('pm')[0];

        var result = start + ':00 am - ' + end + ':00 pm';
        return result; 
	};
});