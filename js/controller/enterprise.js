'use strict';
angular.module('myApp')
    .controller('enterprise',function ($http,$state,common,modalBox,jobType) {
        let vm=this;
        vm.nav=1;
        var data={};
        vm.pickNav = pickNav;

        vm.pickNav(1);

        function pickNav(e){
            vm.nav=(e===1)?1:2;
            //获取企业列表接口
            if(e==1){
                let url='boss/company_list';
                common.request(url,data).then(function callback(res){
                    vm.dataList =res.data.data
                    vm.boonarr={};
                    vm.dataList.forEach(function (v) {
                        vm.boonarr=JSON.parse(v.boonarr)
                        v.boonarrs =vm.boonarr
                    })
                    console.log(vm.dataList)
                });
            }
            else if(e==2){
                //名企招聘
                let url1='user/show_company_recruit';
                common.request(url1,data).then(function callback(res){
                    vm.dataList =res.data.data
                    vm.boonarr={};
                    vm.dataList.forEach(function (v) {
                        vm.boonarr=JSON.parse(v.boonarr)
                        v.boonarrs =vm.boonarr
                    })
                });
            }
        };

        // 获取行业类型接口
        vm.typeList = jobType;

        // 获取福利待遇接口
        let url3 ='Boss/show_boon';
        common.request(url3,data).then(function callback(res){
            if(res.data.code===200){
                vm.show_boonList = res.data.data
            }
            else if(res.data.code===201){
                modalBox.alert('未注册或登录已过期');
                $timeout(function(){
                    $state.go('sign',{sign:1})
                },1000)
            }
            else if(res.data.code===404){
                modalBox.alert(res.data.msg)
            }
        })

        //获取公司规模接口
        let url4='boss/show_job_size';
        common.request(url4,data).then(function callback(res){
            vm.sizeList = res.data.data
        }),function errorCallback(response) {
        };

        // 页面跳转
        vm.homePage=function(){
            $state.go('home')
        };
        vm.store=function () {
            $state.go('store')
        };
        let navList=$('.nav').find('div').eq(2);
        navList.css({
            'border-bottom':'5px solid #e11c19'
        })


    });