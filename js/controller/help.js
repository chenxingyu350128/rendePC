'use strict';

angular.module('myApp')
    .controller('HelpCtrl',function ($http,$state,$stateParams,common) {
        var vm =this;
        let url =$stateParams.url;
        common.request(url,{}).then(function callback(res){
            if(res.data.code==200){
                vm.agreement=JSON.parse(res.data.data);
                $(".about-me").html(vm.agreement)
                console.log(res.data.data.content)
            }
        });

    });