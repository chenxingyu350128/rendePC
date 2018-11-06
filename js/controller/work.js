angular.module('myApp')
    .controller('WorkCtrl',function ($http,$state) {

        //导航被选中高亮显示
        $(document).ready(function(){
            $('.work-position-l').eq(0).addClass('work-position-active').siblings().removeClass('work-position-active');
            $('.work-position-l').click(function(){
                var i = $(this).index();
                $('.work-position-l').eq(i).addClass('work-position-active').siblings().removeClass('work-position-active');
            });
        });
        // let navList=$('.nav').find('div').eq(1);
        // navList.css({
        //     'border-bottom':'5px solid #e11c19'
        // })
    });