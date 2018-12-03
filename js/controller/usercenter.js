'use strict';
angular.module('myApp')
    .controller('userCenter',function ($scope,$http,$state,$sce,$stateParams,$timeout,listsRequest,common,modalBox) {
        let vm=this;
        // 获取工作列表接口
        common.request('boss/new_job',{}).then(function callback(res){
            if(res.data.code===200){
                vm.dataList = res.data.data;
                console.log(vm.dataList)
            }
            else if(res.data.code===201){
                $timeout(function(){
                    $state.go('sign',{sign:1})
                },1000)
            }
            else if(res.data.code===404){
                modalBox.alert(res.data.msg)
            }
        })


        //投递简历
        $scope.$on('ngRepeatFinished2', function () {
            //repeat完成后
            vm.throw= function(id,index){
                console.log(index)
                common.request('user/throw_resume',{j_id:id}).then(function callback(res){
                    if(res.data.code==200){
                        $(".position-btn").eq(index).text("已投递");
                        $timeout(function(){
                            modalBox.alert(res.data.msg);
                        },200)
                    }
                    else  if(res.data.code==404){
                        modalBox.alert(res.data.msg);
                    }
                });
            }
        });

        // 获取用户信息
        common.request('user/get_userinfo',{}).then(function callback(res) {
            vm.baseList = res.data.data
            console.log("{userinfo}",vm.userList)
        })
        //获取用户简历简历
        common.request('user/show_resume',{}).then(function callback(res) {
            vm.userList = res.data.data
        })

        // 用户端查看发出简历 和被邀请
        common.request('Boss/user_resume_num',{}).then(function callback(res) {
            vm.cardData=res.data.data
            console.log("{resume_list}",res.data.data)
        })
    })