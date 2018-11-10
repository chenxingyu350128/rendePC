'use strict';
angular.module('myApp')
    .controller('enterpriseInfo',function ($http,$state,$stateParams,common) {
        let vm=this;
        vm.id=$stateParams.id;
        vm.joblist=joblist;
        vm.follow=follow;

        //点击关注
        vm.concernText="关注";
        vm.concern =true;
        function follow() {
            vm.concern=!vm.concern
            if (vm.concern==false){
                vm.concernText="已关注"
            } else if (vm.concern == true) {
                vm.concernText="关注"
            }
        }

        //查看公司信息
        let url='boss/look_company';
        var data={c_id:vm.id}
        common.request(url,data).then(function callback(res){
            vm.dataList =res.data.data
            console.log("查看公司信息：",vm.dataList)
            vm.boonarr =JSON.parse(vm.dataList.boonarr)
            joblist(vm.dataList.uid)
        });

        //查看公司岗位信息
        function joblist(id){
            console.log(id)
            let url1 ='Boss/company_job_list';
            var data1={company_uid:id}
            common.request(url1,data1).then(function callback(res){
                vm.jobList =res.data.data;
                vm.boonarr={};
                vm.jobList.forEach(function (v) {
                    vm.boonarr=JSON.parse(v.boonarr)
                    v.boonarrs =vm.boonarr
                })
                console.log("查看公司岗位信息：",vm.jobList)
            });
        }


        //页面跳转
        vm.enterprise=function () {
            $state.go('enterprise')
        };
        vm.signIn=function () {
            $state.go('signPage',{login:true})
        };
        vm.signUp=function () {
            $state.go('signPage',{sign:true})
        };
        vm.companyInfo=function () {
            $state.go('companyInfo')
        };

    });