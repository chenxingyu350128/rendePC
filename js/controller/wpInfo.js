'use strict';

angular.module('myApp')
    .controller('wpInfo',function ($http,$stateParams,$state,common) {
        var vm =this;
        let url='boss/show_news';
        let postData={};
        console.log($stateParams);
        postData['city']=sessionStorage.getItem('city');
        postData['page']=1;
        common.request(url,postData).then(function callback(res){
            if(res.data.code===200){
                vm.dataList=res.data.data[0].data;
                vm.total=res.data.data[1];
                postData['page']=res.data.data[0].current_page;
                if(!res.data.data[0].data.length){
                    vm.noResult=true;
                }
                $('.pageFromBase').html(vm.total);
                $(".pagination button").on("click",function(){
                    let href = $(this).attr("class");
                    common.pageRequest(postData,href).then(function callback(res){
                        console.log(postData);
                        console.log(res);
                        if(res.data.code===200){
                            console.log('YO!');
                            console.log('YO!');
                            vm.dataList=res.data.data[0].data;
                            vm.total=res.data.data[1];
                            console.log(vm.dataList);
                            $state.go('.')
                        }
                    });
                });
            }

        });
    });
