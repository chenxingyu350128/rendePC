'use strict';
angular.module('myApp')
    .controller('TopicDetail',function ($http,$state,$stateParams,common) {
        let vm=this;
        // 获取普工简历列表接口
        let url='boss/recruit_company';
        let data={};
        common.request(url,data).then(function callback(res){
            vm.dataList = res.data.data;
            console.log(vm.dataList)
        }),function errorCallback(response) {
            // console.log(response)
        };

    });