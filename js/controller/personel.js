'use strict';

angular.module('myApp')
    .controller('PersonelCtrl',function ($http,$state,common,$timeout,modalBox,orderBy,eduList,expList,arrival,jobType,boon) {
        var vm=this;
        let url='boss/all_resume';
        let data={};

        // 获取人才简历列表接口
        common.request(url,data).then(function callback(res){
            if(res.data.code===200){
                vm.dataList = res.data.data
                console.log(vm.dataList)
            }
            else if(res.data.code===201){
                modalBox.alert('未注册或登录已过期',function(){
                    sessionStorage.removeItem('signSuccess');
                    $timeout(function(){
                        $state.go('signPage',{sign:1})
                    },300)
                });
            }
            else if(res.data.code===404){
                modalBox.alert(res.data.msg)
            }
        })

        common.request('user/show_resume',{}).then(function callback(res){
            console.log("查看简历信息：",res.data.data)
        })

           vm.show_boonList = jobType;
           vm.show_boonList =boon
        //找人才导航被选中高亮显示
        $(document).ready(function(){
            $('.work-position-l').eq(0).addClass('work-position-active').siblings().removeClass('work-position-active');
            $('.work-position-l').click(function(){
                var i = $(this).index();
                $('.work-position-l').eq(i).addClass('work-position-active').siblings().removeClass('work-position-active');
            });
        });

        //筛选人才导航被选中高亮显示
        $(document).ready(function(){
            $('.personnel-select-li').eq(0).addClass('personnel-active').siblings().removeClass('personnel-active');
            $('.personnel-select-li').click(function(){
                var i = $(this).index();
                $('.personnel-select-li').eq(i).addClass('personnel-active').siblings().removeClass('personnel-active');
            });
        });

        /////////////////////////////////////获取筛选条件/////////////////////////////////////////////////////////////
        // 获取行业类型接口
        if(!jobType){
            common.request('Boss/show_jobtype_list',data).then(function callback(res){
                vm.typeList = res.data.data;
                console.log(vm.typeList)
                sessionStorage.setItem('jobType',JSON.stringify(vm.typeList));
            });
        }else{
            vm.typeList=jobType;
        }
        // 获取到岗列表接口
        if(!arrival){
            common.request('Boss/come_job_list',data).then(function callback(res){
                vm.comeJobList = res.data.data;
                sessionStorage.setItem('arrival',JSON.stringify(vm.comeJobList));
            });
        }else{
            vm.comeJobList=arrival
        }
        // 获取工作经验列表接口
        if(!expList){
            common.request('Boss/show_job_years',data).then(function callback(res){
                vm.expbList = res.data.data;
                sessionStorage.setItem('expList',JSON.stringify(vm.expbList));
            })
        }else{
            vm.expbList=expList;
        }
        // 获取学历列表接口
        if(!eduList){
            common.request('Boss/show_education_list',data).then(function callback(res){
                vm.eduList = res.data.data;
                sessionStorage.setItem('eduList',JSON.stringify(vm.eduList));
            });
        }else{
            vm.eduList=eduList;
        }
        //福利待遇列表
        if(!boon){
            common.request('Boss/show_boon',data).then(function callback(res){
                vm.boon=res.data.data;
                console.log("[福利待遇：]",vm.boon)
                sessionStorage.setItem('boon',JSON.stringify(vm.boon));
            });
        }
    });