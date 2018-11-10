'use strict';
angular.module('myApp')
    .controller('WorkCtrl',function ($http,$state,$stateParams,common,modalBox) {
        let vm=this;
        console.log($stateParams);
        vm.keyword=$stateParams.find;
        let url='Boss/find_job';
        let data={find:vm.keyword};
        common.request(url,data).then(function callback(res){
            console.log(res);
            if(res.data.code===200){
                if(res.data.data.length){
                    vm.searchResult=res.data.data;
                }
                else{
                    modalBox.alert('该关键词无搜索结果，请重试')
                }
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });
    });