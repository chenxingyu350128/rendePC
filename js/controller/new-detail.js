'use strict';

angular.module('myApp')
    .controller('NewDetailCtrl',function ($http,$state,$stateParams,common) {
        var vm=this;
        let id = $stateParams.id;
        let index =$stateParams.index;
  console.log("【index】",index)
        //获取新闻资讯详情
        let url='boss/look_news';
        let data={n_id:id};
        common.request(url,data).then(function callback(res){
            if(res.data.code===200){
                vm.dataList =res.data.data
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

        //获取热门新闻列表
        let url1='other/show_hot_news';
        let data1={};
        common.request(url1,data1).then(function callback(res) {
            vm.show_hot_news =res.data.data;
        })

        //获取下一篇新闻
        let url2='boss/show_news';
        common.request(url2,data).then(function callback(res){
            vm.newsList = res.data.data
            console.log("新闻列表:",vm.newsList)
           for(var i=0;i<vm.newsList.length;i++){
               if(i==index){
                   vm.nextnew=vm.newsList[i]
               }
           }
        })


    });