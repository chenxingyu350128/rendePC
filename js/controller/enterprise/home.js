'use strict';
angular.module('myApp')
    .controller('enterpriseHome',function ($http,$state,listsRequest,common,modalBox) {
        var vm=this;
        //搜索栏
        vm.lists=listsRequest.lists();
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
        common.request('Boss/company_job_list',{}).then(function callback(res){
            vm.jobData = res.data.data;
        })

        // 人才推荐——获取收到简历接口
        let url3 ='Boss/all_resume';
        var data3= {page:1}
        common.request(url3,data3).then(function callback(res){
            vm.otherData = res.data.data[0].data;
        })

        //获取公司信息接口
        let url4 ='Boss/show_company';
        var data4= {}
        common.request(url4,data4).then(function callback(res){
            vm.company = res.data.data;
            // console.log("查看公司信息：",vm.company )
        }),function errorCallback(response) {
            console.log(re)
        };

        vm.showmodel =function (id) {
            $("#invitation").modal('show');
            $("#rid").val(id)
        }
        //面试邀请
        $('#datetimepicker').datetimepicker();
        vm.info={
            name:'',
            phone: '',
            time:''
        }
        vm.face=function (info) {
            if(info.name==""){
                modalBox.alert("请输入联系人姓名");
            }else if(info.phone==""){
                modalBox.alert("请输入联系人电话");
            }else if(info.time==""){
                modalBox.alert("请输入面试时间");
            }else {
                var telReg = !!info.phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
                if(telReg == false){
                    modalBox.alert("手机号格式不对");
                    return false
                }

                //获取到的时间
                var thisTime = info.time;
                thisTime = thisTime.replace(/-/g, '/');
                var time = new Date(thisTime);
                var time2 = time.getTime().toString();
                var time3 = time2.substring(0,time2.length-3);
                var id =$("#rid").val();
                common.request('Boss/resume_interview',{r_id:id,name:info.name,phone:info.phone,time:time3}).then(function(res){
                    modalBox.alert(res.data.msg);
                    if(res.data.code==200){
                        $('#face').text("已邀请面试");
                        $('#face').style.disabled=disabled;
                        $("#invitation").modal('hide');
                    }
                })
            }
        }
        //
        // // 邀请面试按钮接口
        // function companyjob(id){
        //     let url6 ='Boss/resume_interview';
        //     var data6={r_id:id}
        //     common.request(url6,data6).then(function callback(res){
        //         console.log(res)
        //         vm.eduList = res.data.msg;
        //         modalBox.alert(vm.eduList);
        //     }),function errorCallback(response) {
        //     };
        // }

        // 获取商品列表
        let timeurl='boss/shopping_list';
        let timedata={typeid:0,desc:'',page: 1};
        common.request(timeurl,timedata).then(function callback(res){
            vm.timeList = res.data.data[0].data
            console.log("商品",vm.timeList)
        })

        // 获取用户信息
        let userurl='user/get_userinfo';
        let userdata={network:1};
        common.request(userurl,userdata).then(function callback(res) {
            vm.userList = res.data.data
        })

        //资讯列表
        common.request('Boss/show_news',{page:1}).then(function callback(res) {
            if (res.data.code === 200) {
                vm.newsList = res.data.data[0].data;
            }
        })

        //完成招聘
        vm.finish =function (id) {
            common.request('Boss/del_job',{j_id:id}).then(function callback(res) {
                if (res.data.code === 200) {
                   modalBox.alert(res.data.msg)
                    history.go(0)
                }
            })
        }

    });