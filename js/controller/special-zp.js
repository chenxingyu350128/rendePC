'use strict';
angular.module('myApp')
    .controller('SpecialZp',function ($http,$state,$stateParams,common,modalBox) {
        let vm=this;
        let url='show_recruit_list';
        let dataEmpty={};
        common.request(url,dataEmpty).then(function callback(res){
            if(res.data.code===200){
                vm.recruitList=res.data.data;
                // sessionStorage.setItem('homeMenu',JSON.stringify(res.data.data))
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });
    });