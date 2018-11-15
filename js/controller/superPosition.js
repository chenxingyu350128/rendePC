'use strict';
angular.module('myApp')
    .controller('superPosition',function ($http,$state,$timeout,$scope,$stateParams,listsRequest,orderBy,common,modalBox) {
        let vm=this;
        vm.mask=true;//遮罩
        let data={};
        //选择tab(收到的投递，全部，邀请面试)
        vm.params=$stateParams;
        console.log($stateParams);
        // 将页面上的数据绑定到$stateParams
        vm.resumeType=parseInt(vm.params.resumeType)||0;
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
            idx: vm.params.idx,
            interview: vm.params.interview,
            resumeType: vm.resumeType
        };
        vm.postData={
            job_type: vm.params.job_type,
            come_job: vm.params.come_job,
            sex: vm.params.sex,
            education: vm.params.education,
            years: vm.params.years,
            interview: vm.params.interview
        };
        //tabSwitch
        vm.tabSwitch=function(e){
            if(e===2){
                vm.postData['interview']=vm.filterData['interview']='hello';
            }
            vm.filterData['resumeType']=e;
            console.log('数值：',vm.filterData);
            $state.go('resumeManage',vm.filterData,{reload:true});
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
                //选择行业
                vm.postData['job_type']=vm.filterData['job_type']=e;
                vm.filterData['idx']=idx;
                console.log(vm.filterData);
                $state.go('resumeManage',vm.filterData,{reload:true});
            };
        });
        //学历筛选
        vm.eduFilter=function(e){
            console.log(e);
            vm.postData['education']=vm.filterData['education']=e;
            $state.go('resumeManage',vm.filterData,{reload:true});
        };//工作经验筛选
        vm.expFilter=function(e){
            console.log(e);
            vm.postData['years']=vm.filterData['years']=e;
            $state.go('resumeManage',vm.filterData,{reload:true});
        };//性别筛选
        vm.sexFilter=function(e){
            console.log(e);
            vm.postData['sex']=vm.filterData['sex']=e;
            $state.go('resumeManage',vm.filterData,{reload:true});
        };//到岗时间筛选
        vm.arrival=function(e){
            console.log(e);
            vm.postData['come_job']=vm.filterData['come_job']=e;
            $state.go('resumeManage',vm.filterData,{reload:true});
        };
        // 获取简历接口(全部简历/收到的简历)
        common.request('Boss/show_resumelist',vm.postData).then(function callback(res) {
            if(res.data.code===200){
                vm.cardData = res.data.data;
                console.log(res);
            }else if(res.data.code===201){
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
//**************************获取各个列表************************
        // 获取行业类型接口
        vm.lists=listsRequest.lists();
        vm.typeList=vm.lists.jobType;
        vm.comeJobList=vm.lists.arrival;
        vm.expList=vm.lists.expList;
        vm.eduList=vm.lists.eduList;
        //清空行业选项
        vm.clearMatch=function(){
            vm.filterData={
                job_type: '',
                come_job: '',
                sex: '',
                education: '',
                years: '',
                idx: '',
                interview: ''
            };
            $state.go('resumeManage',vm.filterData,{reload:true});
        };
        // 邀请面试按钮接口
        vm.inviteFace=function(id){
            let data={r_id:id};
            common.request('Boss/resume_interview',data).then(function callback(res){
                console.log(res);
                if(res.data.code===200){
                    modalBox.alert(res.data.msg);
                    $timeout(function(){
                        $state.go('resumeManage',vm.filterData,{reload:true})
                    },300)
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
        };
        vm.ifSuper=function(){
            if(vm.mask){
                $('.theMask').show();
                $('.tobeSuper').show();
                console.log('mask');
            }
        };
        $('.theMask').on('click',function () {
            $('.theMask').hide();
            $('.tobeSuper').hide();
        })
    });
























