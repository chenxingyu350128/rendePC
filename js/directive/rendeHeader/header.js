'use strict';

app.directive('rendeHeader',function ($http,$state,$stateParams,$timeout,provinceAndCities,common,modalBox,homeMenu,enterHome){
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/rendeHeader/header.html',
        scope: {

        },
        link: function (scope) {

            scope.client=1;//0代表客户端1代表企业端
            scope.username='陈奕迅';
            scope.signIf=JSON.parse(sessionStorage.getItem('signSuccess'));
            let url0='boss/network_menu';
            let url1='Boss/show_menu_two';
            let data={};
            //客户端homeMenu，企业端enterHome菜单栏
            if(!homeMenu){
                console.log('请求获取homeMenu');
                common.request(url0,data).then(function callback(res){
                    if(res.data.code===200){
                        scope.homeMenu=res.data.data;
                        sessionStorage.setItem('homeMenu',JSON.stringify(scope.homeMenu));
                    }
                    else if(res.data.code===201){
                        modalBox.alert(res.data.msg,function(){
                            sessionStorage.removeItem('signSuccess');
                            $timeout(function(){
                                $state.go('signPage',{login:1})
                            },300)
                        });
                    }
                    else{
                        modalBox.alert(res.data.msg)
                    }
                });
            }else{
                scope.homeMenu=homeMenu;
            } // 企业端homeMenu
            if(!enterHome){
                console.log('请求获取homeMenu');
                common.request(url1,data).then(function callback(res){
                    if(res.data.code===200){
                        scope.enterHome=res.data.data;
                        sessionStorage.setItem('enterHome',JSON.stringify(scope.enterHome));
                    }
                    else if(res.data.code===201){
                        modalBox.alert(res.data.msg,function(){
                            sessionStorage.removeItem('signSuccess');
                            $timeout(function(){
                                $state.go('signPage',{login:1})
                            },300)
                        });
                    }
                    else{
                        modalBox.alert(res.data.msg)
                    }
                });
            }else{
                scope.enterHome=enterHome;
            }
            //nav跳转效果
            scope.nav0=function(e){
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
            scope.nav1=function(e){
                switch (e){
                    case 1:
                        $state.go('enterpriseHome');
                        break;
                    case 2:
                        $state.go('resumeManage');
                        break;
                    case 3:
                        $state.go('positionManage');
                        break;
                    case 4:
                        $state.go('searchTalent');
                        break;
                    case 5:
                        $state.go('accountManage');
                        break;
                    case 6:
                        $state.go('superPosition');
                        break;
                }
                sessionStorage.setItem('mainNav1',e)
            };
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
                    'border-bottom':'5px solid plum',
                });
            });
            //地区选择
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