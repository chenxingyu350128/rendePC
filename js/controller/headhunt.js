'use strict';

angular.module('myApp')
    .controller('HeadhuntCtrl',function ($http,$state,common,modalBox,$timeout) {
        var vm=this;
        let huntdata={};
        // 悬赏招聘
        common.request('Boss/show_money_job',huntdata).then(function callback(res){
            if(res.data.code===200){
                vm.huntData = res.data.data;
                // console.log("悬赏招聘：",vm.huntData)
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
        })

        // 职位推荐
        common.request("Boss/new_job",huntdata).then(function callback(res){
            vm.newJob = res.data.data;
            // console.log("推荐职位：",vm.newJob)
        })

        //猎头服务
        common.request("Boss/recommend_money_user",huntdata).then(function callback(res){
            vm.recommend = res.data.data;
            console.log("猎头服务：",vm.recommend)
        })
    });