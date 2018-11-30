'use strict';
angular.module('myApp')
    .controller('collection',function ($scope,$http,$state,$stateParams,common,modalBox,$timeout) {
        let vm = this;
        vm.params=$stateParams.navType;
        vm.navType=parseInt($stateParams.navType)||0;
        console.log(vm.navType);

        if( vm.navType==0){
            var url= "user/show_throw_resume_list";
            var data={};
        }
        else  if(vm.navType==1){
            var url= "user/show_throw_resume_list";
            var data = {interview:1}
        }
        else  if(vm.navType==2){
            var url= "user/show_likejob_list";
            var data = {}
        }
        common.request(url,data).then(function callback(res) {
            if (res.data.code === 200) {
                vm.dataList = res.data.data
            } else if (res.data.code === 201) {
                modalBox.alert(res.data.msg, function () {
                    $timeout(function () {
                        $state.go('signPage')
                    }, 300)
                });
            }
        })

        // 推荐职位
        common.request("Boss/new_job",{page:1}).then(function callback(res) {
            if (res.data.code === 200) {
                vm.recommendList = res.data.data
                console.log(vm.recommendList)
            }
        })
    })