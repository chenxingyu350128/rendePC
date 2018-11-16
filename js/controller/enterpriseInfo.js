'use strict';
angular.module('myApp')
    .controller('enterpriseInfo',function ($http,$state,$stateParams,common,$timeout,modalBox,$scope) {
        let vm=this;
        vm.id=$stateParams.id;
        vm.joblist=joblist;

    //获取公司是否关注信息
        common.request('user/likecompany_type',{c_id:vm.id}).then(function callback(res){
            if(res.data.code===200){
                vm.concernText = res.data.data;
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

        //点击修改关注状态
        vm.follow=function() {
            common.request('user/like_company',{c_id:vm.id}).then(function callback(res){
                modalBox.alert(res.data.msg);
                if(res.data.code==200){
                    $('.follow').text('已关注')
                }else if(res.data.code==404){
                    $('.follow').text('关注')
                }

            })
        }

        //查看公司信息
        let url='boss/look_company';
        var data={c_id:vm.id}
        common.request(url,data).then(function callback(res){
            vm.dataList =res.data.data
            // console.log("查看公司信息：",vm.dataList)
            vm.boonarr =JSON.parse(vm.dataList.boonarr)
            joblist(vm.dataList.uid)
        });

        //查看公司岗位信息
        function joblist(id){
            console.log(id)
            let url1 ='Boss/company_job_list';
            var data1={company_uid:id}
            common.request(url1,data1).then(function callback(res){
                vm.jobList =res.data.data;
                vm.boonarr={};
                vm.jobList.forEach(function (v) {
                    vm.boonarr=JSON.parse(v.boonarr)
                    v.boonarrs =vm.boonarr
                })
                console.log("查看公司岗位信息：",vm.jobList)
            });
        }

        //投递简历
        $scope.$on('ngRepeatFinished2', function () {
            //repeat完成后
            vm.throw= function(id,index){
                console.log(index)
                common.request('user/throw_resume',{j_id:id}).then(function callback(res){
                    $(".position-btn").eq(index).text("已投递");
                    $timeout(function(){
                        modalBox.alert(res.data.msg);
                    },200)

                });
            }
        });

        //页面跳转
        vm.enterprise=function () {
            $state.go('enterprise')
        };
        vm.signIn=function () {
            $state.go('signPage',{login:true})
        };
        vm.signUp=function () {
            $state.go('signPage',{sign:true})
        };
        vm.companyInfo=function () {
            $state.go('companyInfo')
        };

    });