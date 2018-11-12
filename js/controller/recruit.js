'use strict';

angular.module('myApp')
    .controller('recruitCtrl',function ($http,$state,$stateParams,common,modalBox,$timeout) {
        let vm=this;
        vm.nav=1;
        vm.type=$stateParams.type||1;
        // console.log(vm.type);
        let url='boss/show_work';
        vm.pickNav=pickNav;
        vm.change=change;
        vm.pickNav(vm.nav);
        // 获取普工简历列表接口

       function pickNav(e){
            vm.nav=(e===1)?1:2;
            if(e==1){
                let data1={};
                common.request(url,data1).then(function callback(res){
                    if(res.data.code===200){
                        vm.cardData = res.data.data;
                    }
                    else if(res.data.code===201){
                        modalBox.alert('未注册，登录已过期');
                        $timeout(function(){
                            $state.go('sign',{sign:1})
                        },1000)
                    } else if(res.data.code===404){
                        modalBox.alert(res.data.msg)
                    }
                })
            }else if(e==2){
                let data2={time:1};
                common.request(url,data2).then(function callback(res){
                    if(res.data.code===200){
                        vm.cardData = res.data.data;
                        // console.log(vm.cardData)
                    }
                    else if(res.data.code===201){
                        modalBox.alert('未注册，登录已过期');
                        $timeout(function(){
                            $state.go('sign',{sign:1})
                        },1000)
                    } else if(res.data.code===404){
                        modalBox.alert(res.data.msg)
                    }
                })
            }
        };

       function change(e) {
           // console.log("【下拉框选择】：",e)
       }



        // 获取行业类型接口
        var data ={};
        let url2 ='Boss/show_jobtype_list';
        common.request(url2,data).then(function callback(res){
            vm.typeList = res.data.data;
            // console.log('行业类型回调数据：',vm.typeList)
        }),function errorCallback(response) {
        };

    });