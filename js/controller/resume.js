'use strict';

angular.module('myApp')
    .controller('resumeCtrl',function ($http,$state,common,modalBox,$timeout,listsRequest) {
        let vm=this;
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

        // vm.edu={
        //     "time ":'',
        //     "School ":'',
        //     "education ":'',
        //     "major ":'',
        // };
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            laydate.render({
                elem: '#starttime'
            });
            laydate.render({
                elem: '#endtime'
            });
            laydate.render({
                elem: '#edustarttime'
            });
        });
        //查看个人简历
        let x='';
        common.request('user/show_resume',{}).then(function callback(res){
            if(res.data.code===200){
                 vm.resume=res.data.data;
                 x=vm.resume;
                if(vm.resume.work_history){
                    vm.resume.work_history=JSON.parse(vm.resume.work_history);
                }
                if(vm.resume.allshool){
                    vm.resume.allshool=JSON.parse(vm.resume.allshool);
                }
               // console.log("{x}",x.address);
                // vm.work=x.work_history;

               // vm.work_historx.allshooly =JSON.parse(x.work_history);
               // vm.allshool =JSON.parse(x.allshool);
               // console.log("工作经历：",vm.work_history)
               // $('#putadress').val(x.job_address);
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
        console.log(x);
        // vm.img=x.img;
        // vm.age=x.age;
        // vm.edu=x.education;
        // vm.address=x.address;
        // vm.years=x.years;
        // vm.phone=x.phone;
        // vm.email=x.email;
        // vm.want_job=x.want_job;
        // vm.job_address=x.job_address;
        // vm.come_job=x.come_job;
        // vm.major=x.major;
        // vm.nature=x.nature;
        // vm.status=x.status;
        // vm.job_type=x.job_type;
        // vm.work=x.work_history
        //     .push({
        //     "startTime":vm.startTime,
        //     "endTime":vm.endTime,
        //     "company":vm.company,
        //     "job_name":vm.job_name,
        //     "content":vm.content,
        // })
        ;
        console.log(vm.work);
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
        vm.edit1=function () {
            vm.table1=!vm.table1;
        };
        vm.commit=function () {
            console.log(vm.work);
            let data={
                img: vm.img,
                job_type: vm.job_type,
                name: vm.name,
                sex: vm.sex,
                want_job: vm.want_job,
                years: vm.years,
                education: vm.edu,
                age: vm.age,
                recommend: vm.recommend,
                work_history: JSON.stringify(vm.work),
                allshool: vm.allshool,
                job_address: vm.job_address,
                phone: vm.phone,
                address: vm.address,
                email: vm.email,
                nature: vm.nature,
                come_job: vm.come_job,
                skill: vm.skill,
            };
            // let data ={img:info.img,age:info.age,education:info.education,address:info.address,years:info.years,phone:info.phone,email:info.email}
            // 修改用户信息
            common.request('user/add_change_resume',data).then(function callback(res) {
                if(res.data.code===200){
                    modalBox.alert('修改成功',function () {
                        $state.go('.')
                    })
                }
                modalBox.alert(res.data.msg,function(){
                    $timeout(function(){
                        $state.go('.');
                    })
                });
            })
        };
        vm.edit2=function () {
            vm.table2=!vm.table2;

        };
        vm.commit2=function (info) {
            vm.province=$("#province10 option:selected").val(); //获取选中的项
            vm.city=$("#city10 option:selected").val(); //获取选中的项
            vm.district=$("#district10 option:selected").val(); //获取选中的项
            info.job_address=vm.province+ vm.city+vm.district;
            if(info.job_address==""){
                info.job_address=$("#putadress").val();
            }
            console.log(info);
            var data ={want_job:info.want_job,job_address:info.job_address,come_job:info.come_job,nature:info.nature,skill:info.skill,job_type:info.job_type}
            // 修改求职意向信息
            common.request('user/add_change_resume',data).then(function callback(res) {
                if(res.data.code==200){
                    modalBox.alert(res.data.msg)
                }
            })
        };
        vm.edit3=function () {
            vm.table3=!vm.table3
        };
        vm.edit4=function () {
            vm.table3=!vm.table3
        };
        // 添加教育经历
        vm.commit3=function (info) {
            vm.table3=!vm.table3
            info.time=$("#edustarttime").val();
            if(info.time==""){
                modalBox.alert("请填写时间")
            }else  if(info.School==""){
                modalBox.alert("请填写学校名称")
            }else  if(info.education==""){
                modalBox.alert("请填写学历")
            }else  if(info.major==""){
                modalBox.alert("请填写专业")
            }else{
                var arr=[];
                var data ={time:info.time,School:info.School,education:info.education,major:info.major};
                arr.push(data);
                console.log(arr);
                common.request('user/show_resume',{}).then(function callback(res){
                    if(res.data.code===200){
                        x = res.data.data;
                        vm.allshool =JSON.parse(x.allshool);
                        if(x.allshool !=null){
                            vm.allshool.forEach(function (v) {
                                arr.push(v)
                            })
                            console.log(arr);
                        }
                        // 修改用户信息
                        common.request('user/add_change_resume',{allshool:JSON.stringify(arr)}).then(function callback(res) {
                            console.log(res.data.data)
                            if(res.data.code==200){
                                modalBox.alert(res.data.msg)
                            }
                            // history.go(0)
                        })
                    }
                })
            }
        };
        vm.commitAdd=function (info) {
            info.startTime=$("#starttime").val();
            info.endTime=$("#endtime").val();
            if(info.startTime==""){
            modalBox.alert("请填写工作开始时间")
            }else  if(info.endTime==""){
                modalBox.alert("请填写工作结束时间")
            }else  if(info.company==""){
                modalBox.alert("请填写工作公司名称")
            }else  if(info.job_name==""){
                modalBox.alert("请填写工作岗位")
            }else  if(info.content==""){
                modalBox.alert("请填写工作内容")
            }else{
                var arr=[];
                var data ={startTime:info.startTime,endTime:info.endTime,company:info.company,job_name:info.job_name,content:info.content};
                arr.push(data);
                console.log(arr);
                common.request('user/show_resume',{}).then(function callback(res){
                    if(res.data.code===200){
                        x = res.data.data;
                        vm.work_history =JSON.parse(x.work_history);
                        if(x.work_history !=null){
                            vm.work_history.forEach(function (v) {
                                arr.push(v)
                            })
                            console.log(arr);
                        }
                        // 修改用户信息
                        common.request('user/add_change_resume',{work_history:JSON.stringify(arr)}).then(function callback(res) {
                            console.log(res.data.data)
                            if(res.data.code==200){
                                modalBox.alert(res.data.msg)
                            }
                            history.go(0)
                        })
                    }
                })
                }


        };
        vm.delete=function () {

        };

        //工作经历修改按钮
        let modify=$('.modify');
        for(let i=0;i<modify.length;i++){
            let tables=$('.jobExpShell .editTable');
            tables.hide();
            modify.eq(i).on('click',function () {
                console.log($(this).parent());
                $(this).parent().parent().parent().siblings().show();
            })
        }//关闭按钮
        let closeBtn=$('.jobExpShell img');
        for(let i=0;i<closeBtn.length;i++){
            closeBtn.eq(i).on('click',function () {
                console.log(i);
                $(this).parent().parent().hide()
            })
        }


        // 添加工作经历
        $('.addExpbtn').on('click',function () {
            $('.addExp .editTable').show();
        });
        $('.addExp img').on('click',function () {
            $(this).parent().parent().hide()
        });
        $('.addExp button').on('click',function () {
            $(this).parent().parent().parent().hide()
        });
        console.log(modify.eq(0))
        //教育经历
        let edu=$('.eduExp');
        console.log(edu);
        for(let i=0;i<edu.length;i++){
            edu.eq(i).on('click',function () {
                console.log(i);
                $(this).siblings().show()
            });
        }
        $('.eduResume img').on('click',function () {
            $(this).parent().parent().hide()
        });
        $('.eduResume button').on('click',function () {
            $(this).parent().parent().parent().hide()
        });
        //添加教育
        $('.addEdu .addEduBtn').on('click',function () {
            console.log('add')
            $('.addEdu .editTable').show();
        });
        $('.addEdu img').on('click',function () {
            console.log('img')
            $(this).parent().parent().hide()
        });
        $('.addEdu button').on('click',function () {
            console.log('btn')
            $(this).parent().parent().parent().hide()
        });
        vm.editEval=function (info) {
            vm.evaluation=!vm.evaluation;
            common.request('user/add_change_resume',{recommend:info.recommend}).then(function callback(res) {
                console.log(res.data.data)
                if(res.data.code==200){
                    modalBox.alert(res.data.msg)
                }
            })
        };
        vm.commitEval=function () {
            
        }

        // 企业推荐
        common.request('boss/company_list',{}).then(function callback(res) {
            if(res.data.code==200){
                vm.companylist =res.data.data;
            }
        })



    });