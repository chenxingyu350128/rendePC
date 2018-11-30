'use strict';
angular.module('myApp')
    .controller('proxyCtrl',function ($scope,$http,$state,$timeout,listsRequest,common,modalBox) {
        let vm=this;
        // $scope.sidebar=sidebar;
        // 各种用到的通用列表
        vm.lists=listsRequest.lists();
        vm.jobType=vm.lists.devJobType;
        vm.innerType=vm.lists.innerType;
        vm.hotSearch=vm.lists.hotSearch;
        vm.banner=vm.lists.bannerList;
        $scope.$on('ngRepeatFinished2', function () {
            //轮播图repeat完成后
            $('.carousel-inner div').eq(0).addClass('active');
            vm.mouseEnter=function(e,index){
                vm.typeDetail=vm.innerType[e-1];
                vm.cateIdx=e-1;
                vm.showCates=true;
                vm.typeIdx=index+1;
                vm.top={
                    'top': index*40 + 'px',
                    'transform': 'translate(0,'+'-'+(index*8)+'px)'
                };
                $('.type').removeClass('hoveredType');
                $('.type').eq(index).addClass('hoveredType');
                let a=$('.type img');
                for(let i=0;i<a.length;i++){
                    a.eq(i).attr('src',"image/icon/icon"+(i+1)+".png");
                }
                a.eq(index).attr('src',"image/iconhover/icon"+(index+1)+".png");
            };
            vm.indexLeave=function(index){
                vm.typeIdx=index+1;
                let wait=$('.types').hasClass('hoveredType');
            };
            vm.mouseLeave=function(index){
                vm.showCates=false;
                $('.type').removeClass('hoveredType');
                // var a=index+1;
                // vm.img="image/icon/icon"+a+".png";
                // $(".changeImg")[index].src = vm.img;
            };
            vm.category=function(e){

            };
        });



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

        //热搜
        common.request('other/hot_search', {}).then(function callback(res) {
            if (res.data.code === 200) {
                vm.hotSearch = res.data.data;
            }
            else if (res.data.code === 201) {
                vm.hotSearch ='';
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
            else if (res.data.code === 404) {
                vm.hotSearch ='';
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
        });
    });