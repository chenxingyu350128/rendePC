'use strict';

angular.module('myApp')
    .controller('NewDetailCtrl',function ($http,$state,$stateParams,common) {
        var vm=this;
        let id = $stateParams.id;

        //获取新闻资讯详情
        let url='boss/look_news';
        let data={n_id:id};
        common.request(url,data).then(function callback(res){
            vm.dataList =res.data.data
        });
        //获取热门新闻列表
        let url1='other/show_hot_news';
        let data1={};
        common.request(url1,data1).then(function callback(res) {
            vm.show_hot_news =res.data.data;
            console.log("热门新闻;",vm.show_hot_news)
        })
    });