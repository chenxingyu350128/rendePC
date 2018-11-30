'use strict';

angular.module('myApp')
    .controller('PersonnelDetailCtrl',function ($http,$state,$stateParams,common,modalBox,$timeout) {
        let vm=this;
        vm.r_id=$stateParams.r_id;
        vm.g_id=$stateParams.g_id;
        let data={
            r_id:vm.r_id,
            g_id:vm.g_id
        };
    //日期时间范围
    //     laydate.render({
    //         elem: '#time'
    //         ,type: 'datetime'
    //         ,range: true
    //     });

        //执行一个laydate实例

        console.log(123)
        //人才详情
        common.request('Boss/look_resume',data).then(function(res){
            if(res.data.code===200){
                //数据格式不对，暂时保留
                res.data.data.allshool=JSON.parse(res.data.data.allshool);
                res.data.data.work_history=JSON.parse(res.data.data.work_history);
                vm.x=res.data.data;
                console.log("简历详情：",vm.x)
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
        })


        $('#datetimepicker').datetimepicker();
        //面试邀请
        vm.info={
            name:'',
            phone: '',
            time:''
        }
        vm.face=function (id,info) {
            console.log(info)
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
                console.log(thisTime+":00")
                var time = new Date(thisTime);
                var time2 = time.getTime().toString();
                console.log(time2)
                console.log(typeof (time2))
                var time3 = time2.substring(0,time2.length-3);
                console.log(time3);
                common.request('Boss/resume_interview',{r_id:id,name:info.name,phone:info.phone,time:time3}).then(function(res){
                    modalBox.alert(res.data.msg);
                    if(res.data.code==200){
                        $('#face').text("已邀请面试");
                        $('#face').style.disabled=disabled;
                        $('#invitation').modal.hide();
                    }
                })
            }
        }
    });