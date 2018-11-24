'use strict';

angular.module('myApp')
    .controller('HomeCtrl',function ($http,$state,$timeout,$scope,$stateParams,jobType,arrival,natureList,innerType,devJobType,eduList,boon,sizeList,expList,common,modalBox,listsRequest) {
        let vm=this;
        vm.showKey=function(){
            console.log(vm.keyword)
        };
        let data={};
        vm.lists=listsRequest.lists();
        data['city']=sessionStorage.getItem('city');
        $scope.$on('ngRepeatFinished2', function () {
            //轮播图repeat完成后
           $('.carousel-inner div').eq(0).addClass('active');
        });
        // 各种用到的通用列表
        // vm.lists=listsRequest.lists();
        // console.log(vm.lists);
        // vm.jobType=vm.lists.devJobType;
        // vm.innerType=vm.lists.innerType;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
                    // sessionStorage.setItem('jobType', JSON.stringify(vm.eazyMainType));//总分类列表（只含name）
                    // sessionStorage.setItem('devJobType', JSON.stringify(vm.devJobType));//总分类列表
                    // sessionStorage.setItem('innerType', JSON.stringify(vm.innerType));//各分类详细
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
                    // sessionStorage.setItem('boon', JSON.stringify(vm.boon));
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
                    // sessionStorage.setItem('arrival', JSON.stringify(vm.comeJobList));
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
                    // sessionStorage.setItem('expList', JSON.stringify(vm.expList));
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
                    // sessionStorage.setItem('eduList', JSON.stringify(vm.eduList));
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
                    // sessionStorage.setItem('natureList',JSON.stringify(vm.natureList));
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
                    // sessionStorage.setItem('sizeList', JSON.stringify(vm.sizeList));
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


        vm.mouseEnter=function(e){
            vm.typeDetail=vm.innerType[e-1];
            vm.cateIdx=e-1;
            console.log(vm.typeDetail);
            vm.showCates=true;
        };
        vm.mouseLeave=function(){
            vm.showCates=false;
        };
        vm.category=function(e){

        };
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
    });