'use strict';

angular.module('myApp')
    .controller('jobFairCtrl',function ($http,$state) {
        let vm=this;
        vm.homePage=function(){
            $state.go('home')
        };
    });