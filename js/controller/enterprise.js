'use strict';
angular.module('myApp')
    .controller('enterprise',function ($scope,$http,$state,$stateParams,common,modalBox,$timeout,listsRequest) {
        let vm=this;
        vm.params=$stateParams;
        console.log(vm.params);
        vm.nav=parseInt(vm.params.nav0)||0;
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
        vm.idx0=vm.params.idx00;
        vm.idx1=vm.params.idx01;
        vm.idx2=vm.params.idx02;
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
            let choice0=$('.choice0 span');
            let choice1=$('.choice1 span');
            let choice2=$('.choice2 span');
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
                    'border': '3px solid #c30c30',
                    'color': '#c30c30'
                })
            }else{
                $('.typeSelect').css({
                    'border': '3px solid #000',
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
                    'border': '3px solid #c30c30',
                    'color': '#c30c30'
                })
            }else{
                $('.natureSelect').css({
                    'border': '3px solid #000',
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
        if(!vm.params.boon0){
            $('.boonIgnore').css({
                'background': '#f61111',
                'color': '#fff'
            })
        }
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
    });