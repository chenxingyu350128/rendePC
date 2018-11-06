angular.module('myApp')
    .controller('companyInfo',function ($http,$state,$stateParams) {
        let vm=this;
        vm.enterprise=function () {
            $state.go('enterprise')
        };
        vm.signIn=function () {
            $state.go('signPage',{login:true})
        };
        vm.signUp=function () {
            $state.go('signPage',{sign:true})
        };
        vm.companyInfo=function () {
            $state.go('companyInfo')
        };
        vm.print=function () {
            console.log("sssssss")
        }
    });