'use strict';
angular.module('myApp')
    .controller('enterprise',function ($scope,$http,$state,$stateParams,common,modalBox,$timeout,listsRequest) {
        let vm=this;
        vm.params=$stateParams;
        console.log(vm.params);
        vm.nav=vm.params.nav||0;
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
        //获取$stateParams值
        vm.selectedType=vm.params.selectedType;
        vm.selectedNature=vm.params.selectedNature;
        vm.idx0=vm.params.idx0;
        vm.idx1=vm.params.idx1;
        let url='';
        if(!vm.nav){
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
            $state.go('enterprise',paramsData,{reload:true})
        };
        vm.clearType=function(){
            paramsData['jobType']='';
            paramsData['selectedType']='';
            paramsData['idx0']=0;
            $state.go('enterprise',paramsData,{reload:true})
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
        $scope.$on('ngRepeatFinished', function () {
            //repeat完成后
            let choice0=$('.choice0');
            let choice1=$('.choice1');
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