'use strict';

angular.module('myApp')
    .controller('HeadhuntDetailCtrl',function ($http,$state,$stateParams,common,$timeout,modalBox) {
       let vm =this;
        vm.getPosition
        //猎头职位详情
        common.request('Boss/money_job_detail',{j_id:$stateParams.id}).then(function callback(res){
            if(res.data.code===200){
                vm.huntDetail=res.data.data;
                console.log("猎头详情：",vm.huntDetail)
            }
            else if(res.data.code===201){
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


        vm.getPosition = function (param) {
            if(param==1){
                var urls='Boss/find_job';
            }else if(param==2){
                var urls = 'Boss/show_money_job'
            }else if(param==3){
                var urls = 'Boss/new_job'
            }
            common.request(urls,{}).then(function callback(res){
                if(res.data.code===200){
                    vm.Data = res.data.data;
                    console.log("信息列表：",vm.Data)
                }
            })
        }
        vm.getPosition(1);
        // // 精英推荐信息列表
            common.request("boss/recommend_resume",{}).then(function callback(res){
                if(res.data.code===200){
                    vm.recommendData = res.data.data;
                    // console.log("悬赏招聘：",vm.huntData)
                }
            })



        //猎头详情职位导航被选中高亮显示
        $(document).ready(function(){
            $('.work-position-l').eq(0).addClass('work-position-active').siblings().removeClass('work-position-active');
            $('.work-position-l').click(function(){
                var i = $(this).index();
                $('.work-position-l').eq(i).addClass('work-position-active').siblings().removeClass('work-position-active');
            });
        });
    });