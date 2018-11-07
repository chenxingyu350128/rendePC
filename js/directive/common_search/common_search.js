'use strict';

app.directive('commonSearch',function ($http,$state,$stateParams) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/common_search/common_search.html',
        scope: {
        },
        link: function (scope) {
            console.log(222)
        }
    }
});