'use strict';

angular.module('myApp')
    .controller('proxyCtrl',function ($scope,$http,$state,sidebar,listsRequest,common,modalBox) {
        let vm=this;
        $scope.sidebar=sidebar;
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
    });