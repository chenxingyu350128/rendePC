angular.module('myApp').directive('onFinishRenderFilters2', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished2');
                });
            }
        }
    };
});