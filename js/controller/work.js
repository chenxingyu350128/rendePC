'use strict';
angular.module('myApp')
    .controller('WorkCtrl',function ($http,$state,$stateParams,common,modalBox) {
        let vm=this;
        // console.log($stateParams);
        vm.keyword=$stateParams.find;
        let url='Boss/find_job';
        let data1={find:vm.keyword};
        common.request(url,data1).then(function callback(res){
            console.log(res);
            if(res.data.code===200){
                if(res.data.data.length){
                    vm.searchResult=res.data.data;
                }
                else{
                    modalBox.alert('该关键词无搜索结果，请重试')
                }
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });


        let data={};
        vm.a=1;
        vm.type =type;
        type(vm.a);
        function type(e){
            console.log(e);
            vm.a=e;
            console.log(vm.a)
            if(e==1){
                let url1='boss/find_job';
                // 获取工作列表接口
                common.request(url1,data).then(function callback(res){
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
                //获取最新职位
                let url4 ='Boss/new_job';
                common.request(url4,data).then(function callback(res){
                    vm.dataList = res.data.data
                }),function errorCallback(response) {
                };
            }
        }




        // 获取行业类型接口
        let url2 ='Boss/show_jobtype_list';
        common.request(url2,data).then(function callback(res){
            vm.typeList = res.data.data
        }),function errorCallback(response) {
        };

        // 获取福利待遇接口
        let url3 ='Boss/show_boon';
        common.request(url3,data).then(function callback(res){
            vm.show_boonList = res.data.data
        }),function errorCallback(response) {
        };
        // 获取到岗列表接口
        let url4 ='Boss/come_job_list';
        common.request(url4,data).then(function callback(res){
            vm.comeJobList = res.data.data;
        }),function errorCallback(response) {
        };

        // 获取工作经验列表接口
        let url5 ='Boss/show_job_years';
        common.request(url5,data).then(function callback(res){
            vm.expbList = res.data.data;
            console.log("show_job_years",   vm.expbList)
        }),function errorCallback(response) {
        };
        // 获取学历列表接口
        let url6 ='Boss/show_education_list';
        common.request(url6,data).then(function callback(res){
            vm.eduList = res.data.data;
        }),function errorCallback(response) {
        };


        //导航被选中高亮显示
        $(document).ready(function(){
            $('.work-position-l').eq(0).addClass('work-position-active').siblings().removeClass('work-position-active');
            $('.work-position-l').click(function(){
                var i = $(this).index();
                $('.work-position-l').eq(i).addClass('work-position-active').siblings().removeClass('work-position-active');
            });
        });


    });