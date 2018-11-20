'use strict';
angular.module('myApp')
    .controller('enterprise',function ($http,$state,common,modalBox,$timeout,listsRequest) {
        let vm=this;
        vm.params=$stateParams;
        vm.nav=vm.params.nav||0;
        let postData={};
        let paramsData={};
        // 获取福利待遇接口
        vm.lists=listsRequest.lists();
        vm.jobType=vm.lists.jobType;
        vm.otherTypes=vm.jobType.slice(6);
        vm.natureList=vm.lists.natureList;
        vm.sizeList=vm.lists.sizeList;
        vm.boonList=vm.lists.boonList;
        let url='';
        if(!vm.nav){
            url='boss/company_list';
        }
        else{
            url='boss/show_company_recruit';
        }
        vm.getJobType=function(x,idx){

        };
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