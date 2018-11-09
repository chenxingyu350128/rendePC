'use strict';

app.directive('rendeHeader',function ($http,$state,$stateParams,provinceAndCities,common){
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/rendeHeader/header.html',
        scope: {

        },
        link: function (scope) {
            scope.client=2;//2代表客户端1代表企业端
            scope.username='陈奕迅xiansheng';
            scope.sign=false;//表示已经登陆
            let url='network_menu';
            let data={};
            common.request(url,data).then(function callback(res){
                if(res.data.code===200){
                    scope.homeMenu=res.data.data;
                    console.log(res.data.data);
                    // sessionStorage.setItem('homeMenu',JSON.stringify(res.data.data))
                }
                else if(res.data.code===404){
                    modalBox.alert(res.msg)
                }
            });
            console.log($stateParams);
            //nav跳转
            scope.nav=function(e){
                console.log(e);
                switch (e){
                    case 1:
                        $state.go('home',{position:1});
                        break;
                    case 2:
                        $state.go('WorkCtrl',{position:2});
                        break;
                    case 3:
                        $state.go('enterprise',{position:3});
                        break;
                    case 4:
                        $state.go('personel',{position:4});
                        break;
                    case 5:
                        $state.go('recruit',{position:5});
                        break;
                    case 6:
                        $state.go('GWorker',{position:6});
                        break;
                    case 7:
                        $state.go('headHunt',{position:7});
                        break;
                    case 8:
                        $state.go('proxy',{position:8});
                        break;
                    case 9:
                        $state.go('special-zp',{position:9});
                        break;
                    case 10:
                        $state.go('WPInfo',{position:10});
                        break;
                    case 11:
                        $state.go('store',{position:11});
                        break;
                }
                // let navList0=$('.nav').find('.navItem0');

                // let idx=parseInt($stateParams['position'])||1;
                // let idx0=parseInt($stateParams['position0'])||1;
                // if(idx0){
                //     console.log('idx0');
                //     navList0.eq(idx0-1).css({
                //         'border-bottom':'5px solid #31beef'
                //     });
                // }
            };
            $(function () {
                let navList=$('.nav').find('.navItem');
                navList.eq(scope.idx-1).css({
                    'border-bottom':'5px solid #e11c19'
                });
            });
            scope.on

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