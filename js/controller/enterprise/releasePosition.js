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
            vm.noSpotlist = res.data.data
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
            e.pay=f.salfrom+'-'+f.salto;
            e.ask=e.experience;
            console.log(e);

            let url ='Boss/add_job';
            var data={address: e.address,boonarr:e.boonarr,job_type:e.job_type,
                pay:e.pay,experience: e.experience,education:e.education,
                ask:e.ask,position: e.position,num:e.num}
                common.request(url,data).then(function callback(res){
                vm.res = res.data.msg;
                console.log("发布列表",vm.res)
                modalBox.confirm(vm.res);
            }),function errorCallback(response) {};
        }

        //重置按钮
        function reset() {
            $("#addFrom").find('input[type=text],select,input[type=hidden]').each(function() {
                       $(this).val('');
                modalBox.confirm("内容已重置");
                   });
        }

    });