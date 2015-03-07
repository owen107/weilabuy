'use strict';

var filters = angular.module('weilabuy.filters', []);

filters.filter('getDay', function() {
	return function (input) {
        var day = input.split(':')[0];
        var result = '';
        
        switch (day) {
            case "Mon":
                result = "MON";
                break;
            case "Tue":
                result = "TUE"; 
                break;
            case "Wed":
                result = "WED"; 
                break;
            case "Thurs":
                result = "THU"; 
                break;
            case "Fri":
                result = "FRI"; 
                break;
            case "Sat":
                result = "SAT";  
                break;
            case "Sun":
                result = "SUN"; 
                break;
        }
        return result;
	};
});

filters.filter('getHours', function() {
	return function(input) {
        var temp = input.split('am')[0];
        var start = temp.split(': ')[1];
        var end = input.split('-')[1].split('pm')[0];

        var result = start + ':00 am - ' + end + ':00 pm';
        return result; 
	};
});