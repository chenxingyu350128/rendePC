angular.module('myApp')
    .controller('HuntPositionCtrl',function ($http,$state) {
        //猎头职位导航被选中高亮显示
        $(document).ready(function(){
            $('.work-position-l').eq(0).addClass('work-position-active').siblings().removeClass('work-position-active');
            $('.work-position-l').click(function(){
                var i = $(this).index();
                $('.work-position-l').eq(i).addClass('work-position-active').siblings().removeClass('work-position-active');
            });
        });
    });