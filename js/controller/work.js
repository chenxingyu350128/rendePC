'use strict';
angular.module('myApp')
    .controller('WorkCtrl',function ($http,$state,$stateParams,$timeout,listsRequest,common,modalBox) {
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
        vm.lists=listsRequest.lists();
        vm.typeList=vm.lists.jobType;
        vm.show_boonList=vm.lists.boonList;
        vm.comeJobList=vm.lists.arrival;
        vm.expbList=vm.lists.expList;
        vm.eduList=vm.lists.expList;
        //导航被选中高亮显示
        $(document).ready(function(){
            $('.work-position-l').eq(0).addClass('work-position-active').siblings().removeClass('work-position-active');
            $('.work-position-l').click(function(){
                var i = $(this).index();
                $('.work-position-l').eq(i).addClass('work-position-active').siblings().removeClass('work-position-active');
            });
        });


    });