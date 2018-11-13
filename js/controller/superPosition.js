'use strict';
angular.module('myApp')
    .controller('superPosition',function ($http,$state,$stateParams,common,modalBox) {
        let vm=this;
        vm.mask=true;
        vm.resumeType=parseInt($stateParams.resumeType)||0;
        vm.params=$stateParams;
        let data={};
        vm.companyjob=companyjob;//邀请面试
        // vm.cardDataList=cardDataList;
        // vm.interview="";
        // cardDataList();

        let opts0=$('.position').find('.opt0');
        let opts1=$('.demand').find('.opt1');
        let idx0=parseInt(vm.params.type0)||0;
        let idx1=parseInt(vm.params.type1)||0;
        for(let i=0;i<opts0.length;i++){
            if(idx0===i){
                opts0.eq(i).css({
                    'color': '#fff',
                    'background':'#31BEFF'
                })
            }
        }
        for(let i=0;i<opts1.length;i++){
            if(idx1===i){
                opts1.eq(i).css({
                    'color': '#fff',
                    'background':'#31BEFF'
                })
            }
        }


        // function cardDataList(e){
        //     console.log(e);
        //     vm.interview=e;
        //
        //
        // }
        // 获取收到简历接口
        common.request('Boss/show_resumelist',data).then(function callback(res){
            vm.cardData = res.data.data;
        });
        // 获取行业类型接口
        common.request('Boss/show_jobtype_list',data).then(function callback(res){
            vm.typeList = res.data.data;
        });

        // 获取到岗列表接口
        common.request('Boss/come_job_list',data).then(function callback(res){
            vm.comeJobList = res.data.data;
        });

        // 获取工作经验列表接口
        common.request('Boss/show_job_years',data).then(function callback(res){
            vm.expbList = res.data.data;
            // console.log("show_job_years",   vm.expbList)
        });
        // 获取学历列表接口
        common.request('Boss/show_education_list',data).then(function callback(res){
            vm.eduList = res.data.data;
        });
        // 邀请面试按钮接口
        function companyjob(id){
            var data6={r_id:id};
            common.request('Boss/resume_interview',data6).then(function callback(res){
                console.log(res)
                vm.eduList = res.data.msg;
                modalBox.confirm(vm.eduList);
            });
        }
        // vm.cardData=[
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'true',
        //         position: '平面设计',
        //         intro: '24岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
        //         status: '在职，考虑更好的职位',
        //         updateAt:'2018-11-03'
        //     },
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'false',
        //         position: 'UI',
        //         intro: '28岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
        //         status: '在职，考虑更好的职位',
        //         updateAt:'2018-11-03'
        //     },
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'true',
        //         position: '平面设计',
        //         intro: '24岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
        //         status: '在职，考虑更好的职位',
        //         updateAt:'2018-11-03'
        //     },
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'false',
        //         position: '平面设计',
        //         intro: '28岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
        //         status: '在职，考虑更好的职位',
        //         updateAt:'2018-11-03'
        //     },
        // ];
        // vm.receivedData=[
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'true',
        //         position: '平面设计',
        //         intro: '24岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
        //         status: '在职，考虑更好的职位',
        //         updateAt:'2018-11-03'
        //     },
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'false',
        //         position: 'UI',
        //         intro: '28岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
        //         status: '在职，考虑更好的职位',
        //         updateAt:'2018-11-03'
        //     },
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'true',
        //         position: '平面设计',
        //         intro: '24岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
        //         status: '在职，考虑更好的职位',
        //         updateAt:'2018-11-03'
        //     },
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'false',
        //         position: '平面设计',
        //         intro: '28岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
        //         status: '在职，考虑更好的职位',
        //         updateAt:'2018-11-03'
        //     },
        // ];
        // vm.faceData=[
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'true',
        //         position: '平面设计',
        //         intro: '24岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         faceAt: '2018-11-11',
        //         contact: '联系人:陈奕迅',
        //         mobile:'13799772639',
        //         updateAt:'2018-11-03'
        //     },
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'false',
        //         position: 'UI',
        //         intro: '28岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         faceAt: '2018-11-11',
        //         contact: '联系人:陈奕迅',
        //         mobile:'13799772639',
        //         updateAt:'2018-11-03'
        //     },
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'true',
        //         position: '平面设计',
        //         intro: '24岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         faceAt: '2018-11-11',
        //         contact: '联系人:陈奕迅',
        //         mobile:'13799772639',
        //         updateAt:'2018-11-03'
        //     },
        //     {
        //         avatar:'image/home/defaultAvatar.png',
        //         name:'曹德旺',
        //         vipIf:'false',
        //         position: '平面设计',
        //         intro: '28岁  |  2年以上经验  |  本科学历',
        //         place: '福建-福州',
        //         faceAt: '2018-11-11',
        //         contact: '联系人:陈奕迅',
        //         mobile:'13799772639',
        //         updateAt:'2018-11-03'
        //     },
        // ];
        vm.ifSuper=function(){
            if(vm.mask){
                $('.theMask').show();
                $('.tobeSuper').show();
                console.log('mask');
            }
        };
        $('.theMask').on('click',function () {
            $('.theMask').hide();
            $('.tobeSuper').hide();
        })
    });
























