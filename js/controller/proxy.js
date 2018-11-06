angular.module('myApp')
    .controller('proxyCtrl',function ($http,$state,sidebar,$scope) {
        $scope.sidebar=sidebar;
    });