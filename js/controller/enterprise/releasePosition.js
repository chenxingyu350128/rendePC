'use strict';
angular.module('myApp')
    .controller('releasePositionCtrl',function ($http,$state,$stateParams,common,modalBox) {
        var vm = this;
        vm.pType=$stateParams.pType||0;
        vm.addList={}
        vm.postList={}
        vm.spotlist=[];
        vm.addJob=addJob; //发布职位
        vm.reset =reset;

     ////////////////////////////////////////////////////////////////////////////////////////////////////

        // 获取福利待遇接口
        let url3 ='Boss/show_boon';
        var data3 ={}
        common.request(url3,data3).then(function callback(res){
            if(res.data.code===200){
                vm.noSpotlist = res.data.data
            }
            else if(res.data.code===201){
                modalBox.alert('未注册，登录已过期');
                $timeout(function(){
                    $state.go('sign',{sign:1})
                },1000)
            } else if(res.data.code===404){
                modalBox.alert(res.data.msg)
            }
        })


        // 获取行业类型接口
        let data={}
        let typeurl ='Boss/show_jobtype_list';
        common.request(typeurl,data).then(function callback(res){
            vm.typeList = res.data.data;
        }),function errorCallback(response) {
        };

        // 获取工作年限接口
        let url2 ='Boss/show_job_years';
        common.request(url2,data).then(function callback(res){
            vm.exprList = res.data.data;
        }),function errorCallback(response) {
        };
        // 获取学历列表接口
        let url5 ='Boss/show_education_list';
        common.request(url5,data).then(function callback(res){
            vm.eduList = res.data.data;
        }),function errorCallback(response) {
        };

        //移除公司亮点
        vm.delete=function (e) {
             var index=e.$index;
             vm.item1= vm.spotlist.splice(index,1);
             vm.noSpotlist.push(vm.item1[0])
        };

        //添加公司亮点
        vm.add=function (e) {
            var index=e.$index;
            vm.item2= vm.noSpotlist.splice(index,1);
            vm.spotlist.push(vm.item2[0])
        }
        vm.type= function (e) {
            vm.addList.type=e.item.title
            vm.index=e.$index;
            $('.release-type').click(function(){
                $('.release-type').eq(vm.index).addClass('suit-2').siblings().removeClass('suit-2');
            });
        };

      //发布职位
        function addJob(e,f) {

            // 获取地址选择框的值
            vm.province=$("#province10 option:selected"); //获取选中的项
            vm.city=$("#city10 option:selected"); //获取选中的项
            vm.district=$("#district10 option:selected"); //获取选中的项
            vm.type=$("#type option:selected"); //获取选中的项

            e.address=vm.province.val()+ vm.city.val()+vm.district.val()+f.detailadress;
            e.boonarr=JSON.stringify(vm.spotlist);
            e.ask=e.experience;
            console.log(e);

            let url ='Boss/add_job';
            var data={address: e.address,boonarr:e.boonarr,job_type:e.job_type,
                start_money:f.salfrom,end_money:f.salto,experience: e.experience,education:e.education,
                ask:e.ask,position: e.position,num:e.num}
                common.request(url,data).then(function callback(res){
                vm.res = res.data.msg;
                console.log("发布列表",vm.res)
                    modalBox.alert(vm.res)
            }),function errorCallback(response) {};
        }

        //重置按钮
        function reset() {
            $("#addFrom").find('input[type=text],select,input[type=hidden]').each(function() {
                $(this).val('');
            });
            modalBox.alert("内容已重置");
        }

    });