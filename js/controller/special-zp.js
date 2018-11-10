'use strict';
angular.module('myApp')
    .controller('SpecialZp',function ($http,$state,$stateParams,common,modalBox) {
        let vm=this;
        let url='show_recruit_list';
        let dataEmpty={};
        common.request(url,dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.recruitList=res.data.data;
                // sessionStorage.setItem('homeMenu',JSON.stringify(res.data.data))
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });

        // 获取专职招聘列表
        let url1='boss/show_recruit_list';
        common.request(url1,dataEmpty).then(function callback(res){
            vm.dataList =res.data.data
        });
    });