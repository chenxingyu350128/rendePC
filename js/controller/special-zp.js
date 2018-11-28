'use strict';
angular.module('myApp')
    .controller('SpecialZp',function ($http,$scope,$state,$stateParams,common,modalBox,listsRequest) {
        let vm=this;
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