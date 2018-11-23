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
        vm.selectedType=vm.params.selectedType;
        vm.selectedNature=vm.params.selectedNature;
        vm.selectedBoon=vm.params.selectedBoon;
        vm.idx0=vm.params.idx0||0;
        vm.idx1=vm.params.idx1||0;
        vm.idx2=vm.params.idx2||0;
        postData['jobType']=vm.params.jobType;
        postData['nature']=vm.params.nature;
        postData['size']=vm.params.size;
        let real_boon=JSON.parse(sessionStorage.getItem('boonSelected'))||[];
        console.log(real_boon);
        postData['boonarr']=JSON.stringify(vm.params.boon);
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
            paramsData['jobType']=x;
            paramsData['idx0']=idx;
            paramsData['selectedType']='';
            $state.go('enterprise',paramsData,{reload:true})
        };
        vm.getType=function(e){
            paramsData['jobType']=e;
            paramsData['selectedType']=e;
            paramsData['idx0']=undefined;
            $state.go('enterprise',paramsData,{reload:true});
        };
        vm.getSize=function(x,idx){
            paramsData['size']=x;
            paramsData['idx2']=idx;
            $state.go('enterprise',paramsData,{reload:true});
        };
        vm.clearSize=function(){
            paramsData['size']='';
            paramsData['idx2']=0;
            $state.go('enterprise',paramsData,{reload:true});
        };
        vm.clearType=function(){
            paramsData['jobType']='';
            paramsData['selectedType']='';
            paramsData['idx0']=0;
            $state.go('enterprise',paramsData,{reload:true});
        };
        //nature
        vm.getNatureType=function(x,idx){
            paramsData['nature']=x;
            paramsData['idx1']=idx;
            paramsData['selectedNature']='';
            $state.go('enterprise',paramsData,{reload:true})
        };
        vm.getNature=function(e){
            paramsData['nature']=e;
            paramsData['selectedNature']=e;
            paramsData['idx1']=undefined;
            $state.go('enterprise',paramsData,{reload:true})
        };
        vm.clearNature=function(){
            paramsData['nature']='';
            paramsData['selectedNature']='';
            paramsData['idx1']=0;
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
            sessionStorage.setItem('boonSelected',JSON.stringify(real_boon));
            console.log(real_boon);
            console.log(Array.isArray(real_boon));
            postData['boonarr']=paramsData['boon']=real_boon;
            $state.go('enterprise',paramsData,{reload:true})
        };
        //清除福利
        vm.clearBoon=function(){
            sessionStorage.removeItem('boonSelected');
            postData['boonarr']=paramsData['boon']='';
            $state.go('enterprise',paramsData,{reload:true})
        };
        $scope.$on('ngRepeatFinished', function () {
            //repeat完成后
            let choice0=$('.choice0');
            let choice1=$('.choice1');
            let choice2=$('.choice2');
            let boon=$('.choice3');
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
            }
            if(vm.idx0!==undefined){
                choice0.eq(vm.idx0).css({
                    'background': '#f00',
                    'color': '#fff'
                })
            }
            if(vm.params.selectedType){
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
            }
            if(vm.idx1!==undefined){
                choice1.eq(vm.idx1).css({
                    'background': '#f00',
                    'color': '#fff'
                })
            }
            if(vm.params.selectedNature){
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
            if(vm.idx2!==undefined){
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
                        $state.go('signPage',{login:1})
                    },300)
                });
            }
            else{
                modalBox.alert(res.data.msg)
            }
        });
    });