'use strict';

angular.module('myApp')
    .controller('WriteMassageCtrl',function ($http,$state) {
        var vm=this;
        vm.toType1 = toType1;
        vm.toType2= toType2;
        vm.toType3 = toType3;
        vm.type1=true;
        vm.type2=false;
        vm.type3=false;

        //填写资料按钮被选中高亮显示
        $(document).ready(function(){
            $('.sex-button').click(function(){
                var i = $(this).index();
                console.log(i)
                $('.sex-button').eq(i-2).addClass('write-type-message-active').siblings().removeClass('write-type-message-active');
                $('.sex-button').eq(i-2).removeClass('write-type-message-btn').siblings().addClass('write-type-message-btn');
                console.log(124)
            });
        });
        $(document).ready(function(){
            $('.statu-btn').click(function(){
                var i = $(this).index();
                $('.statu-btn').eq(i-2).addClass('write-type-message-active').siblings().removeClass('write-type-message-active');
                $('.statu-btn').eq(i-2).removeClass('write-type-message-btn').siblings().addClass('write-type-message-btn');
                console.log(124)
            });
        });
        function toType1() {
            vm.type1=true;
            vm.type2=false;
            vm.type3=false;
        }
        function toType2() {
            vm.type1=false;
            vm.type2=true;
            vm.type3=false;
        }
        function toType3() {
            vm.type1=false;
            vm.type2=false;
            vm.type3=true;
        }

    });