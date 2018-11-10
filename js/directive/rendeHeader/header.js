'use strict';

app.directive('rendeHeader',function ($http,$state,$stateParams,provinceAndCities,common){
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/rendeHeader/header.html',
        scope: {
            onFinishRenderFilters : '&'
        },
        link: function (scope) {
            scope.client=0;//0代表客户端1代表企业端
            scope.username='陈奕迅xiansheng';
            scope.sign=false;//表示已经登陆
            let url0='boss/network_menu';
            let url1='Boss/show_homemenu';
            let data={};
            //客户端homeMenu
            common.request(url0,data).then(function callback(res){
                if(res.data.code===200){
                    scope.homeMenu=res.data.data;
                    console.log(res.data.data);
                }
                else if(res.data.code===404){
                    modalBox.alert(res.msg)
                }
            });
            // 企业端homeMenu
            common.request(url1,data).then(function callback(res){
                if(res.data.code===200){
                    scope.enterHome=res.data.data;
                    console.log(res.data.data);
                }
                else if(res.data.code===404){
                    modalBox.alert(res.msg)
                }
            });
            console.log($stateParams);
            //nav跳转
            scope.nav0=function(e){
                console.log(e);
                switch (e){
                    case 1:
                        $state.go('home');
                        break;
                    case 2:
                        $state.go('WorkCtrl');
                        break;
                    case 3:
                        $state.go('enterprise');
                        break;
                    case 4:
                        $state.go('personel');
                        break;
                    case 5:
                        $state.go('recruit');
                        break;
                    case 6:
                        $state.go('GWorker');
                        break;
                    case 7:
                        $state.go('headHunt');
                        break;
                    case 8:
                        $state.go('proxy');
                        break;
                    case 9:
                        $state.go('special-zp');
                        break;
                    case 10:
                        $state.go('WPInfo');
                        break;
                    case 11:
                        $state.go('store');
                        break;
                }
                sessionStorage.setItem('mainNav',e)
            };
            // scope.nav1=function(e){
            //     console.log(e);
            //     switch (e){
            //         case 1:
            //             $state.go('enterpriseHome');
            //             break;
            //         case 2:
            //             $state.go('resumeManage');
            //             break;
            //         case 3:
            //             $state.go('positionManage');
            //             break;
            //         case 4:
            //             $state.go('searchTalent');
            //             break;
            //         case 5:
            //             $state.go('accountManage');
            //             break;
            //         case 6:
            //             $state.go('superPosition');
            //             break;
            //     }
            //     sessionStorage.setItem('mainNav1',e)
            // };
            scope.$on('ngRepeatFinished', function () {
                //下面是在render完成后执行的js
                scope.idx0=sessionStorage.getItem('mainNav')||1;
                scope.idx1=sessionStorage.getItem('mainNav1')||1;
                let navList0=$('.nav').find('.navItem');
                let navList1=$('.nav').find('.navItem0');
                navList0.eq(scope.idx0-1).css({
                    'border-bottom':'5px solid #e11c19',
                });
                navList1.eq(scope.idx1-1).css({
                    'border-bottom':'5px solid #e11c19',
                });
            });

            scope.placeBtn=function(){
                scope.changePlace=true;
            };
            scope.hole_country=provinceAndCities;
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
            });
            $(".rightClick2").on('click',function(){
                let distant2= sessionStorage.getItem('distant2')||0;
                distant2=parseInt(distant2)+100;
                sessionStorage.setItem('distant2',distant2);
                $(this).parent().parent().scrollLeft(distant2);
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
            });
            scope.cities=scope.hole_country[0].cities;
            scope.chooseProvince=function (idx) {
                scope.cities=scope.hole_country[idx].cities;
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