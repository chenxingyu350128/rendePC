'use strict';
angular.module('myApp')
    .controller('accountManage',function ($http,$state,$stateParams) {
        let vm=this;
        vm.navType=parseInt($stateParams.navType)||0;

    });