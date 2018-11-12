'use strict';
angular.module('myApp')
    .controller('GWorkerCtrl',function ($http,$state,$stateParams,common,modalBox,$timeout) {
        let vm=this;
        vm.nav=1;
        vm.type=$stateParams.type||1;
        let url='boss/show_work';
        vm.pickNav=pickNav;
        vm.change=change;
        vm.pickNav(vm.nav);
        function pickNav(e){
            vm.nav=(e===1)?1:2;
            if(e==1){
                let data1={types:1};
                common.request(url,data1).then(function callback(res){
                    if(res.data.code===200){
                        vm.dataList = res.data.data;
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
                let data2={types:1,time:1};
                common.request(url,data2).then(function callback(res){
                    if(res.data.code===200){
                        vm.dataList = res.data.data;
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

        // 获取行业类型接口
        let url2 ='Boss/show_jobtype_list';
        var data ={};
        common.request(url2,data).then(function callback(res){
            vm.typeList = res.data.data;
            // console.log('行业类型回调数据：',vm.typeList)
        }),function errorCallback(response) {
        };

        function change(e) {
            // console.log("【下拉框选择】：",e)
        }
    });