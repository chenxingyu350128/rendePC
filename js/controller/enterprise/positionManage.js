'use strict';
angular.module('myApp')
    .controller('positionManageCtrl',function ($http,$state) {
        var vm=this;
        vm.client=sessionStorage.getItem('client');
        //导航被选中高亮显示
        $(document).ready(function(){
            $('.work-position-l').eq(0).addClass('manage-active').siblings().removeClass('manage-active');
            $('.work-position-l').click(function(){
                var i = $(this).index();
                $('.work-position-l').eq(i).addClass('manage-active').siblings().removeClass('manage-active');
            });
        });
    });