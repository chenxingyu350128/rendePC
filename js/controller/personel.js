'use strict';

angular.module('myApp')
    .controller('PersonelCtrl',function ($http,$state,common) {
        var vm=this;
        let url='boss/all_resume';
        let data={};

        // 获取人才简历列表接口
        common.request(url,data).then(function callback(res){
            vm.dataList = res.data.data
            console.log(vm.dataList)
        }),function errorCallback(response) {
        };

        // 获取行业类型接口
        let url2 ='Boss/show_jobtype_list';
        common.request(url2,data).then(function callback(res){
            vm.typeList = res.data.data
        }),function errorCallback(response) {
        };

        // 获取福利待遇接口
        let url3 ='Boss/show_boon';
        common.request(url3,data).then(function callback(res){
            vm.show_boonList = res.data.data
        }),function errorCallback(response) {
        };

        //获取公司规模接口
        let url4='boss/show_job_size';
        common.request(url4,data).then(function callback(res){
            vm.sizeList = res.data.data
        }),function errorCallback(response) {
        };

        //找人才导航被选中高亮显示
        $(document).ready(function(){
            $('.work-position-l').eq(0).addClass('work-position-active').siblings().removeClass('work-position-active');
            $('.work-position-l').click(function(){
                var i = $(this).index();
                $('.work-position-l').eq(i).addClass('work-position-active').siblings().removeClass('work-position-active');
            });
        });

        //筛选人才导航被选中高亮显示
        $(document).ready(function(){
            $('.personnel-select-li').eq(0).addClass('personnel-active').siblings().removeClass('personnel-active');
            $('.personnel-select-li').click(function(){
                var i = $(this).index();
                $('.personnel-select-li').eq(i).addClass('personnel-active').siblings().removeClass('personnel-active');
            });
        });
    });