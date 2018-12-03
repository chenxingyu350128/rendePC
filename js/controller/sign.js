'use strict';

angular.module('myApp')
    .controller('signCtrl',function ($http,$state,$stateParams,common,modalBox) {
        let vm=this;
        let modalAlert=sessionStorage.getItem('modalAlert');
        vm.choice=parseInt($stateParams.choice)||0;// 0登录 1注册
        vm.clientId=parseInt($stateParams.clientId)||1;
        console.log($stateParams)
        vm.method=parseInt($stateParams.method)||1;
        let nav=$('.navSign');
        let method=$('.navLogin');
        nav.eq(vm.clientId-1).css({
            'border-bottom':'4px solid #1C1291',
            'color': '#000',
            'font-weight': '600'
        });
        method.eq(vm.method-1).css({
            'border-bottom':'4px solid #1C1291',
            'color': '#000',
            'font-weight': '600'
        });

        vm.loginInfo={
            phone:'',
            password:''
        }
        vm.login=function(e){
            vm.status = $("input[type=radio]:checked").val();
            let loginData={phone:e.phone,password:e.password,status:vm.status}
            common.request('reg/login',loginData).then(function callback(res){
                if(res.data.code===200){
                    modalBox.alert(res.data.msg)
                    sessionStorage.removeItem('modalAlert');
                    vm.success=res.data.data;
                    // sessionStorage.setItem('uid',JSON.stringify(vm.success.uid));
                    // sessionStorage.setItem('token',JSON.stringify(vm.success.token));
                    sessionStorage.setItem('client',vm.success.status);
                    sessionStorage.setItem('phone',JSON.stringify(vm.phone));
                    if(vm.success.status==1){
                        $state.go('home');
                    }else if(vm.success.status==''){
                        $state.go('enterpriseHome');
                    }
                }else if(res.data.code===404){
                    modalBox.alert(res.data.msg +"账号或密码错误")
                }
            });
        }

        // 用户注册
        vm.registInfo={
            phone:'',
            password:'',
            password2:'',
            typeid:'',
            code:''
        }
        vm.getECode=function(e){
            vm.agree = $("input[type=checkbox]:checked").val();
            console.log(vm.agree);
            let data={phone:e.phone,typeid:vm.clientId,password:e.password,code:e.code};
            if(e.phone==''||e.password2==''||e.password==''){
                modalBox.alert("请输入完整注册信息");
            }else if(e.password!=e.password2){
                modalBox.alert("重复密码错误!")
            }
            else if(vm.agree==undefined){
               modalBox.alert("注册前请阅读并同意用户注册协议!")
            }
            else {
                    common.request('reg/reg',data).then(function callback(res){
                        console.log(res);
                        if(res.data.code===200){
                            sessionStorage.removeItem('modalAlert');
                            modalBox.alert(res.data.msg);
                            vm.success=res.data.data;
                            sessionStorage.setItem('uid',JSON.stringify(vm.success.uid));
                            sessionStorage.setItem('token',JSON.stringify(vm.success.token));
                            sessionStorage.setItem('client',vm.success.typeid);
                            sessionStorage.setItem('phone',JSON.stringify(e.phone));
                            switch(parseInt(vm.success.typeid)){
                                case 1:
                                    // case 2:
                                    $state.go('home');
                                    break;
                                case 2:
                                    $state.go('enterpriseHome');
                                    break;
                            }
                        }
                        else if(res.data.code===202) {
                            modalBox.alert(res);
                        }
                    });
                }
        };


        //切换登录方式
        vm.loginMethod==2;
        vm.codeLogin=function () {
            vm.loginMethod=1;
        };
        vm.msgLogin=function () {
            vm.loginMethod=2;
        };

    });