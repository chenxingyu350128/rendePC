'use strict';

app.directive('commonSearch',function ($http,$state,$stateParams,listsRequest,common,$timeout,modalBox) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/common_search/common_search.html',
        scope: {
        },
        link: function (scope) {
            scope.hotSearch=listsRequest.lists().hotSearch;
        }
    }
});