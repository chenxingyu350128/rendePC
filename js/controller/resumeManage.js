'use strict';
angular.module('myApp')
    .controller('resumeManage',function ($http,$state,$scope,$stateParams,orderBy,eduList,expList,arrival,jobType,common,modalBox) {
        let vm=this;
        let data={};
        vm.resumeType=parseInt($stateParams.resumeType)||0;
        vm.params=$stateParams;
        console.log($stateParams);
        // 将页面上的数据绑定到$stateParams
        vm.education=vm.params.education;
        vm.exp=vm.params.years;
        vm.sex=vm.params.sex;
        vm.idx=vm.params.idx||0;
        vm.filterData={
            job_type: vm.params.job_type,
            come_job: vm.params.come_job,
            sex: vm.params.sex,
            education: vm.params.education,
            years: vm.params.years,
            idx: vm.params.idx
        };
        //正序倒序排列
        vm.orderBy=orderBy;
        vm.select=orderBy[0];
        vm.range=function(e){
            vm.boolean=Boolean(e);
            switch(e){
                case 0:
                    vm.select=orderBy[1];
                    break;
                case 1:
                    vm.select=orderBy[2];
                    break;
            }
        };
        //ng-repeat事件结束后（否则无法获取该区域dom节点）
        $scope.$on('ngRepeatFinished2', function () {
            //tab切换效果
            let opts0=$('.position').find('.opt0');
            let opts1=$('.demand').find('.opt1');
            //默认选择第一个
            opts0.eq(vm.idx).css({
                'color': '#fff',
                'background':'#31BEFF'
            });
            //行业选项
            vm.jobTypeFilter=function(e,idx){
                console.log('repeatEnd');
                console.log(e);
                //清除第一个的样式
                opts0.eq(0).css({
                    'color': '#000',
                    'background':'#fff'
                });
                //由idx决定样式变化
                console.log(opts0.length);
                opts0.eq(idx).css({
                    'color': '#fff',
                    'background':'#31BEFF'
                });
                // for(let i=0;i<opts0.length;i++){
                //     if(idx-1===i){
                //
                //     }
                // }
                //选择行业
                vm.filterData['job_type']=e;
                vm.filterData['idx']=idx;
                console.log(vm.filterData);
                $state.go('resumeManage',vm.filterData,{reload:true});
            };
        });
        //学历筛选
        vm.eduFilter=function(e){
            console.log(e);
            vm.filterData['education']=e;
            $state.go('resumeManage',vm.filterData,{reload:true});
        };//工作经验筛选
        vm.expFilter=function(e){
            console.log(e);
            vm.filterData['years']=e;
            $state.go('resumeManage',vm.filterData,{reload:true});
        };//性别筛选
        vm.sexFilter=function(e){
            console.log(e);
            vm.filterData['sex']=e;
            $state.go('resumeManage',vm.filterData,{reload:true});
        };//到岗时间筛选
        vm.arrival=function(e){
            console.log(e);
            vm.filterData['come_job']=e;
            $state.go('resumeManage',vm.filterData,{reload:true});
        };
        // 获取简历接口
        common.request('Boss/show_resumelist',vm.filterData).then(function callback(res) {
            vm.cardData = res.data.data;
            console.log(res);
            console.log(vm.cardData)
        });
//**************************获取各个列表************************
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
       //清空行业选项
        vm.clearMatch=function(){
            vm.filterData={
                job_type: '',
                come_job: '',
                sex: '',
                education: '',
                years: ''
            };
            $state.go('resumeManage',vm.filterData,{reload:true});
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
























