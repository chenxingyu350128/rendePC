'use strict';

angular.module('myApp')
    .controller('signCtrl',function ($http,$state,$stateParams) {
        console.log($stateParams);
        let vm=this;
        vm.loginMethod=1;
        vm.signcard=$stateParams.sign;
        vm.logincard=$stateParams.login;
        vm.homePage=function(){
            $state.go('home')
        };
        vm.login=function () {
          vm.logincard=true;
          vm.signcard=false;
        };
        vm.sign=function () {
            vm.logincard=false;
            vm.signcard=true;
        };
        $(function () {
            vm.navSign=$('.navSign');
            for (let i=0;i<vm.navSign.length;i++){
                console.log(222);
                vm.navSign.eq(i).on('click',function () {
                    vm.navSign.css({
                        'color': '#ddd',
                        'border-bottom': '2px solid #b2b2b2'
                    });
                    vm.navSign.eq(i).css({
                        'color': '#000',
                        'border-bottom': '2px solid #f00'
                    })

                })
            }
            vm.navLogin=$('.navLogin');
            for (let i=0;i<vm.navLogin.length;i++){
                console.log(222);
                vm.navLogin.eq(i).on('click',function () {
                    vm.navLogin.css({
                        'color': '#ddd',
                        'border-bottom': '2px solid #b2b2b2'
                    });
                    vm.navLogin.eq(i).css({
                        'color': '#000',
                        'border-bottom': '2px solid #f00'
                    })

                })
            }
        });
        vm.codeLogin=function () {
            vm.loginMethod=1;
        };
        vm.msgLogin=function () {
            vm.loginMethod=2;
        };
        // 登录hou
    });