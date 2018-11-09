'use strict';

angular.module('myApp')
    .controller('signCtrl',function ($http,$state,$stateParams) {
        console.log($stateParams);
        let vm=this;
        vm.loginMethod=1;
        vm.toSign=parseInt($stateParams.sign);
        vm.toLogin=parseInt($stateParams.login);
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
    });