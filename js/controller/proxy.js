'use strict';
angular.module('myApp')
    .controller('proxyCtrl',function ($scope,$http,$state,listsRequest,common,modalBox) {
        let vm=this;
        // $scope.sidebar=sidebar;
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
        vm.mouseEnter=function(e,index){
            vm.typeDetail=vm.innerType[e-1];
            vm.cateIdx=e-1;
            vm.showCates=true;
            var a=index+1;
            vm.img="image/iconhover/icon"+a+".png"
            $(".changeImg")[index].src = vm.img;
        };
        vm.mouseLeave=function(index){
            vm.showCates=false;
            var a=index+1;
            vm.img="image/icon/icon"+a+".png"
            $(".changeImg")[index].src = vm.img;
        };

    //轮播图
        common.request('Boss/show_banner', {}).then(function callback(res) {
            if (res.data.code === 200) {
                vm.banner = res.data.data;
            }
            else if (res.data.code === 201) {
                vm.banner='';
                $timeout(function () {
                    $state.go('signPage')
                }, 300);
            }
            else if (res.data.code === 404) {
                vm.banner='';
                modalBox.alert(res.data.msg)
            }
        });
    });