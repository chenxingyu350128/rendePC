'use strict';
angular.module('myApp')
    .controller('releasePositionCtrl',function ($http,$state,$timeout,$stateParams,listsRequest,common,modalBox) {
        let vm = this;
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
        vm.baseBoon=vm.lists.boonList;
        console.log(vm.baseBoon);
        vm.typeList=vm.lists.jobType;
        vm.eduList=vm.lists.eduList;
        vm.exprList=vm.lists.expList;
        // 修改职位页面
        if(vm.j_id||vm.index) {
            vm.pageData = JSON.parse(sessionStorage.getItem('position'))[vm.index];
            vm.pageData.boonarr=JSON.parse(vm.pageData.boonarr);
            console.log(vm.pageData);
            // 初始数据绑定
            vm.job_type = vm.pageData.job_type;
            vm.detailadress = vm.pageData.address;
            vm.salfrom = vm.pageData.start_money;
            vm.salto = vm.pageData.end_money;
            vm.education = vm.pageData.education;
            vm.experience = vm.pageData.experience;
            vm.position = vm.pageData.position;
            vm.boonNow=vm.pageData.boonarr;
            vm.num=vm.pageData.num;
        }
        // 福利列表剔除
        vm.innerBase=[];
        vm.innerNow=[];
        for(let i=0;i<vm.baseBoon.length;i++){
            vm.innerBase[i]=[];
            vm.innerBase[i]=vm.baseBoon[i].name;
            // vm.baseBoon[i]=vm.baseBoon[i].name;
        }
        for(let i=0;i<vm.boonNow.length;i++){
            vm.innerNow[i]=[];
            vm.innerNow[i]=vm.boonNow[i].name;
            // vm.boonNow[i]=vm.boonNow[i].name;
            if(vm.innerBase.includes(vm.innerNow[i])){
                let idx=vm.innerBase.indexOf(vm.innerNow[i]);
                vm.baseBoon.splice(idx,1)
            }
        }

        //发布职位/修改职位
        vm.addJob=function() {
            // 获取地址选择框的值
            vm.province=$("#province10 option:selected"); //获取选中的项
            vm.city=$("#city10 option:selected"); //获取选中的项
            vm.district=$("#district10 option:selected"); //获取选中的项
            // e.address=vm.province.val()+ vm.city.val()+vm.district.val()+f.detailadress;
            // e.boonarr=JSON.stringify(vm.spotlist);
            // e.ask=e.experience;
            let data={
                address: vm.address,
                boonarr:JSON.stringify(vm.boonNow),
                job_type:vm.job_type,
                start_money:vm.salfrom,
                end_money:vm.salto,
                experience: vm.experience,
                education:vm.education,
                // years:e.ask,
                position: vm.position,
                num:vm.num
            };
            console.log(data);
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
            vm.boonNow.push(vm.baseBoon[e]);
            vm.baseBoon.splice(e,1);
            console.log(vm.baseBoon);
            console.log(vm.boonNow);
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
            vm.baseBoon.push(vm.baseBoon[e]);
            vm.boonNow.splice(e,1);
            console.log(vm.baseBoon);
            console.log(vm.boonNow);
        };
        //
        // vm.test=function(a){
        //     console.log('薪资：',a);
        //     if(a<1000){
        //         modalBox.alert("请输入四位数薪资")
        //     }
        // };
        //重置按钮
        // vm.reset =function() {
        //     $("#addFrom").find('input[type=text],select,input[type=hidden]').each(function() {
        //         $(this).val('');
        //     });
        //     modalBox.alert("内容已重置");
        // }
    });