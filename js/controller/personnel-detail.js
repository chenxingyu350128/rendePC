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
        console.log(data);
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

        //面试邀请
        vm.face=function (id) {
            common.request('Boss/resume_interview',{r_id:id}).then(function(res){
                modalBox.alert(res.data.msg);
              if(res.data.code==200){
                  $('#face').text("已邀请面试");
                  $('#face').style.disabled=disabled;
              }

            })
        }
    });