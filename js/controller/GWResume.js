'use strict';

angular.module('myApp')
    .controller('GWResume',function ($http,$state) {
        let vm=this;
        vm.recData=[
            {
                ocp:'店铺服务员、配菜员、管理人员',
                salary:'￥半天2200，全天3500',
                desc: '半天2200，全天35000，女性，年龄30-45，能按时打卡上班NBC撒比',
                tel:'13799772639(孙女士)',
                address:'鼓楼区洪山镇',
                advantage:'擅长安保工作，多年经验',
                updateAt: '2018-09-03'
            },
            {
                ocp:'店铺服务员、配菜员、管理人员',
                salary:'￥半天2100，全天3800',
                desc: '半天2200，全天35000，女性，年龄30-45，能按时打卡上班NBC撒比',
                tel:'13799772639(刘女士)',
                address:'鼓楼区洪山镇',
                advantage:'擅长安保工作，多年经验',
                updateAt: '2018-09-03'
            }
        ];
    });