'use strict';
angular.module('myApp')
    .controller('accountManage',function ($http,$state,$stateParams,common,modalBox) {
        let vm=this;

        vm.commit=function(){
            let url='Boss/change_add_company';
            let data={
                name:vm.name,
                job_type:vm.job_type,
                nature: vm.nature,
                size: vm.size,
                address: vm.address,
                area: vm.area,
                mail: vm.mail,
                network: vm.network,
                introduce:vm.introduce,
                img: vm.img1,
                usiness_license: vm.img2,
            };
            common.request(url,data).then(function callback(res){
                console.log(res)
            })
        };
        vm.navType=parseInt($stateParams.navType)||0;

    });