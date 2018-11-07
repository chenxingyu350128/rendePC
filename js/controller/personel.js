'use strict';

angular.module('myApp')
    .controller('PersonelCtrl',function ($http,$state) {

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