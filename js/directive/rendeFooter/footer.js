'use strict';

app.directive('rdFooter',function ($http,$state,$stateParams) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/rendeFooter/footer.html',
        scope: {
        },
        link: function (scope) {
            console.log(111)
        }
    }
});