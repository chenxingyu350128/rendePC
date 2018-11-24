<<<<<<< Updated upstream
'use strict';
angular.module('myApp')
    .controller('enterprise',function ($scope,$http,$state,$stateParams,common,modalBox,$timeout,listsRequest) {
        let vm=this;
        vm.params=$stateParams;
        console.log(vm.params);
        vm.nav=parseInt(vm.params.nav)||0;
        let postData={};
        let paramsData={};
        // 获取福利待遇接口
        vm.lists=listsRequest.lists();
        vm.jobType=vm.lists.jobType;
        vm.otherTypes=vm.jobType.slice(6);
        vm.natureList=vm.lists.natureList;
        vm.otherNatures=vm.natureList.slice(6);
        vm.sizeList=vm.lists.sizeList;
        vm.boonList=vm.lists.boonList;
        vm.otherBoones=vm.boonList.slice(6);
        //获取$stateParams值
        vm.selectedType=vm.params.selectedType0;
        vm.selectedNature=vm.params.selectedNature0;
        vm.selectedBoon=vm.params.selectedBoon0;
        vm.idx0=vm.params.idx00||0;
        vm.idx1=vm.params.idx01||0;
        vm.idx2=vm.params.idx02||0;
        postData['jobType']=vm.params.jobType0;
        postData['nature']=vm.params.nature0;
        postData['size']=vm.params.size0;
        let real_boon=JSON.parse(sessionStorage.getItem('boonSelected0'))||[];
        console.log(real_boon);
        postData['boonarr']=JSON.stringify(vm.params.boon0);
        if(real_boon.length){
            $('.allBoon').css({
                'background': '#fff',
                'color': '#000'
            })
        }else{
            $('.allBoon').css({
                'background': '#f00',
                'color': '#fff'
            })
        }
        let url='';
        if(vm.nav===0){
            url='boss/company_list';
        }
        else{
            url='boss/show_company_recruit';
        }

        vm.getJobType=function(x,idx){
            paramsData['jobType0']=x;
            paramsData['idx00']=idx;
            paramsData['selectedType0']='';
            $state.go('enterprise',paramsData,{reload:true})
        };
        vm.getType=function(e){
            paramsData['jobType0']=e;
            paramsData['selectedType0']=e;
            paramsData['idx00']=undefined;
            $state.go('enterprise',paramsData,{reload:true});
        };
        vm.getSize=function(x,idx){
            paramsData['size0']=x;
            paramsData['idx02']=idx;
            $state.go('enterprise',paramsData,{reload:true});
        };
        vm.clearSize=function(){
            paramsData['size0']='';
            paramsData['idx02']=0;
            $state.go('enterprise',paramsData,{reload:true});
        };
        vm.clearType=function(){
            paramsData['jobType0']='';
            paramsData['selectedType0']='';
            paramsData['idx00']=0;
            $state.go('enterprise',paramsData,{reload:true});
        };
        //nature
        vm.getNatureType=function(x,idx){
            paramsData['nature0']=x;
            paramsData['idx01']=idx;
            paramsData['selectedNature0']='';
            $state.go('enterprise',paramsData,{reload:true})
        };
        vm.getNature=function(e){
            paramsData['nature0']=e;
            paramsData['selectedNature0']=e;
            paramsData['idx01']=undefined;
            $state.go('enterprise',paramsData,{reload:true})
        };
        vm.clearNature=function(){
            paramsData['nature0']='';
            paramsData['selectedNature0']='';
            paramsData['idx01']=0;
            $state.go('enterprise',paramsData,{reload:true})
        };
        vm.getBoon=function(x){
            if(!real_boon.includes(x)){
                real_boon.push(x);
            }
            else{
                let idx=real_boon.indexOf(x);
                real_boon.splice(idx,1);
            }
            sessionStorage.setItem('boonSelected0',JSON.stringify(real_boon));
            postData['boonarr']=paramsData['boon0']=real_boon;
            $state.go('enterprise',paramsData,{reload:true})
        };
        //清除福利
        vm.clearBoon=function(){
            sessionStorage.removeItem('boonSelected0');
            postData['boonarr']=paramsData['boon0']='';
            $state.go('enterprise',paramsData,{reload:true})
        };
        $scope.$on('ngRepeatFinished', function () {
            //repeat完成后
            let choice0=$('.choice0');
            let choice1=$('.choice1');
            let choice2=$('.choice2');
            let boon=$('.choice3 span');
            let boonOnlyName=[];
            for(let i=0;i<vm.boonList.length;i++){//css点亮已选项
                boonOnlyName[i]=vm.boonList[i].name;
                for(let j=0;j<real_boon.length;j++){
                    if(boonOnlyName.includes(real_boon[j])){
                        let inBase=boonOnlyName.indexOf(real_boon[j]);
                        boon.eq(inBase).css({
                            'background': '#f00',
                            'color': '#fff'
                        })
                    }
                }
            }
            if(vm.idx0===undefined){
                $('.allType').css({
                    'background': '#fff',
                    'color': '#000'
                })
            } else{
                choice0.eq(vm.idx0).css({
                    'background': '#f00',
                    'color': '#fff'
                })
            }
            if(vm.params.selectedType0){
                $('.typeSelect').css({
                    'background': '#f00',
                    'color': '#fff'
                })
            }else{
                $('.typeSelect').css({
                    'background': '#fff',
                    'color': '#000'
                })
            }//nature
            if(vm.idx1===undefined){
                $('.allNature').css({
                    'background': '#fff',
                    'color': '#000'
                })
            } else{
                choice1.eq(vm.idx1).css({
                    'background': '#f00',
                    'color': '#fff'
                })
            }
            if(vm.params.selectedNature0){
                $('.natureSelect').css({
                    'background': '#f00',
                    'color': '#fff'
                })
            }else{
                $('.natureSelect').css({
                    'background': '#fff',
                    'color': '#000'
                })
            }
            //size
            if(vm.idx2===undefined){
                $('.allSize').css({
                    'background': '#fff',
                    'color': '#000'
                })
            }
            else{
                choice2.eq(vm.idx2).css({
                    'background': '#f00',
                    'color': '#fff'
                })
            }
        });
        //请求放最后，先选条件
        common.request(url,postData).then(function callback(res){
            if(res.data.code===200){
                if(res.data.data.length){
                    vm.dataList =res.data.data
                    for(let i=0;i<vm.dataList.length;i++){
                        vm.dataList[i].boonarr=JSON.parse(vm.dataList[i].boonarr);
                    }
                }
            }else if(res.data.code===201){
                modalBox.alert(res.data.msg,function(){
                    $timeout(function(){
                        $state.go('signPage')
                    },300)
                });
            }
            else{
                modalBox.alert(res.data.msg)
            }
        });
=======
'use strict';
angular.module('myApp')
    .controller('enterprise',function ($http,$state,common,modalBox,$timeout,listsRequest) {
        let vm=this;
        vm.lists=listsRequest.lists();
        vm.typeList=vm.lists.jobType;
        vm.show_boonList=vm.lists.boonList;
        vm.comeJobList=vm.lists.arrival;
        vm.expbList=vm.lists.expList;
        vm.eduList=vm.lists.eduList;
        vm.boon=vm.lists.boonList;
        vm.nav=1;
        var data={};
        vm.pickNav = pickNav;
        vm.pickNav(1);
        function pickNav(e){
            vm.nav=(e===1)?1:2;
            //获取企业列表接口
            if(e==1){
                let url='boss/company_list';
                common.request(url,data).then(function callback(res){
                    if(res.data.code===200){
                        if(res.data.data.length){
                            vm.dataList =res.data.data
                            vm.boonarr={};
                            vm.dataList.forEach(function (v) {
                                vm.boonarr=JSON.parse(v.boonarr)
                                v.boonarrs =vm.boonarr
                            })
                            console.log(vm.dataList)
                        }
                    }else if(res.data.code===201){
                        modalBox.alert(res.data.msg,function(){
                            $timeout(function(){
                                $state.go('signPage',{login:1})
                            },300)
                        });
                    }
                    else{
                        modalBox.alert(res.data.msg)
                    }
                });
            }
            else if(e==2){
                //名企招聘
                let url1='boss/show_company_recruit';
                common.request(url1,data).then(function callback(res){
                    vm.dataList =res.data.data
                    vm.boonarr={};
                    vm.dataList.forEach(function (v) {
                        vm.boonarr=JSON.parse(v.boonarr)
                        v.boonarrs =vm.boonarr
                    })
                });
            }
        };



        // 获取福利待遇接口
        let url3 ='Boss/show_boon';
        common.request(url3,data).then(function callback(res){
            vm.show_boonList = res.data.data
        }),function errorCallback(response) {
        };

        //获取公司规模接口
        let url4='boss/show_job_size';
        common.request(url4,data).then(function callback(res){
            vm.sizeList = res.data.data
        }),function errorCallback(response) {
        };

        // 页面跳转
        vm.homePage=function(){
            $state.go('home')
        };
        vm.store=function () {
            $state.go('store')
        };
        let navList=$('.nav').find('div').eq(2);
        navList.css({
            'border-bottom':'5px solid #e11c19'
        })


>>>>>>> Stashed changes
    });