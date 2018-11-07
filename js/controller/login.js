'use strict';

angular.module('myApp')
    .controller('loginCtrl',function ($http,$state) {
        let vm=this;
        vm.homePage=function(){
            $state.go('home')
        };
    });