'use strict';

angular.module('myApp')
    .controller('HomeCtrl',function ($http,$state,$timeout,$scope,$stateParams,jobType,arrival,natureList,innerType,devJobType,eduList,boon,sizeList,expList,common,modalBox,listsRequest,changed) {
        let vm=this;
        sessionStorage.setItem('mainNav',1);
        vm.showKey=function(){
            console.log(vm.keyword)
        };
        let data={};
        vm.lists=listsRequest.lists();
        vm.bannerList=changed.bannerList();
        vm.hotSearchList=changed.hotSearchList();
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
                $('.type').removeClass('hoveredType');
                $('.type').eq(index).addClass('hoveredType');
                let a=$('.type img');
                for(let i=0;i<a.length;i++){
                    a.eq(i).attr('src',"image/icon/icon"+(i+1)+".png");
                }
                // a.attr('src',"image/icon/icon"+(index+1)+".png");
                a.eq(index).attr('src',"image/iconhover/icon"+(index+1)+".png");
                console.log(a);
                // let hover=$('.type').eq(index).hasClass('hoveredType');
                //     vm.img="image/iconhover/icon"+vm.typeIdx+".png";
                // if(hover){
                //         $(".changeImg")[index].src = vm.img;
                // }
            };
            vm.indexLeave=function(index){
                // vm.showCates=false;
                vm.typeIdx=index+1;
                let wait=$('.types').hasClass('hoveredType');
                // if(!wait){
                //     vm.img="image/icon/icon"+vm.typeIdx+".png";
                //     $(".changeImg")[index].src = vm.img;
                // }
            };
            vm.mouseLeave=function(index){
                vm.showCates=false;
                $('.type').removeClass('hoveredType');
                // var a=index+1;
                // vm.img="image/icon/icon"+a+".png";
                // $(".changeImg")[index].src = vm.img;
            };
            vm.category=function(e){

            };
        });
        if (!jobType) {
            common.request('Boss/show_jobtype_list', data).then(function callback(res) {
                if (res.data.code === 200) {
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
                    vm.showAlert=true;
                    modalBox.alert('homeJobType', function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300)
                    });
                }
                else {
                    vm.showAlert=true;
                    modalBox.alert('homeJobType', function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300)
                    });
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
                    vm.boon = res.data.data;
                }
                else if (res.data.code === 201) {
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
                    }
                }
                else if (res.data.code === 404) {
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
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
                    vm.comeJobList = res.data.data;
                }
                else if (res.data.code === 201) {
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
                    }
                }
                else {
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
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
                    vm.expList = res.data.data;
                }
                else if (res.data.code === 201) {
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
                    }
                }
                else {
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
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
                    vm.mark6 = true;
                    vm.eduList = res.data.data;
                }
                else if (res.data.code === 201) {
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
                    }
                }
                else {
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
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
                    vm.natureList = res.data.data;
                }
                else if(res.data.code===201){
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
                    }
                }
                else{
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
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
                    vm.sizeList = res.data.data;
                }
                else if (res.data.code === 201) {
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
                    }
                }
                else {
                    if(!vm.showAlert){
                        vm.showAlert=!vm.showAlert;
                        modalBox.alert(res.data.msg,function () {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        })
                    }else{
                        $state.go('signPage')
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
                vm.banner = res.data.data;
            }
            else if (res.data.code === 201) {
                vm.banner='';
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
            else if (res.data.code === 404) {
                vm.banner='';
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
        });
        //热搜
        common.request('other/hot_search', data).then(function callback(res) {
            if (res.data.code === 200) {
                vm.hotSearch = res.data.data;
            }
            else if (res.data.code === 201) {
                vm.hotSearch ='';
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
            else if (res.data.code === 404) {
                vm.hotSearch ='';
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
        });
        //资讯列表
        common.request('Boss/show_news',data).then(function callback(res){
            if(res.data.code===200){
                vm.newsList=res.data.data;
                console.log(res.data.data);
            }
            else if(res.data.code===201){
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
            else if(res.data.code===404){
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
        });
        //名企招聘
        common.request('boss/show_company_recruit',data).then(function callback(res){
            if(res.data.code===200){
                for(let i=0;i<res.data.data.length;i++){
                    res.data.data[i].boonarr=JSON.parse(res.data.data[i].boonarr);
                }
                vm.famousEnter=res.data.data;
            }
            else if(res.data.code===201){
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
            else if(res.data.code===404){
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
        });
        //人才推荐-所有的简历
        common.request('boss/all_resume',data).then(function callback(res){
            if(res.data.code===200){
                vm.allResume=res.data.data;
            }
            else if(res.data.code===201){
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
                }
            }
            else if(res.data.code===404){
                if(!vm.showAlert){
                    vm.showAlert=!vm.showAlert;
                    modalBox.alert(res.data.msg,function () {
                        $timeout(function () {
                            $state.go('signPage')
                        }, 300);
                    })
                }else{
                    $state.go('signPage')
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
        })

        //赏金职位
        common.request('Boss/show_money_job',{}).then(function callback(res){
            if(res.data.code===200){
                vm.huntData = res.data.data;
                console.log("悬赏招聘：",vm.huntData);
                vm.huntData.forEach(function (v) {
                    v.area= v.address.slice(0,2);
                })
            }
        })

        // 获取工作列表接口
        common.request('boss/find_job',{}).then(function callback(res){
            if(res.data.code===200){
                vm.workList = res.data.data;
            }
        })
    });