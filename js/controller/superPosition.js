'use strict';
angular.module('myApp')
    .controller('superPosition',function ($http,$state,$stateParams) {
        let vm=this;
        vm.mask=true;
        vm.resumeType=parseInt($stateParams.resumeType)||0;
        vm.params=$stateParams;
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
        vm.cardData=[
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'true',
                position: '平面设计',
                intro: '24岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
                status: '在职，考虑更好的职位',
                updateAt:'2018-11-03'
            },
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'false',
                position: 'UI',
                intro: '28岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
                status: '在职，考虑更好的职位',
                updateAt:'2018-11-03'
            },
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'true',
                position: '平面设计',
                intro: '24岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
                status: '在职，考虑更好的职位',
                updateAt:'2018-11-03'
            },
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'false',
                position: '平面设计',
                intro: '28岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
                status: '在职，考虑更好的职位',
                updateAt:'2018-11-03'
            },
        ];
        vm.receivedData=[
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'true',
                position: '平面设计',
                intro: '24岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
                status: '在职，考虑更好的职位',
                updateAt:'2018-11-03'
            },
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'false',
                position: 'UI',
                intro: '28岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
                status: '在职，考虑更好的职位',
                updateAt:'2018-11-03'
            },
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'true',
                position: '平面设计',
                intro: '24岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
                status: '在职，考虑更好的职位',
                updateAt:'2018-11-03'
            },
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'false',
                position: '平面设计',
                intro: '28岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                like: '期望职位： 平面设计师 包装设计 其他 排版设计 美术编辑',
                status: '在职，考虑更好的职位',
                updateAt:'2018-11-03'
            },
        ];
        vm.faceData=[
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'true',
                position: '平面设计',
                intro: '24岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                faceAt: '2018-11-11',
                contact: '联系人:陈奕迅',
                mobile:'13799772639',
                updateAt:'2018-11-03'
            },
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'false',
                position: 'UI',
                intro: '28岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                faceAt: '2018-11-11',
                contact: '联系人:陈奕迅',
                mobile:'13799772639',
                updateAt:'2018-11-03'
            },
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'true',
                position: '平面设计',
                intro: '24岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                faceAt: '2018-11-11',
                contact: '联系人:陈奕迅',
                mobile:'13799772639',
                updateAt:'2018-11-03'
            },
            {
                avatar:'image/home/defaultAvatar.png',
                name:'曹德旺',
                vipIf:'false',
                position: '平面设计',
                intro: '28岁  |  2年以上经验  |  本科学历',
                place: '福建-福州',
                faceAt: '2018-11-11',
                contact: '联系人:陈奕迅',
                mobile:'13799772639',
                updateAt:'2018-11-03'
            },
        ];
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
























