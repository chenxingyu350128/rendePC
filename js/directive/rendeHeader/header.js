'use strict';

app.directive('rendeHeader',function ($http,$state,$stateParams,$timeout,common,modalBox,homeMenu,enterHome){
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/rendeHeader/header.html',
        scope: {

        },
        link: function (scope) {
            scope.city=sessionStorage.getItem('city')||'全国';
            scope.cclient=parseInt(sessionStorage.getItem('client'));
            console.log(scope.cclient);
            scope.username=JSON.parse(sessionStorage.getItem('phone'));   // 获取用户名
            switch(scope.cclient){
                case 0:
                case 1:
                case 2:
                    scope.client=0;
                    break;
                case 3:
                    scope.client=1;
            }
            //0代表客户端1代表企业端
            scope.hideNav=sessionStorage.getItem('hideNav');
            scope.showEx=false;
            console.log(scope.cclient);
            scope.showExit=function(){
                scope.showEx=!scope.showEx;
            };
            scope.Exit=function(){
                console.log('fake');
                sessionStorage.clear();
                sessionStorage.setItem('client',"0");
                $state.go('home',{},{reload:true});
            };
            let data={};
            //客户端homeMenu，企业端enterHome菜单栏
            if(!homeMenu){
                console.log('请求获取homeMenu');
                common.request('boss/network_menu',data).then(function callback(res){
                    if(res.data.code===200){
                        scope.homeMenu=res.data.data;
                        sessionStorage.setItem('homeMenu',JSON.stringify(scope.homeMenu));
                    }
                    else if(res.data.code===201){
                        modalBox.alert(res.data.msg,function(){
                            // sessionStorage.removeItem('signSuccess');
                            $timeout(function(){
                                $state.go('signPage')
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
                common.request('Boss/show_menu_two',data).then(function callback(res){
                    if(res.data.code===200){
                        scope.enterHome=res.data.data;
                        sessionStorage.setItem('enterHome',JSON.stringify(scope.enterHome));
                    }
                    else if(res.data.code===201){
                        modalBox.alert(res.data.msg,function(){
                            sessionStorage.removeItem('signSuccess');
                            $timeout(function(){
                                $state.go('signPage')
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
                //个人端
                navList0.eq(scope.idx0-1).css({
                    'border-bottom':'5px solid #fff',
                });
                // 企业端
                navList1.eq(scope.idx1-1).css({
                    'border-bottom':'5px solid #e11c19',
                });
            });

            // 用户中心显示和隐藏
            scope.mouseEnter=function(){
                scope.showCates=true;
                console.log( scope.showCates)
            };
            scope.mouseLeave=function(){
                scope.showCates=false;
                console.log( scope.showCates)
            };
        }
    }
});