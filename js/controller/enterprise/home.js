'use strict';
angular.module('myApp')
    .controller('enterpriseHome',function ($http,$state,common,modalBox) {
        var vm=this;
        //搜索栏
        vm.search=function(e){
            if(e){
                $state.go('resumeManage',{
                    resumeType: 3,
                    keyword: e
                });
                sessionStorage.setItem('mainNav1',2);
            }
            else{
                modalBox.alert('请输入关键词');
            }
        };
        vm.companyjob=companyjob;//邀请面试
        // 获取收到简历接口
        let url1 ='Boss/show_resumelist';
        var data1= {interview: ''};
        common.request(url1,data1).then(function callback(res){
            vm.cardData = res.data.data;
        })
        // 获取收到面试简历接口
        let url2 ='Boss/show_resumelist';
        var data2= {interview: '1'};
        common.request(url2,data2).then(function callback(res){
            vm.faceData = res.data.data;
        })

        // 获取收到简历接口
        let url3 ='Boss/all_resume';
        var data3= {}
        common.request(url3,data3).then(function callback(res){
            vm.otherData = res.data.data;
            // console.log("其他职位：",vm.otherData )
        }),function errorCallback(response) {};

        //获取公司信息接口
        let url4 ='Boss/show_company';
        var data4= {}
        common.request(url4,data4).then(function callback(res){
            vm.company = res.data.data;
            // console.log("查看公司信息：",vm.company )
        }),function errorCallback(response) {
            console.log(re)
        };

        // 邀请面试按钮接口
        function companyjob(id){
            let url6 ='Boss/resume_interview';
            var data6={r_id:id}
            common.request(url6,data6).then(function callback(res){
                console.log(res)
                vm.eduList = res.data.msg;
                modalBox.alert(vm.eduList);
            }),function errorCallback(response) {
            };
        }

    });