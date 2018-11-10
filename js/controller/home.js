'use strict';

angular.module('myApp')
    .controller('HomeCtrl',function ($http,$state,$scope,$stateParams,common,modalBox) {
        let vm=this;
        let url1='Boss/show_jobtype_list';
        let url2='Boss/show_news';
        let url3='other/hot_search';
        let url4='Boss/show_banner';
        let url5='user/show_company_recruit';
        let dataEmpty={};
        $scope.$on('ngRepeatFinished2', function () {
            //轮播图repeat完成后
           $('.carousel-inner div').eq(0).addClass('active');
        });
        // 工作类型
        common.request(url1,dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.jobType=res.data.data;
                // sessionStorage.setItem('homeMenu',JSON.stringify(res.data.data))
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });//资讯列表
        common.request(url2,dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.newsList=res.data.data;
                console.log(res.data.data);
                // sessionStorage.setItem('homeMenu',JSON.stringify(res.data.data))
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });//热门搜索
        common.request(url3,dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.hotSearch=res.data.data;
                console.log(res.data.data);
                // sessionStorage.setItem('homeMenu',JSON.stringify(res.data.data))
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });//banner轮播图
        common.request(url4,dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.banner=res.data.data;
                console.log(res.data.data);
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });//名企招聘
        common.request(url5,dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.famousEnter=res.data.data;
                console.log(res.data.data);
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });

        // 设置描点不失效
        $('.toTop').on('click',function () {
           window.location.hash="#header_top";
        });
        $('.qrCode_home').on('mouseover',function () {
            $('.QRImg').show();
        }).on('mouseout',function () {
            $('.QRImg').hide();
        });
        $('.toBottom').on('click',function () {
            window.location.hash="#footer_bottom";
        })
    });