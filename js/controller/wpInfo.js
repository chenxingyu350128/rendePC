'use strict';

angular.module('myApp')
    .controller('wpInfo',function ($http,$stateParams,$state,common) {
        var vm =this;
        let url='boss/show_news';
        let data={};
        console.log($stateParams);
        vm.page=data['page']=$stateParams.page||1;
        data['city']=sessionStorage.getItem('city');
        common.request(url,data).then(function callback(res){
            vm.dataList=res.data.data[0].data;
            vm.total=res.data.data[1];
            vm.size=res.data.data[0].per_page;
        });
    });
