'use strict';
angular.module('myApp')
    .controller('resumeManage',function ($http,$state,$scope,$stateParams,orderBy,eduList,expList,arrival,jobType,common,modalBox) {
        let vm=this;
        let data={};
        vm.resumeType=parseInt($stateParams.resumeType)||0;
        vm.params=$stateParams;
        // 获取行业类型接口
        if(!jobType){
            common.request('Boss/show_jobtype_list',data).then(function callback(res){
                vm.typeList = res.data.data;
                sessionStorage.setItem('jobType',JSON.stringify(vm.typeList));
            });
        }else{
            vm.typeList=jobType;
        }
        // 获取到岗列表接口
        if(!arrival){
            common.request('Boss/come_job_list',data).then(function callback(res){
                vm.comeJobList = res.data.data;
                sessionStorage.setItem('arrival',JSON.stringify(vm.comeJobList));
            });
        }else{
            vm.comeJobList=arrival
        }
        // 获取工作经验列表接口
        if(!expList){
            common.request('Boss/show_job_years',data).then(function callback(res){
                vm.expbList = res.data.data;
                sessionStorage.setItem('expList',JSON.stringify(vm.expbList));
            })
        }else{
            vm.expbList=expList;
        }
        // 获取学历列表接口
        if(!eduList){
            common.request('Boss/show_education_list',data).then(function callback(res){
                vm.eduList = res.data.data;
                sessionStorage.setItem('eduList',JSON.stringify(vm.eduList));
            });
        }else{
            vm.eduList=eduList;
        }
        //正序倒序排列
        vm.orderBy=orderBy;
        vm.select=orderBy[0];
        vm.range=function(e){
           vm.boolean=Boolean(e);
            vm.select=e===0?orderBy[0]:orderBy[1]
        };
        $scope.$on('ngRepeatFinished2', function () {
            //tab切换效果
            let opts0=$('.position').find('.opt0');
            let opts1=$('.demand').find('.opt1');
            let idx0=parseInt(vm.params.type0)||0;
            let idx1=parseInt(vm.params.type1)||0;
            for(let i=0;i<opts0.length;i++){
                if(idx0===i){
                    opts0.eq(i).css({
                        'color': '#fff',
                        'background':'#31BEFF'
                    })
                }
            }
            for(let i=0;i<opts1.length;i++){
                if(idx1===i){
                    opts1.eq(i).css({
                        'color': '#fff',
                        'background':'#31BEFF'
                    })
                }
            }

        });
        if(!vm.filterData){
            // 获取全部简历接口
            common.request('Boss/show_resumelist', data).then(function callback(res) {
                vm.cardData = res.data.data;
                console.log(res);
                console.log(vm.cardData)
            });
        }
        vm.jobFilter=function(){
            // $state.go(current,{
            //
            // })
            vm.filterData={
                // jobType:
            };
            common.request('Boss/show_resumelist', filterData).then(function callback(res) {
                vm.cardData = res.data.data;
                console.log(res);
                console.log(vm.cardData)
            });
        };
        // 邀请面试按钮接口
        vm.companyjob=function(id){
            let url6 ='Boss/resume_interview';
            var data6={r_id:id};
            common.request(url6,data6).then(function callback(res){
                vm.eduList = res.data.msg;
                modalBox.confirm(vm.eduList);
            });
        }
    });
























