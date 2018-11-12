'use strict';

angular.module('myApp')
    .controller('HeadhuntCtrl',function ($http,$state,common,modalBox,$timeout) {
        var vm=this;
        let huntdata={};
        let hunturrl='Boss/show_money_job'
        common.request(hunturrl,huntdata).then(function callback(res){
            if(res.data.code===200){
                vm.huntData = res.data.data;
                console.log("悬赏招聘：",vm.huntData)
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
    });