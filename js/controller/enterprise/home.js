'use strict';
angular.module('myApp')
    .controller('enterpriseHome',function ($http,$state,common) {
        var vm=this;
        // 获取收到简历接口
        let url1 ='Boss/show_resumelist';
        var data1= {interview: ''};
        common.request(url1,data1).then(function callback(res){
            vm.cardData = res.data.data;
            console.log(vm.cardData )
        })
        // 获取收到面试简历接口
        let url2 ='Boss/show_resumelist';
        var data2= {interview: '1'};
        common.request(url2,data2).then(function callback(res){
            vm.faceData = res.data.data;
        })

    });