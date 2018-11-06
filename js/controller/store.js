angular.module('myApp')
    .controller('storeCtrl',function ($http,$state) {
        let vm=this;
        vm.homePage=function(){
            $state.go('home')
        };
        vm.enterprise=function () {
            $state.go('enterprise')
        };
        let navList=$('.nav').find('div').eq(4);
        navList.css({
            'border-bottom':'5px solid #e11c19'
        })
    });