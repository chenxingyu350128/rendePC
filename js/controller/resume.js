'use strict';

angular.module('myApp')
    .controller('resumeCtrl',function ($scope,$http,$state,common,modalBox,$timeout,listsRequest,FileUploader) {
        let vm=this;
        // 图片选取
        $scope.uploadImage=function(e){
            $scope.$apply(function(){
                vm.INPUT0=e;
                vm.file0=e.files[0];
                vm.size0=vm.file0.size;
            })
        };
        //上传图片
        vm.upload=function(){
            let formData=new FormData();
            let fr=new FileReader();
            fr.readAsDataURL(vm.file0);
            formData.append('image',vm.file0);
            if(vm.size0 < 5242880 ){
                $http({
                    method: 'POST',
                    url: 'http://www.api.lendata.net/rd_api.php/index/Other/upload',
                    data: formData,
                    dataType: 'json',
                    headers: {"Content-Type": undefined},
                    uploadEventHandlers: {//upload事件监听
                        progress: function (res) {
                            vm.progress = (res.loaded/res.total)*100;
                        }
                    }
                }).then(function successCallBack(response) {
                    // scope.img= response.data.data.url;
                    console.log(response);
                    vm.resume.img=response.data.data;
                    console.log(vm.resume.img)
                })
            }
        };
        //删除图片
        vm.deleteImg=function(){
            vm.INPUT0.value='';
            vm.file0='';
            vm.size0='';
            vm.progress=0;
            vm.resume.img='';
        };
        vm.format = "yyyy-MM";
        vm.dateNow=new Date();
        vm.popup = {opened: false};
        vm.popup1 = {opened: false};
        vm.popup2 = {opened: false};
        vm.open = function () {
            vm.popup.opened = true
        };
        vm.open1 = function () {
            vm.popup1.opened = true;
        };
        vm.open2 = function () {
            vm.popup2.opened = true;
        };
        vm.baseinfo= [];
        vm.lists=listsRequest.lists();
        vm.innerType=vm.lists.innerType;
        console.log(vm.innerType);
        vm.jobType=vm.lists.jobType;
        console.log(vm.jobType);
        vm.comeJobList=vm.lists.arrival;
        vm.expbList=vm.lists.expList;
        vm.eduList=vm.lists.eduList;
        vm.natureList = vm.lists.natureList;
        vm.getType=function(e){
            for(let i=0;i<vm.jobType.length;i++){
                if(e===vm.jobType[i]){
                    vm.detailList=vm.innerType[i];
                }
            }
        };
        //查看个人简历
        common.request('user/show_resume',{}).then(function callback(res){
            console.log(res);
            if(res.data.code===200){
                console.log(res.data.data);
                vm.resume=res.data.data;
                if(vm.resume.work_history){
                    vm.resume.work_history=JSON.parse(vm.resume.work_history);
                }
                if(vm.resume.allshool){
                    vm.resume.allshool=JSON.parse(vm.resume.allshool);
                }
                for(let i=0;i<vm.jobType.length;i++){
                    if(vm.resume.f_type===vm.jobType[i]){
                        vm.detailList=vm.innerType[i];
                    }
                }
                console.log(res.data.data);
            }
            else if(res.data.code===201){
                modalBox.alert('未注册，登录已过期');
                $timeout(function(){
                    $state.go('sign')
                },1000)
            } else if(res.data.code===404){
                modalBox.alert(res.data.msg)
            }
        });

        //选择行业主类
        vm.MainType=function(e){
            console.log(typeof (e));
            console.log(e);
            for (let i=0;i<vm.jobType.length;i++){
                if(vm.jobType[i]===e){
                    console.log(i);
                    vm.typeDetail=vm.innerType[i]
                }
            }
            console.log(vm.typeDetail);
        };
        vm.commit=function (data) {
            data.work_history=JSON.stringify(data.work_history);
            data.allshool=JSON.stringify(data.allshool);
            vm.province=$("#province10 option:selected").val(); //获取选中的项
            vm.city=$("#city10 option:selected").val(); //获取选中的项
            vm.district=$("#district10 option:selected").val(); //获取选中的项
            // 修改用户信息
            $('.modal-backdrop').remove();
            common.request('user/add_change_resume',data).then(function callback(res) {
                if(res.data.code===200){
                    $state.go('.',{},{reload:true});
                    modalBox.alert('修改成功');
                }
                // modalBox.alert(res.data.msg,function(){
                //     $timeout(function(){
                //         $state.go('.',{},{reload:true});
                //     })
                // });
            })
        };
        //时间转格式函数
        vm.dateFormat=function(e){
            let year=new Date(e).getFullYear();
            let month=new Date(e).getMonth();
            console.log(year);
            console.log(month);
            return year+'.'+month
        };
        vm.work_history_add=function () {
            $('.modal-backdrop').remove();
            console.log(1212);
            vm.newStartTime=vm.dateFormat(vm.newStartTime);
            vm.newEndTime= vm.dateFormat(vm.newEndTime);
            let newWorkHistory={
                company: vm.newCompany,
                job_name: vm.newJob_name,
                startTime: vm.newStartTime,
                endTime: vm.newEndTime,
                content: vm.newContent
            };
            if(vm.resume.work_history==null){
                vm.resume.work_history=[];
            }
            vm.resume.work_history.push(newWorkHistory);
            console.log(newWorkHistory);
            console.log( vm.resume.work_history);
            // 修改用户信息
            common.request('user/add_change_resume',{work_history:JSON.stringify( vm.resume.work_history)}).then(function callback(res) {
                console.log(res.data.data);
                if(res.data.code===200){
                    $state.go('.',{},{reload:true});
                    modalBox.alert(res.data.msg)
                }
            })
        };
        vm.deleteWork=function (e) {
            // 修改用户信息
            modalBox.confirm('确定删除改内容吗？',function(){
                vm.resume.work_history.splice(e,1);
                common.request('user/add_change_resume',{work_history:JSON.stringify( vm.resume.work_history)}).then(function callback(res) {
                    if(res.data.code===200){
                        $state.go('.',{},{reload:true});
                        modalBox.alert(res.data.msg)
                    }
                })
            });

        };
        // 添加教育经历
        vm.education_history_add=function(){
            $('.modal-backdrop').remove();
            vm.eduTime=vm.dateFormat(vm.eduTime);
            // vm.eduTime=new Date().toLocaleDateString().replace('/','-').replace('/','-');
            console.log(vm.eduTime);
            let newEdu={
                time: vm.eduTime,
                School: vm.eduSchool,
                education: vm.EDU,
                major: vm.eduMajor,
            };
            if(vm.resume.allshool==null){
                vm.resume.allshool=[];
            }
            vm.resume.allshool.push(newEdu);
            console.log(vm.resume.allshool);
            // 修改用户信息
            common.request('user/add_change_resume',{allshool:JSON.stringify(vm.resume.allshool)}).then(function callback(res) {
                console.log(res.data.data);
                if(res.data.code===200){
                    $state.go('.',{},{reload:true});
                    modalBox.alert(res.data.msg);
                }
            })
        };
        vm.deleteEdu=function(e){
            modalBox.confirm('确定删除改内容吗？',function(){
                vm.resume.allshool.splice(e,1);
                common.request('user/add_change_resume',{allshool:JSON.stringify( vm.resume.allshool)}).then(function callback(res) {
                    if(res.data.code===200){
                       $state.go('.',{},{reload:true});
                        modalBox.alert(res.data.msg)
                    }
                })
            });
        };
        // $('.addExpbtn').on('click',function () {
        //     $('.addExp .editTable').show();
        // });
        // $('.addExp img').on('click',function () {
        //     $(this).parent().parent().hide()
        // });
        // $('.addExp button').on('click',function () {
        //     $(this).parent().parent().parent().hide()
        // });
        // //教育经历
        // let edu=$('.eduExp');
        // console.log(edu);
        // for(let i=0;i<edu.length;i++){
        //     edu.eq(i).on('click',function () {
        //         console.log(i);
        //         $(this).siblings().show()
        //     });
        // }
        // $('.eduResume img').on('click',function () {
        //     $(this).parent().parent().hide()
        // });
        // $('.eduResume button').on('click',function () {
        //     $(this).parent().parent().parent().hide()
        // });
        // //添加教育
        // $('.addEdu .addEduBtn').on('click',function () {
        //     console.log('add')
        //     $('.addEdu .editTable').show();
        // });
        // $('.addEdu img').on('click',function () {
        //     console.log('img')
        //     $(this).parent().parent().hide()
        // });
        // $('.addEdu button').on('click',function () {
        //     console.log('btn')
        //     $(this).parent().parent().parent().hide()
        // });
        // vm.editEval=function (info) {
        //     vm.evaluation=!vm.evaluation;
        //     common.request('user/add_change_resume',{recommend:info.recommend}).then(function callback(res) {
        //         console.log(res.data.data)
        //         if(res.data.code==200){
        //             modalBox.alert(res.data.msg)
        //         }
        //     })
        // };
        vm.evaluation=function () {
            // 修改用户信息
            $('.modal-backdrop').remove();
            common.request('user/add_change_resume',{recommend:vm.resume.recommend}).then(function callback(res) {
                console.log(res.data.data);
                if(res.data.code===200){
                    modalBox.alert(res.data.msg)
                }
            })
        };

        // 企业推荐
        common.request('boss/company_list',{}).then(function callback(res) {
            if(res.data.code==200){
                vm.companylist =res.data.data;
            }
        })



    });