'use strict';

angular.module('myApp')
    .controller('recruitCtrl',function ($http,$state,$stateParams) {
        let vm=this;
        vm.nav=1;
        vm.type=$stateParams.type||1;
        console.log(vm.type);
        vm.pickNav=function(e){
            vm.nav=(e===1)?1:2;
        };
        vm.cardData=[
            {
                ocp:'保姆',
                salary: '￥半天2200，全天3500',
                desc: '半天2200，全天3500，女性，年龄30-45，能吃苦耐劳',
                tel: '13799772639(林女士)',
                address: '鼓楼区洪山镇',
                updateAt: '2018-09-02'
            },
            {
                ocp:'保姆',
                salary: '￥半天2200，全天3500',
                desc: '半天2200，全天3500，女性，年龄30-45，能吃苦耐劳',
                tel: '13799772639(林女士)',
                address: '鼓楼区洪山镇',
                updateAt: '2018-09-02'
            },
            {
                ocp:'保姆',
                salary: '￥半天2200，全天3500',
                desc: '半天2200，全天3500，女性，年龄30-45，能吃苦耐劳',
                tel: '13799772639(林女士)',
                address: '鼓楼区洪山镇',
                updateAt: '2018-09-02'
            },
            {
                ocp:'保姆',
                salary: '￥半天2200，全天3500',
                desc: '半天2200，全天3500，女性，年龄30-45，能吃苦耐劳',
                tel: '13799772639(林女士)',
                address: '鼓楼区洪山镇',
                updateAt: '2018-09-02'
            },
            {
                ocp:'保姆',
                salary: '￥半天2200，全天3500',
                desc: '半天2200，全天3500，女性，年龄30-45，能吃苦耐劳',
                tel: '13799772639(林女士)',
                address: '鼓楼区洪山镇',
                updateAt: '2018-09-02'
            },
            {
                ocp:'保姆',
                salary: '￥半天2200，全天3500',
                desc: '半天2200，全天3500，女性，年龄30-45，能吃苦耐劳',
                tel: '13799772639(林女士)',
                address: '鼓楼区洪山镇',
                updateAt: '2018-09-02'
            },
        ];
    });