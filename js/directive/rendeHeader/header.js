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
            scope.sign=true;//表示已经登陆
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
            let prclickRight=0;
            let ctclickRight=0;
            scope.provinceMoreL=function(){
                let currentMarginL=$('.province').css('marginLeft');
                console.log(currentMarginL);
                if(currentMarginL != "-1800px"){
                    prclickRight++;
                    let mL=-100*prclickRight;
                    $('.province').css({
                        'margin-left': mL+"px"
                    });
                }
            };
            scope.provinceMoreR=function(){
                let MarginL=$('.province').css('marginLeft');
                if(MarginL != "0px"){
                    prclickRight--;
                    let mL=-100*prclickRight;
                    $('.province').css({
                        'margin-left': mL+"px"
                    });
                }
            };
            //城市选择左右按钮
            scope.cityMoreL=function(){
                let MarginL=$(this).siblings().css('margin-left');
                console.log(MarginL);
                if(MarginL != "-1800px"){
                    ctclickRight++;
                    let mL=-100*ctclickRight;
                    $('.cities').css({
                        'margin-left': mL+"px"
                    });
                }
            };
            scope.cityMoreR=function(){
                let currentMarginL=$(this).siblings().css('margin-left');
                if(currentMarginL != "0px"){
                    ctclickRight--;
                    let mL=-100*ctclickRight;
                    $('.cities').css({
                        'margin-left': mL+"px"
                    });
                }
            };
            // 默认province//选择province
            scope.cities=scope.hole_country[0].cities;
            scope.chooseProvince=function (idx) {
                console.log(idx);
                scope.cities=scope.hole_country[idx].cities;
                console.log(scope.cities)
            };
            scope.chooseCity=function () {
                scope.changePlace=false;
            };
        }
    }
});