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
        vm.nav=parseInt($stateParams.nav)||0;
        vm.like = like;
        let data={};
        if(vm.nav){
            data= {complete:1};
        }
        common.request('Boss/company_job_list',data).then(function callback(res){
            if(res.data.code===200){
                vm.position = res.data.data;
                sessionStorage.setItem('position',JSON.stringify(vm.position));
                console.log(vm.position)
                vm.position.forEach(function (v) {
                    like(v);
                })
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

        function like(info) {
            common.request('Boss/show_resume_like',{j_id:info.id}).then(function callback(res){
                if(res.data.code===200){
                    vm.like = res.data.data;
                    info.get_resume=vm.like.get_resume;
                    info.likejob=vm.like.likejob;
                }
        })
        }
        //修改职位
        vm.modify=function(x,y){
            $state.go('releasePosition',{
                j_id: x,
                index: y
            })
        };
        //完成招聘
        vm.finish =function (id) {
            common.request('Boss/del_job',{j_id:id}).then(function callback(res) {
                if (res.data.code === 200) {
                    modalBox.alert(res.data.msg)
                    history.go(0)
                }
            })
        }
        //分享职位
        vm.show = function () {
            modalBox.alert("该功能暂未开通")
        }
        //刷新职位
        vm.updata = function () {
           history.go(0)
        }
    });