'use strict';

angular.module('myApp')
    .controller('HomeCtrl',function ($http,$state,$timeout,$scope,$stateParams,jobType,bannerImg,hotSearch,common,modalBox) {
        let vm=this;
        let dataEmpty={};
        $scope.$on('ngRepeatFinished2', function () {
            //轮播图repeat完成后
           $('.carousel-inner div').eq(0).addClass('active');
        });
        // 工作类型列表
        if(!jobType){
            common.request('Boss/show_jobtype_list',dataEmpty).then(function callback(res){
                if(res.data.code===200){
                    vm.jobType=res.data.data;
                    sessionStorage.setItem('jobType',JSON.stringify(res.data.data))
                }
                else if(res.data.code===201){
                    modalBox.alert('未注册或登录已过期');
                    $timeout(function(){
                        $state.go('sign',{sign:1})
                    },1000)
                }
                else if(res.data.code===404){
                    modalBox.alert(res.data.msg)
                }
            });
        }else{
            vm.jobType=jobType;
        }//资讯列表
        common.request('Boss/show_news',dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.newsList=res.data.data;
                console.log(res.data.data);
                // sessionStorage.setItem('homeMenu',JSON.stringify(res.data.data))
            }
            else if(res.data.code===201){
                modalBox.alert('未注册，登录已过期')
                $timeout(function(){
                    $state.go('sign',{sign:1})
                },1000)
            }
            else if(res.data.code===404){
                modalBox.alert('home2')
            }
        });//热门搜索
        if(!hotSearch){
            common.request('other/hot_search',dataEmpty).then(function callback(res){
                if(res.data.code===200){
                    vm.hotSearch=res.data.data;
                    sessionStorage.setItem('hotSearch',JSON.stringify(res.data.data))
                }
                else if(res.data.code===201){
                    modalBox.alert('未注册或登录已过期');
                    $timeout(function(){
                        $state.go('sign',{sign:1})
                    },1000)
                }
                else if(res.data.code===404){
                    modalBox.alert(res.data.msg)
                }
            });
        }else{
            vm.hotSearch=hotSearch;
        }
        //banner轮播图
        if(!bannerImg){
            common.request('Boss/show_banner',dataEmpty).then(function callback(res){
                if(res.data.code===200){
                    vm.banner=res.data.data;
                    sessionStorage.setItem('bannerImg',JSON.stringify(vm.banner));
                }
                else if(res.data.code===201){
                    modalBox.alert('未注册，登录已过期');
                    $timeout(function(){
                        $state.go('sign',{sign:1})
                    },1000)
                }
                else if(res.data.code===404){
                    modalBox.alert(res.data.msg)
                }
            });
        }else{
            vm.banner=bannerImg;
        }
        //福利待遇列表
        if(!boon){
            common.request('Boss/show_banner',dataEmpty).then(function callback(res){
                if(res.data.code===200){
                    vm.boon=res.data.data;
                    sessionStorage.setItem('boon',JSON.stringify(vm.boon));
                }
                else if(resvm.boon.data.code===201){
                    modalBox.alert('未注册，登录已过期');
                    $timeout(function(){
                        $state.go('sign',{sign:1})
                    },1000)
                }
                else if(res.data.code===404){
                    modalBox.alert(res.data.msg)
                }
            });
        }else{
            vm.boon=boon;
        }

        //名企招聘
        common.request('boss/show_company_recruit',dataEmpty).then(function callback(res){
            if(res.data.code===200){
                for(let i=0;i<res.data.data.length;i++){
                    res.data.data[i].boonarr=JSON.parse(res.data.data[i].boonarr);
                }
                vm.famousEnter=res.data.data;
            }
            else if(res.data.code===201){
                modalBox.alert('未注册/登录已过期');
                $timeout(function(){
                    $state.go('sign',{sign:1});
                    sessionStorage.removeItem('token')
                },1000)
            }
            else if(res.data.code===404){
                modalBox.alert('home5')
            }
        });
        //人才推荐-所有的简历
        common.request('boss/all_resume',dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.allResume=res.data.data;
            }
            else if(res.data.code===201){
                modalBox.alert('未注册/登录已过期');
                $timeout(function(){
                    $state.go('sign',{sign:1});
                    sessionStorage.removeItem('token')
                },1000)
            }
            else if(res.data.code===404){
                console.log(res);
                modalBox.alert('home5')
            }
        });
        // 设置描点不失效
        $('.toTop').on('click',function () {
           window.location.hash="#header_top";
        });
        $('.qrCode_home').on('mouseover',function () {
            $('.QRImg').show();
        }).on('mouseout',function () {
            $('.QRImg').hide();
        });
        $('.toBottom').on('click',function () {
            window.location.hash="#footer_bottom";
        })
    });