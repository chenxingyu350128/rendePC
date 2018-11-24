'use strict';

app.directive('commonSearch',function ($http,$state,$stateParams,changed,hotSearch,common,$timeout,modalBox) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/common_search/common_search.html',
        scope: {
        },
        link: function (scope) {
            scope.hotSearchList=changed.hotSearchList();
            console.log(scope.hotSearchList);
        }
    }
});