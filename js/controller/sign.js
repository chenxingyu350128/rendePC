'use strict';

angular.module('myApp')
    .controller('signCtrl',function ($http,$state,$stateParams,common,modalBox) {
        console.log($stateParams);
        let vm=this;
        vm.choice=parseInt($stateParams.choice)||0;// 0登录 1注册
        console.log(vm.choice);
        vm.clientId=parseInt($stateParams.clientId)||1;
        vm.method=parseInt($stateParams.method)||2;
        let nav=$('.navSign');
        let method=$('.navLogin');
        nav.eq(vm.clientId-1).css({
            'border-bottom':'2px solid #f00',
            'color': '#000',
            'font-weight': '600'
        });
        method.eq(vm.method-2).css({
            'border-bottom':'2px solid #f00',
            'color': '#000',
            'font-weight': '600'
        });
        vm.getECode=function(){
            let data={phone:vm.phone,typeid:vm.clientId};
            common.request('reg/reg',data).then(function callback(res){
                console.log(res);
                if(res.data.code===200){
                    vm.signSuccess=true;
                    vm.success=res.data.data;
                    sessionStorage.setItem('uid',JSON.stringify(vm.success.uid));
                    sessionStorage.setItem('token',JSON.stringify(vm.success.token));
                    sessionStorage.setItem('client',vm.success.typeid);
                    sessionStorage.setItem('phone',JSON.stringify(vm.phone));
                    switch(parseInt(vm.success.typeid)){
                        case 1:
                        case 2:
                            $state.go('home');
                            break;
                        case 3:
                            $state.go('enterpriseHome');
                            break;
                    }
                }
                else if(res.data.code===404){
                    modalBox.alert(res.msg)
                }
            });
        };
        //切换登录方式
        vm.loginMethod=2;
        vm.codeLogin=function () {
            vm.loginMethod=1;
        };
        vm.msgLogin=function () {
            vm.loginMethod=2;
        };
    });