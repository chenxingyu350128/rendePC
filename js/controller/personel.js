'use strict';

angular.module('myApp')
    .controller('PersonelCtrl',function ($http,$state,common,$timeout,modalBox,listsRequest,client,nickName) {
        console.log("{用户类型：}",client);
        var vm=this;
        let url='boss/all_resume';
        let data={};
        // 获取人才简历列表接口
        common.request(url,data).then(function callback(res){
            if(res.data.code===200){
                vm.dataList = res.data.data;
                nickName.getNickname(vm.dataList);
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

        //推荐人才
        common.request('boss/recommend_resume',{}).then(function callback(res){
            vm.recommendResume=res.data.data;
            nickName.getNickname(vm.recommendResume)
            // console.log("推荐人才：",vm.recommendResume)
        })

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
        vm.lists=listsRequest.lists();
        vm.typeList=vm.lists.jobType;
        vm.show_boonList=vm.lists.boonList;
        vm.comeJobList=vm.lists.arrival;
        console.log(vm.comeJobList)
        vm.expbList=vm.lists.expList;
        vm.eduList=vm.lists.eduList;
        vm.boon=vm.lists.boonList;
    });