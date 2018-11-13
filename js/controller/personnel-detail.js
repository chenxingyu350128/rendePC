'use strict';

angular.module('myApp')
    .controller('PersonnelDetailCtrl',function ($http,$state,$stateParams,common,modalBox) {
        let vm=this;
        vm.r_id=$stateParams.r_id;
        vm.g_id=$stateParams.g_id;
        let data={
            r_id:vm.r_id,
            g_id:vm.g_id
        };
        console.log(data);
        //人才详情
        common.request('Boss/look_resume',data).then(function(res){
            if(res.data.code===200){
                res.data.data.allshool=JSON.parse(res.data.data.allshool);
                res.data.data.work_history=JSON.parse(res.data.data.work_history);
                vm.x=res.data.data;
                console.log(vm.x)
            }
        })
    });