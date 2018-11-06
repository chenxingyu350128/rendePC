angular.module('myApp')
    .controller('enterprise',function ($http,$state) {
        let vm=this;
        vm.nav=1;
        vm.pickNav=function(e){
            vm.nav=(e===1)?1:2;
        };
        vm.homePage=function(){
            $state.go('home')
        };
        vm.store=function () {
          $state.go('store')
        };
        let navList=$('.nav').find('div').eq(2);
        navList.css({
            'border-bottom':'5px solid #e11c19'
        })
    });