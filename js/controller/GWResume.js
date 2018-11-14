'use strict';

angular.module('myApp')
    .controller('GWResume',function ($http,$state,common,modalBox,$timeout,$stateParams) {
        let vm=this;
        //查看普工招聘详情
        common.request('Boss/work_detail',{w_id:$stateParams.id}).then(function callback(res){
            if(res.data.code===200){
                vm.workDetail=res.data.data;
                console.log(vm.workDetail)
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
        });

        //删除普工招聘
        vm.delect = function(id) {
            common.request('Boss/del_work', {w_id: id}).then(function callback(res) {
                modalBox.alert("普工职位已删除")
                history.go(-1);
            });
        }
    });