app.directive('rendeHeader',function ($http,$state,$stateParams,provinceAndCities){
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/rendeHeader/header.html',
        scope: {
        },
        link: function (scope) {
            console.log($stateParams);
            let navList=$('.nav').find('div');
            let idx=parseInt($stateParams['position']);
            if(idx){
                navList.eq(idx-1).css({
                    'border-bottom':'5px solid #e11c19'
                });
            }
            scope.placeBtn=function(){
                scope.changePlace=true;
            };
            console.log(idx);
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