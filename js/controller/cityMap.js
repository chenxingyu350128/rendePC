'use strict';
angular.module('myApp')
    .controller('cityMap',function ($scope,$http,$state,$stateParams,$timeout,district) {
        let vm=this;
        $(function(){
            $(window).scroll(function() {
                let s = $(window).scrollTop();
                if(s>265){
                   $('.letter_row').addClass('fixedRow')
                }else{
                    $('.letter_row').removeClass('fixedRow');
                }
            });
        });
        //该页面隐藏导航条
        sessionStorage.setItem('hideNav',true);
        vm.clearInput=function(){
            vm.searchInput='';
        };
        console.log(vm.letters);
        vm.cityData=district.cityByLetter();
        vm.letters=Object.keys(vm.cityData);
        vm.cities=Object.values(vm.cityData);
        console.log(vm.letters);
        console.log(vm.cities);
        vm.newCityArr=[];
        for(let i=0;i<vm.cities.length;i++){
            vm.newCityArr[i]=[];
            vm.newCityArr[i].push({
                key: vm.letters[i],
                value: vm.cities[i]
            });
        }
        vm.march=sessionStorage.getItem('cityMapResult');
        vm.checkSearch=function(x){
            for(let i=0;i<vm.cities.length;i++){
                for(let j=0;j<vm.cities[i].length;j++){
                    if(vm.cities[i][j]===x){
                        vm.march=x;
                        sessionStorage.setItem('cityMapResult',x);
                        console.log(x)
                    }
                }
            }

        };
        vm.getCity=function(e){
            sessionStorage.setItem('city',e);
            sessionStorage.removeItem('hideNav');
            history.back();
        };
        console.log(vm.newCityArr);
        vm.jump=function(x){
            // window.location.hash="#footer_bottom";
            window.location.hash='#'+x;
        };
    });