'use strict';

angular.module('myApp')
    .controller('HomeCtrl',function ($http,$state,$scope,$stateParams,common,modalBox) {
        let vm=this;
        let url='show_jobtype_list';
        let data={};
        common.request(url,data).then(function callback(res){
            if(res.data.code===200){
                vm.jobType=res.data.data;
                console.log(res.data);
                // sessionStorage.setItem('homeMenu',JSON.stringify(res.data.data))
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });
        // $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //     //下面是在table render完成后执行的js
        //     console.log('可以吗？可以吗？')
        // });
        // $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //     //下面是在table render完成后执行的js
        //
        // });
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