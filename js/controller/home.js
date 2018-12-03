'use strict';

angular.module('myApp')
    .controller('HomeCtrl',function ($http,$state,$timeout,$scope,$stateParams,jobType,arrival,natureList,innerType,devJobType,eduList,boon,sizeList,expList,common,modalBox,listsRequest,changed) {
        let vm=this;
        let modalAlert=sessionStorage.getItem('modalAlert');
        sessionStorage.setItem('mainNav',1);
        vm.showKey=function(){
            console.log(vm.keyword)
        };
        let data={};
        vm.lists=listsRequest.lists();
        vm.bannerList=changed.bannerList();
        vm.hotSearchList=changed.hotSearchList();
        vm.position = position;
        //先运行，否则后续页面不显示
        data['city']=sessionStorage.getItem('city');
        $scope.$on('ngRepeatFinished2', function () {
            //轮播图repeat完成后
           $('.carousel-inner div').eq(0).addClass('active');
            vm.mouseEnter=function(e,index){
                vm.typeDetail=vm.innerType[e-1];
                vm.cateIdx=e-1;
                vm.showCates=true;
                vm.typeIdx=index+1;
                vm.top={
                    'top': index*40 + 'px',
                    'transform': 'translate(0,'+'-'+(index*8)+'px)'
                };
                $('.type').removeClass('hoveredType');
                $('.type').eq(index).addClass('hoveredType');
                let a=$('.type img');
                for(let i=0;i<a.length;i++){
                    a.eq(i).attr('src',"image/icon/icon"+(i+1)+".png");
                }
                a.eq(index).attr('src',"image/iconhover/icon"+(index+1)+".png");
                console.log(a);
            };
            vm.indexLeave=function(index){
                vm.typeIdx=index+1;
                let wait=$('.types').hasClass('hoveredType');
            };
            vm.mouseLeave=function(index){
                vm.showCates=false;
                $('.type').removeClass('hoveredType');
                let a=$('.type img');
                for(let i=0;i<a.length;i++){
                    a.eq(i).attr('src',"image/icon/icon"+(i+1)+".png");
                }
                // a.attr('src',"image/icon/icon"+(index+1)+".png");
                // console.log(a);
            };
        });
        if (!jobType) {
            common.request('Boss/show_jobtype_list', data).then(function callback(res) {
                if (res.data.code === 200) {
                    sessionStorage.removeItem('modalAlert');
                    vm.types = res.data.data;
                    vm.devJobType = [];
                    vm.innerType = [];
                    for (let i = 0; i < vm.types.length; i++) {
                        if (vm.types[i].fid === 0) {
                            vm.devJobType.push(vm.types[i])//完整的总类别
                        }
                    }
                    vm.eazyMainType = [];
                    for (let i = 0; i < vm.devJobType.length; i++) {
                        vm.innerType[i] = [];
                        vm.eazyMainType[i] = vm.devJobType[i].name;//只有Name的总类别
                    }
                    vm.childTypes = vm.types.slice(vm.devJobType.length);
                    for (let i = 0; i < vm.childTypes.length; i++) {
                        for (let j = 1; j < vm.devJobType.length + 1; j++) {
                            if (vm.childTypes[i].fid === j) {
                                vm.innerType[j - 1].push(vm.childTypes[i])//各个类别详细汇总
                            }
                        }
                    }
                }
                else if (res.data.code === 201) {
                   if(!modalAlert){
                        $state.go('signPage')
                    }else{
                        sessionStorage.setItem('modalAlert','damn it');
                        modalBox.alert(res.data.msg, function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300)
                        });
                    }
                }
                else if(res.data.code===202) {
                    modalBox.alert(res);
                }
                else{
                    if(!modalAlert){
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg)
                    }
                }
            });
        } else {
            vm.devJobType = devJobType;
            vm.innerType = innerType;
            vm.eazyMainType = jobType;
        }
        //福利待遇列表
        if (!boon) {
            common.request('Boss/show_boon', data).then(function callback(res) {
                if (res.data.code === 200) {
                    sessionStorage.removeItem('modalAlert');
                    vm.boon = res.data.data;
                }
                else if (res.data.code === 201) {
                   if(!modalAlert){
                        $state.go('signPage')
                    }else{
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg, function () {
                        //     $timeout(function () {
                        //         $state.go('signPage')
                        //     }, 300)
                        // });
                    }
                }
                else {
                    if(!modalAlert){
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg)
                    }
                }
            });
        } else {
            vm.boon = boon;
        }
        // 获取到岗列表接口
        if (!arrival) {
            common.request('Boss/come_job_list', data).then(function callback(res) {
                if (res.data.code === 200) {
                    sessionStorage.removeItem('modalAlert');
                    vm.comeJobList = res.data.data;
                }
                else if (res.data.code === 201) {
                   if(!modalAlert){
                        $state.go('signPage')
                    }else{
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg, function () {
                        //     $timeout(function () {
                        //         $state.go('signPage')
                        //     }, 300)
                        // });
                    }
                }
                else {
                    if(!modalAlert){
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg)
                    }
                }
            });
        } else {
            vm.comeJobList = arrival;
        }
        // 获取工作经验列表接口
        if (!expList) {
            common.request('Boss/show_job_years', data).then(function callback(res) {
                if (res.data.code === 200) {
                    sessionStorage.removeItem('modalAlert');
                    vm.expList = res.data.data;
                }
                else if (res.data.code === 201) {
                   if(!modalAlert){
                        $state.go('signPage')
                    }else{
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg, function () {
                        //     $timeout(function () {
                        //         $state.go('signPage')
                        //     }, 300)
                        // });
                    }
                }
                else {
                    if(!modalAlert){
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg)
                    }
                }
            })
        }
        else {
            vm.expList = expList;
        }
        // 获取学历列表接口
        if (!eduList) {
            common.request('Boss/show_education_list', data).then(function callback(res) {
                if (res.data.code === 200) {
                    sessionStorage.removeItem('modalAlert');
                    vm.mark6 = true;
                    vm.eduList = res.data.data;
                }
                else if (res.data.code === 201) {
                   if(!modalAlert){
                        $state.go('signPage')
                    }else{
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg, function () {
                        //     $timeout(function () {
                        //         $state.go('signPage')
                        //     }, 300)
                        // });
                    }
                }
                else {
                    if(!modalAlert){
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg)
                    }
                }

            });
        }
        else{
            vm.eduList=eduList;
        }
        // /公司性质列表
        if(!natureList){
            common.request('Boss/show_nature',data).then(function callback(res){
                if(res.data.code===200){
                    sessionStorage.removeItem('modalAlert');
                    vm.natureList = res.data.data;
                }
                else if(res.data.code===201){
                   if(!modalAlert){
                        $state.go('signPage')
                    }else{
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg, function () {
                        //     $timeout(function () {
                        //         $state.go('signPage')
                        //     }, 300)
                        // });
                    }
                }
                else{
                    if(!modalAlert){
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg)
                    }
                }

            });
        }
        else{
            vm.natureList=natureList;
        }
        //公司规模
        if (!sizeList) {
            common.request('Boss/show_job_size', data).then(function callback(res) {
                if (res.data.code === 200) {
                    sessionStorage.removeItem('modalAlert');
                    vm.sizeList = res.data.data;
                }
                else if (res.data.code === 201) {
                   if(!modalAlert){
                        $state.go('signPage')
                    }else{
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg, function () {
                        //     $timeout(function () {
                        //         $state.go('signPage')
                        //     }, 300)
                        // });
                    }
                }
                else {
                    if(!modalAlert){
                        sessionStorage.setItem('modalAlert','damn it');
                        // modalBox.alert(res.data.msg)
                    }
                }

            });
        }
        else {
            vm.sizeList = sizeList;
        }


        // //轮播图
        common.request('Boss/show_banner', data).then(function callback(res) {
            if (res.data.code === 200) {
                sessionStorage.removeItem('modalAlert');
                vm.banner = res.data.data;
            }
            else if (res.data.code === 201) {
               if(!modalAlert){
                    $state.go('signPage')
                }else{
                    sessionStorage.setItem('modalAlert','damn it');
                    // modalBox.alert(res.data.msg, function () {
                    //     $timeout(function () {
                    //         $state.go('signPage')
                    //     }, 300)
                    // });
                }
            }
            else {
                if(!modalAlert){
                    sessionStorage.setItem('modalAlert','damn it');
                    // modalBox.alert(res.data.msg)
                }
            }
        });
        //热搜
        common.request('other/hot_search', data).then(function callback(res) {
            if (res.data.code === 200) {
                sessionStorage.removeItem('modalAlert');
                vm.hotSearch = res.data.data;
            }
            else if (res.data.code === 201) {
               if(!modalAlert){
                    $state.go('signPage')
                }else{
                    sessionStorage.setItem('modalAlert','damn it');
                    // modalBox.alert(res.data.msg, function () {
                    //     $timeout(function () {
                    //         $state.go('signPage')
                    //     }, 300)
                    // });
                }
            }
            else {
                if(!modalAlert){
                    sessionStorage.setItem('modalAlert','damn it');
                    // modalBox.alert(res.data.msg)
                }
            }
        });
        //资讯列表
        common.request('Boss/show_news',{page:1}).then(function callback(res){
            if(res.data.code===200){
                sessionStorage.removeItem('modalAlert');
                vm.newsList=res.data.data[0].data;
                // vm.nextList=res.data.next_item[0].data;
            }
            else if(res.data.code===201){
               if(!modalAlert){
                    $state.go('signPage')
                }else{
                    sessionStorage.setItem('modalAlert','damn it');
                    modalBox.alert(res.data.msg, function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300)
                    });
                }
            }
            else {
                if(!modalAlert){
                    sessionStorage.setItem('modalAlert','damn it');
                    // modalBox.alert(res.data.msg)
                }
            }
        });
        //名企招聘
        common.request('boss/show_company_recruit',{page:1}).then(function callback(res){
            if(res.data.code===200){
                sessionStorage.removeItem('modalAlert');
                vm.famousEnter=res.data.data[0].data;
                console.log("名企招聘",vm.famousEnter)
                for(let i=0;i<vm.famousEnter.length;i++){
                    vm.famousEnter[i].boonarr=JSON.parse(vm.famousEnter[i].boonarr);
                    position( vm.famousEnter[i])
                }

            }
            else if(res.data.code===201){
               if(!modalAlert){
                    $state.go('signPage')
                }else{
                    sessionStorage.setItem('modalAlert','damn it');
                    // modalBox.alert(res.data.msg, function () {
                    //     $timeout(function () {
                    //         $state.go('signPage')
                    //     }, 300)
                    // });
                }
            }
            else {
                if(!modalAlert){
                    sessionStorage.setItem('modalAlert','damn it');
                    // modalBox.alert(res.data.msg)
                }
            }
        });

        // 查看公司岗位列表
        function   position(id){
            common.request('boss/company_job_list',{page:1,company_uid:id}).then(function callback(res) {
                if (res.data.code === 200) {
                    vm.position = res.data.data[0].data;

                }
            })
        }

        //人才推荐-所有的简历
        common.request('boss/all_resume',{page:1}).then(function callback(res){
            if(res.data.code===200){
                sessionStorage.removeItem('modalAlert');
                vm.allResume=res.data.data[0].data;
            }
            else if(res.data.code===201){
               if(!modalAlert){
                    $state.go('signPage')
                }else{
                    sessionStorage.setItem('modalAlert','damn it');
                    // modalBox.alert(res.data.msg, function () {
                    //     $timeout(function () {
                    //         $state.go('signPage')
                    //     }, 300)
                    // });
                }
            }
            else {
                if(!modalAlert){
                    sessionStorage.setItem('modalAlert','damn it');
                    // modalBox.alert(res.data.msg)
                }
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
        });

        //赏金职位
        common.request('Boss/show_money_job',{}).then(function callback(res){
            if(res.data.code===200){
                sessionStorage.removeItem('modalAlert');
                vm.huntData = res.data.data;
                console.log("悬赏招聘：",vm.huntData);
                vm.huntData.forEach(function (v) {
                    v.area= v.address.slice(0,2);
                })
            }
        });

        // 获取工作列表接口
        common.request('boss/find_job',{page:1}).then(function callback(res){
            if(res.data.code===200){
                sessionStorage.removeItem('modalAlert');
                vm.workList = res.data.data[0].data;
            }
        })
        // 滚动条监听事件
        window.onscroll= function(){
            //变量t是滚动条滚动时，距离顶部的距离
            var t = document.documentElement.scrollTop||document.body.scrollTop;
            var scrollup = document.getElementById('rightFix');
            //当滚动到距离顶部200px时，返回顶部的锚点显示
            if(t>=400){
                scrollup.style.display="block";
            }else{          //恢复正常
                scrollup.style.display="none";
            }
        }
    });