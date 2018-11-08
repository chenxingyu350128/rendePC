'use strict';

app.directive('rendeHeader',function ($http,$state,$stateParams,provinceAndCities){
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/rendeHeader/header.html',
        scope: {

        },
        link: function (scope) {
            scope.client=1;//2代表客户端1代表企业端
            scope.username='陈奕迅xiansheng';
            scope.sign=false;//表示已经登陆
            console.log($stateParams);
            console.log('scope.cliet=',scope.client);
            let navList0=$('.nav').find('.navItem0');
            let navList=$('.nav').find('.navItem');
            console.log(navList);
            console.log(navList0);
            let idx=parseInt($stateParams['position'])||1;
            let idx0=parseInt($stateParams['position0'])||1;
            if(idx){
                console.log('idx');
                navList.eq(idx-1).css({
                    'border-bottom':'5px solid #e11c19'
                });
            }
            if(idx0){
                console.log('idx0');
                navList0.eq(idx0-1).css({
                    'border-bottom':'5px solid #31beef'
                });
            }
            console.log(scope.client);
            scope.placeBtn=function(){
                scope.changePlace=true;
            };
            scope.hole_country=provinceAndCities;
            // document.getElementById('chooseCity').onkeydown=function(e){
            //     console.log(e)
            // };

            $(".rightClick1").on('click',function(){
                let distant1= sessionStorage.getItem('distant1')||0;
                if(distant1<2000){
                    distant1=parseInt(distant1)+100;
                }
                else{
                    distant1=2000;
                }
                sessionStorage.setItem('distant1',distant1);
                $(this).parent().parent().scrollLeft(distant1);
                console.log(distant1)
            });
            $(".leftClick1").on('click',function(){
                let distant1= sessionStorage.getItem('distant1')||0;
                if(distant1>2000){
                    distant1=parseInt(distant1)-100;
                }
                else{
                    distant1=0;
                }
                sessionStorage.setItem('distant1',distant1);
                $(this).parent().parent().scrollLeft(distant1);
                console.log(distant1)
            });
            $(".rightClick2").on('click',function(){
                let distant2= sessionStorage.getItem('distant2')||0;
                distant2=parseInt(distant2)+100;
                sessionStorage.setItem('distant2',distant2);
                $(this).parent().parent().scrollLeft(distant2);
                console.log($(this).parent().parent().css("width"));
                console.log($(this).parent().parent().scrollLeft);
                console.log(distant2)
            });
            $(".leftClick2").on('click',function(){
                let distant2= sessionStorage.getItem('distant2')||0;
                if(distant2>100){
                    distant2=parseInt(distant2)-100;
                }
                else{
                    distant2=0;
                }
                sessionStorage.setItem('distant2',distant2);
                $(this).parent().parent().scrollLeft(distant2);
                console.log(distant2)
            });
            scope.cities=scope.hole_country[0].cities;
            scope.chooseProvince=function (idx) {
                console.log(idx);
                scope.cities=scope.hole_country[idx].cities;
                console.log(scope.cities)
            };
            scope.chooseCity=function () {
                scope.changePlace=false;
                sessionStorage.removeItem('distant1');
                sessionStorage.removeItem('distant2');
                $(this).parent().scrollLeft(0);
            };
        }
    }
});