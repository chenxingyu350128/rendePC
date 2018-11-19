'use strict';
angular.module('myApp')
    .controller('WorkCtrl',function ($http,$state,$stateParams,$timeout,listsRequest,common,modalBox,$scope) {
        let vm=this;
        vm.keyword=$stateParams.find;
        let url='Boss/find_job';
        let data1={find:vm.keyword};
        common.request(url,data1).then(function callback(res){
            if(res.data.code===200){
                if(res.data.data.length){
                    vm.searchResult=res.data.data;
                }
                else{
                    modalBox.alert('该关键词无搜索结果，请重试')
                }
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

      //获取职位信息接口
        let data={};
        vm.a=1;
        vm.type =type;
        type(vm.a);
        function type(e){
            vm.a=e;
            console.log(vm.a)
            if(e==1){
                // 获取工作列表接口
                common.request('boss/find_job',data).then(function callback(res){
                    if(res.data.code===200){
                        vm.dataList = res.data.data;
                    }
                    else if(res.data.code===201){
                        $timeout(function(){
                            $state.go('sign',{sign:1})
                        },1000)
                    }
                    else if(res.data.code===404){
                        modalBox.alert(res.data.msg)
                    }
                })
            }else if(e==2){
                //获取最新职位
                common.request('Boss/new_job',data).then(function callback(res){
                    vm.dataList = res.data.data
                }),function errorCallback(response) {
                };
            }
        }

        //投递简历
        $scope.$on('ngRepeatFinished2', function () {
            //repeat完成后
            vm.throw= function(id,index){
                console.log(index)
                common.request('user/throw_resume',{r_id:id}).then(function callback(res){
                    $(".position-btn").eq(index).text("已投递");
                    $timeout(function(){
                        modalBox.alert(res.data.msg);
                    },200)

                });
            }
        });

        //点击查看更多是职位分类
        $(".tipRight").on('click',function(){
            let distant1= sessionStorage.getItem('distant1')||0;
            // console.log(distant1);
            // distant1=parseInt(distant1)+100;
            if(distant1<3000){
                distant1=parseInt(distant1)+100;
            }
            else{
                distant1=2000;
            }
            sessionStorage.setItem('distant1',distant1);
            $(this).parent().prev().scrollLeft(distant1);
        });

        //点击查看更多是职位分类
        $(".tipleft").on('click',function(){
            let distant1= sessionStorage.getItem('distant1')||0;
            if(distant1>2000){
                distant1=parseInt(distant1)-100;
            }
            else{
                distant1=0;
            }
            sessionStorage.setItem('distant1',distant1);
            $(this).parent().prev().scrollLeft(distant1);
        });
        vm.lists=listsRequest.lists();
        vm.typeList=vm.lists.jobType;
        vm.show_boonList=vm.lists.boonList;
        vm.comeJobList=vm.lists.arrival;
        vm.expbList=vm.lists.expList;
        vm.eduList=vm.lists.eduList;
        vm.boon=vm.lists.boonList;
        //导航被选中高亮显示
        $(document).ready(function(){
            $('.work-position-l').eq(0).addClass('work-position-active').siblings().removeClass('work-position-active');
            $('.work-position-l').click(function(){
                var i = $(this).index();
                $('.work-position-l').eq(i).addClass('work-position-active').siblings().removeClass('work-position-active');
            });
        });
    });