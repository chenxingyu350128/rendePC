'use strict';
angular.module('myApp')
    .controller('enterpriseHome',function ($http,$state,$scope, common,modalBox,nickName) {
        var vm=this;
        // 获取收到简历接口
        common.request('Boss/show_resumelist',{interview: ''}).then(function callback(res){
            if(res.data.code===200){
                vm.cardData = res.data.data;

            }
            else if(res.data.code===201){
                modalBox.alert('未注册或登录已过期',function(){
                    sessionStorage.removeItem('signSuccess');
                    $timeout(function(){
                        $state.go('signPage',{sign:1})
                    },300)
                });
            }
            else if(res.data.code===404){
                modalBox.alert(res.data.msg)
            }
        })
        // 获取收到面试简历接口
        common.request('Boss/show_resumelist',{interview: '1'}).then(function callback(res){
            vm.faceData = res.data.data;
        })

        // 获取公司其他职位信息
        common.request('Boss/all_resume',{}).then(function callback(res){
            vm.otherData = res.data.data;
            console.log("其他职位：",vm.otherData )
            nickName.getNickname(vm.otherData)
        })

        //获取公司信息接口
        common.request('Boss/show_company',{}).then(function callback(res){
            vm.company = res.data.data;
            // console.log("查看公司信息：",vm.company )
        })

        // 邀请面试按钮接口
        $scope.$on('ngRepeatFinished2', function () {
            //repeat完成后
           vm.companyjob= function(id,index){
                common.request('Boss/resume_interview',{r_id:id}).then(function callback(res){
                    $(".meeting").eq(index).text("已邀请");
                    $(".meeting").eq(index).css("background","red");
                    $(".meeting").eq(index).css("color","#fff");

                    modalBox.alert(res.data.msg);
                })
            }
        });



    });