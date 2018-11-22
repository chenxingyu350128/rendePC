'use strict';

angular.module('myApp')
    .controller('HomeCtrl',function ($http,$state,$timeout,$scope,$stateParams,dynamic,listsRequest,common,modalBox) {
        let vm=this;
        vm.showKey=function(){
            console.log(vm.keyword)
        };
        let dataEmpty={};
        dataEmpty['city']=sessionStorage.getItem('city');
        $scope.$on('ngRepeatFinished2', function () {
            //轮播图repeat完成后
           $('.carousel-inner div').eq(0).addClass('active');
        });
        // 各种用到的通用列表
        vm.lists=listsRequest.lists();
        vm.jobType=vm.lists.devJobType;
        vm.innerType=vm.lists.innerType;
        vm.hotSearch=dynamic.getHotSearch();
        vm.banner=dynamic.getBanner();
        vm.mouseEnter=function(e){
            vm.typeDetail=vm.innerType[e-1];
            vm.cateIdx=e-1;
            console.log(vm.typeDetail);
            vm.showCates=true;
        };
        vm.mouseLeave=function(){
            vm.showCates=false;
        };
        vm.category=function(e){

        };
        // //轮播图
        common.request('Boss/show_banner', dataEmpty).then(function callback(res) {
            if (res.data.code === 200) {
                vm.banner = res.data.data;
            }
            else if (res.data.code === 201) {
                vm.banner='';
                $timeout(function () {
                    $state.go('signPage')
                }, 300);
                // modalBox.alert('未注册或登录已过期', function () {
                //
                // });
            }
            else if (res.data.code === 404) {
                vm.banner='';
                modalBox.alert(res.data.msg)
            }
        });
        //热搜
        common.request('other/hot_search', dataEmpty).then(function callback(res) {
            if (res.data.code === 200) {
                vm.hotSearch = res.data.data;
            }
            else if (res.data.code === 201) {
                vm.hotSearch ='';
                $timeout(function () {
                    $state.go('signPage')
                }, 300);
            }
            else if (res.data.code === 404) {
                vm.hotSearch ='';
                modalBox.alert(res.data.msg)
            }
        });
        //资讯列表
        common.request('Boss/show_news',dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.newsList=res.data.data;
                console.log(res.data.data);
            }
            else if(res.data.code===201){
                modalBox.alert('未注册或登录已过期',function(){
                    sessionStorage.removeItem('signSuccess');
                    $timeout(function(){
                        $state.go('signPage',{sign:1})
                    },300)
                });
            }
            else if(res.data.code===404){
                modalBox.alert(res.data.msg)
            }
        });
        //名企招聘
        common.request('boss/show_company_recruit',dataEmpty).then(function callback(res){
            if(res.data.code===200){
                for(let i=0;i<res.data.data.length;i++){
                    res.data.data[i].boonarr=JSON.parse(res.data.data[i].boonarr);
                }
                vm.famousEnter=res.data.data;
            }
            else if(res.data.code===201){
                modalBox.alert('未注册或登录已过期',function(){
                    sessionStorage.removeItem('signSuccess');
                    $timeout(function(){
                        $state.go('signPage',{sign:1})
                    },300)
                });
            }
            else if(res.data.code===404){
                modalBox.alert(res.data.msg)
            }
        });
        //人才推荐-所有的简历
        common.request('boss/all_resume',dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.allResume=res.data.data;
            }
            else if(res.data.code===201){
                modalBox.alert('未注册或登录已过期',function(){
                    sessionStorage.removeItem('signSuccess');
                    $timeout(function(){
                        $state.go('signPage',{sign:1})
                    },300)
                });
            }
            else if(res.data.code===404){
                modalBox.alert(res.data.msg)
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