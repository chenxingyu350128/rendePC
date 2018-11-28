'use strict';
angular.module('myApp')
    .controller('GWDetail',function ($http,$state,$stateParams,common,modalBox,$timeout) {
        let vm=this;
        //查看普工招聘详情
        common.request('Boss/work_detail',{w_id:$stateParams.id}).then(function callback(res){
            if(res.data.code===200){
                vm.workDetail=res.data.data;
            }
            else if(res.data.code===201){
                modalBox.alert(res.data.msg,function(){
                    $timeout(function(){
                        $state.go('signPage',{login:1})
                    },300)
                });
            }
            else{
                modalBox.alert(res.data.msg)
            }
        });

        //为你推荐
        common.request('boss/recommend_work',{types:1}).then(function callback(res){
            vm.recommend=res.data.data;
            console.log("为你推荐",vm.recommend)
        });

        //刷新页面
        vm.updata = function () {
            history.go(0);
        };

        //删除普工招聘
        vm.delect = function(id){
            common.request('Boss/del_work',{w_id:id}).then(function callback(res){
                modalBox.alert("普工职位已删除")
                history.go(-1);
            });
        }



    });