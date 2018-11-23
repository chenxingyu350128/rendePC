'use strict';
angular.module('myApp')
    .controller('SpecialZp',function ($http,$scope,$state,$stateParams,common,modalBox,listsRequest) {
        let vm=this;
        $scope.$on('ngRepeatFinished2', function () {
            //轮播图repeat完成后
            $('.carousel-inner div').eq(0).addClass('active');
        });
        // 各种用到的通用列表
        vm.lists=listsRequest.lists();
        vm.jobType=vm.lists.devJobType;
        vm.innerType=vm.lists.innerType;
        vm.hotSearch=vm.lists.hotSearch;
        vm.banner=vm.lists.bannerList;
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
        common.request('Boss/show_banner', {}).then(function callback(res) {
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