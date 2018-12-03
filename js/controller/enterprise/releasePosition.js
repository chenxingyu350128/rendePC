'use strict';
angular.module('myApp')
    .controller('releasePositionCtrl',function ($http,$state,$timeout,$stateParams,listsRequest,common,modalBox) {
        let vm = this;
        console.log($stateParams);
        vm.index=$stateParams.index;
        vm.j_id=$stateParams.j_id;
        vm.buttonLeft=vm.j_id?'修改':'新增';
        vm.pType=$stateParams.pType||0;
        vm.addList={};
        vm.postList={};
        vm.spotlist=[];

     ////////////////////////////////////////////////////////////////////////////////////////////////////
     //    获取需要的列表
        vm.lists=listsRequest.lists();
        console.log(vm.lists);
        // vm.baseBoon=vm.lists.boonList;
        let deepClone=JSON.stringify(vm.lists.boonList);
        vm.baseBoon=JSON.parse(deepClone);

        console.log(vm.baseBoon);
        vm.typeList=vm.lists.jobType;
        vm.innerType=vm.lists.innerType;
        vm.eduList=vm.lists.eduList;
        vm.exprList=vm.lists.expList;
        vm.getJobType=function(e){
            console.log(e);
            let idx=vm.typeList.indexOf(e);
            vm.typeDetail=vm.innerType[idx];
            console.log(vm.typeDetail);
        };
        // for(let i=0;i<vm.baseBoon.length;i++){
        //     vm.innerBase[i]=vm.baseBoon[i].name;
        //     // vm.baseBoon[i]=vm.baseBoon[i].name;
        // }
        console.log(vm.innerBase);
        // 福利列表剔除
        // vm.innerBase=[];
        // vm.innerNow=[];
        // 修改职位页面
        if(vm.j_id||vm.index) {
            common.request('boss/look_job',{j_id:vm.j_id}).then(function callback(res){
                if(res.data.code===200){
                    vm.pageData=res.data.data[0];
                    // vm.pageData.boonarr=JSON.parse(vm.pageData.boonarr);
                    console.log(vm.pageData);
                    // 初始数据绑定
                    vm.job = vm.pageData.job_type;
                    vm.detailadress = vm.pageData.address;
                    vm.salfrom = vm.pageData.start_money;
                    vm.salto = vm.pageData.end_money;
                    vm.education = vm.pageData.education;
                    vm.experience = vm.pageData.experience;
                    vm.position = vm.pageData.position;
                    vm.boonNow=vm.pageData.boonarr;
                    vm.num=vm.pageData.num;
                    vm.innerBase=[];
                    vm.innerBase.length=vm.baseBoon.length;
                    vm.innerNow=[];
                    vm.innerNow.length=vm.boonNow.length;
                    for(let j=0;j<vm.baseBoon.length;j++){
                        console.log('baseLength',vm.baseBoon.length);
                        vm.innerBase[j]=vm.baseBoon[j].name;
                        for(let i=0;i<vm.boonNow.length;i++){
                            console.log('nowLength',vm.boonNow.length);
                            vm.innerNow[i]=vm.boonNow[i].name;
                            if(vm.innerBase[j]===vm.innerNow[i]){
                                console.log(vm.innerBase[j]);
                                let idx=vm.innerBase.indexOf(vm.innerNow[i]);
                                console.log('重复',idx);
                                // console.log(vm.innerBase(idx));
                                vm.baseBoon.splice(j,1)
                            }
                        }
                    }
                    console.log(vm.innerNow);
                    console.log(vm.innerBase);
                    console.log(vm.baseBoon);
                    console.log(vm.boonNow);
                }
            });
            // vm.pageData = JSON.parse(sessionStorage.getItem('position'))[vm.index];

        }else{
            vm.boonNow=[];
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
                address: vm.detailadress,
                boonarr:JSON.stringify(vm.boonNow),
                job_type:vm.job,
                start_money:vm.salfrom,
                end_money:vm.salto,
                experience: vm.experience,
                education:vm.education,
                position: vm.position,
                num:vm.num
            };
            console.log(data);
            if(vm.j_id||vm.index){
                data['j_id']=vm.j_id;

            }
            common.request('Boss/add_job',data).then(function callback(res){
               if(res.data.code===200){
                    modalBox.alert('提交成功',function () {
                       $timeout(function(){
                           $state.go('positionManage')
                       },200)
                   })
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
        //添加公司亮点
        vm.add=function (e) {
            vm.boonNow.push(vm.baseBoon[e]);
            vm.baseBoon.splice(e,1);
            console.log(vm.baseBoon);
            console.log(vm.boonNow);
        };
        // vm.type= function (e) {
        //     vm.addList.type=e.item.title
        //     vm.index=e.$index;
        //     $('.release-type').click(function(){
        //         $('.release-type').eq(vm.index).addClass('suit-2').siblings().removeClass('suit-2');
        //     });
        // };
        //移除公司亮点
        vm.delete=function (e) {
            vm.baseBoon.push(vm.boonNow[e]);
            vm.boonNow.splice(e,1);
            console.log(vm.baseBoon);
            console.log(vm.boonNow);
        };
        vm.deleteJob=function(){
            modalBox.confirm('确定删除该职位吗？',function(){
                common.request('Boss/del_jobs',{j_id: vm.j_id}).then(function back(res){
                    if(res.data.code===200){
                        $state.go('positionManage');
                        modalBox.alert('删除成功')
                    }
                })
            })
        }
        //
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