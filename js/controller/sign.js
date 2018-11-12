'use strict';

angular.module('myApp')
    .controller('signCtrl',function ($http,$state,$stateParams,common,modalBox) {
        console.log($stateParams);
        let vm=this;
        vm.getECode=function(){
            let url='reg/reg';
            // console.log(vm.mobile);
            let data={phone:'13799772639'};
            // 工作类型
            common.request(url,data).then(function callback(res){
                console.log(res);
                if(res.data.code===200){
                    vm.success=res.data.data;
                    vm.clientType=1;
                    sessionStorage.setItem('uid',JSON.stringify(vm.success.uid));
                    sessionStorage.setItem('token',JSON.stringify(vm.success.token));
                   // if(vm.clientType===1){
                   //     $state.go('enterpriseHome');
                   //     sessionStorage.setItem('mainNav1','1');
                   // }
                    history.back();
                }
                else if(res.data.code===404){
                    modalBox.alert(res.msg)
                }
            });
        };

        vm.loginMethod=1;
        vm.toSign=parseInt($stateParams.sign);
        vm.toLogin=parseInt($stateParams.login);
        vm.codeLogin=function () {
            vm.loginMethod=1;
        };
        vm.msgLogin=function () {
            vm.loginMethod=2;
        };
    });