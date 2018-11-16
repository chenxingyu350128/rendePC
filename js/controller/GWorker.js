'use strict';
angular.module('myApp')
    .controller('GWorkerCtrl',function ($http,$state,$stateParams,common,modalBox,$timeout) {
        let vm=this;
        vm.nav=1;
        vm.type=$stateParams.type||1;
        vm.pickNav=pickNav;
        vm.change=change;
        vm.pickNav(vm.nav);
        vm.getData = getData;
        function pickNav(e){
            vm.nav=(e===1)?1:2;
            if(e==1){
                let data1={types:1};
                getData(data1)
            }else if(e==2){
                let data1={types:1,time:1};
                getData(data1)
            }
        };

        function getData(data) {
            common.request('boss/show_work',data).then(function callback(res){
                if(res.data.code===200){
                    vm.dataList = res.data.data;
                }
                else if(res.data.code===201){
                    modalBox.alert(res.data.msg,function(){
                        $timeout(function(){
                            $state.go('signPage',{login:1})
                        },300)
                    });
                }
                else{
                    modalBox.alert(res.data.msg)
                }
            })
        }


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