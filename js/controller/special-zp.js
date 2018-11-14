'use strict';
angular.module('myApp')
    .controller('SpecialZp',function ($http,$state,$scope,$stateParams,common,modalBox,hotSearch,jobType,bannerImg) {
        let vm=this;
        $scope.$on('ngRepeatFinished2', function () {
            //轮播图repeat完成后
            $('.carousel-inner div').eq(0).addClass('active');
        });
        vm.hotSearch = hotSearch;
        vm.jobType = jobType;
        vm.banner = bannerImg;
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