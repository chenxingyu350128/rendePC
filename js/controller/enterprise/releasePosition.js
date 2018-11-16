'use strict';
angular.module('myApp')
    .controller('releasePositionCtrl',function ($http,$state,$timeout,$stateParams,listsRequest,common,modalBox) {
        var vm = this;
        console.log($stateParams);
        vm.index=$stateParams.index;
        vm.j_id=$stateParams.j_id;
        vm.pType=$stateParams.pType||0;
        vm.addList={};
        vm.postList={};
        vm.spotlist=[];

     ////////////////////////////////////////////////////////////////////////////////////////////////////
     //    获取需要的列表
        vm.lists=listsRequest.lists();
        vm.noSpotlist=vm.lists.boonList;
        vm.typeList=vm.lists.jobType;
        vm.eduList=vm.lists.eduList;
        vm.exprList=vm.lists.expList;


        // 修改职位页面
        if(vm.j_id||vm.index) {
            vm.pageData = JSON.parse(sessionStorage.getItem('position'))[vm.index];
            vm.pageData.boonarr=JSON.parse(vm.pageData.boonarr);
            console.log(vm.pageData);
            // 初始数据绑定
            vm.addList.job_type = vm.pageData.job_type;
            vm.postList.detailadress = vm.pageData.address;
            vm.postList.salfrom = vm.pageData.start_money;
            vm.postList.salto = vm.pageData.end_money;
            vm.addList.education = vm.pageData.education;
            vm.addList.experience = vm.pageData.experience;
            vm.addList.position = vm.pageData.position;
            vm.spotlist=vm.pageData.boonarr;
        }
        //发布职位/修改职位
        vm.addJob=function(e,f,event) {
            event.preventDefault();
            // 获取地址选择框的值
            vm.province=$("#province10 option:selected"); //获取选中的项
            vm.city=$("#city10 option:selected"); //获取选中的项
            vm.district=$("#district10 option:selected"); //获取选中的项
            e.address=vm.province.val()+ vm.city.val()+vm.district.val()+f.detailadress;
            e.boonarr=JSON.stringify(vm.spotlist);
            e.ask=e.experience;
            var data={
                address: e.address,
                boonarr:e.boonarr,
                job_type:e.job_type,
                start_money:f.salfrom,
                end_money:f.salto,
                experience: e.experience,
                education:e.education,
                ask:e.ask,
                position: e.position,
                num:e.num
            };
            if(vm.j_id||vm.index){
                data['j_id']=vm.j_id;
            }
            common.request('Boss/add_job',data).then(function callback(res){
                console.log(res);
                // vm.res = res.data.msg;
                // console.log("发布列表",vm.res);
                // modalBox.alert(vm.res)
            });
            // if(vm.province==undefined || vm.city===undefined|| vm.district==undefined){
            //     modalBox.alert("请输入完整地址")
            // }else if(vm.spotlist.length==0){
            //     modalBox.alert("请选择公司亮点")
            // }else if(e.education==""){
            //     modalBox.alert("请选择学历要求")
            // }else if(e.experience==""){
            //     modalBox.alert("请选择经验要求")
            // }else {
            // }
        };
        //添加公司亮点
        vm.add=function (e) {
            var index=e.$index;
            vm.item2= vm.noSpotlist.splice(index,1);
            vm.spotlist.push(vm.item2[0].name);
        };
        vm.type= function (e) {
            vm.addList.type=e.item.title
            vm.index=e.$index;
            $('.release-type').click(function(){
                $('.release-type').eq(vm.index).addClass('suit-2').siblings().removeClass('suit-2');
            });
        };
        //移除公司亮点
        vm.delete=function (e) {
            var index=e.$index;
            vm.item1= vm.spotlist.splice(index,1);
            vm.noSpotlist.push(vm.item1[0])
        };

        vm.test=function(a){
            console.log('薪资：',a);
            if(a<1000){
                modalBox.alert("请输入四位数薪资")
            }
        };
        //重置按钮
        // vm.reset =function() {
        //     $("#addFrom").find('input[type=text],select,input[type=hidden]').each(function() {
        //         $(this).val('');
        //     });
        //     modalBox.alert("内容已重置");
        // }
    });