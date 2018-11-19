'use strict';
angular.module('myApp')
    .controller('positionManageCtrl',function ($http,$state,$stateParams,common,$timeout,modalBox) {
        let vm=this;
        //搜索栏
        vm.search=function(e){
            if(e){
                $state.go('resumeManage',{
                    resumeType: 3,
                    keyword: e
                },{reload:true});
                sessionStorage.setItem('mainNav1',2);
            }
            else{
                modalBox.alert('请输入关键词');
            }
        };
        vm.client=sessionStorage.getItem('client');
        vm.nav=parseInt($stateParams.nav);
        let data={};
        if(vm.nav){
            data= {complete:1};
        }
        // vm.positionList=function (e) {
        //     console.log(e);
        //     if(e==1){
        //         vm.data= {};
        //         get(data)
        //     }else if(e==2){
        //
        //         get(data)
        //     }
        // };
        common.request('Boss/company_job_list',data).then(function callback(res){
            if(res.data.code===200){
                vm.position = res.data.data;
                sessionStorage.setItem('position',JSON.stringify(vm.position));
                console.log(vm.position)
            }
            else if(res.data.code===201){
                modalBox.alert('未注册，登录已过期');
                $timeout(function(){
                    $state.go('sign',{sign:1})
                },1000)
            } else if(res.data.code===404){
                modalBox.alert(res.data.msg)
            }
        });

        // //导航被选中高亮显示
        // $(document).ready(function(){
        //     $('.work-position-l').eq(0).addClass('manage-active').siblings().removeClass('manage-active');
        //     $('.work-position-l').click(function(){
        //         var i = $(this).index();
        //         $('.work-position-l').eq(i).addClass('manage-active').siblings().removeClass('manage-active');
        //     });
        //     positionList(1)
        // });
        //



        vm.modify=function(x,y){
            $state.go('releasePosition',{
                j_id: x,
                index: y
            })
        };

    });