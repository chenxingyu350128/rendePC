angular.module('myApp')
    .controller('GWorkerCtrl',function ($http,$state,$stateParams) {
        let vm=this;
        vm.nav=1;
        vm.type0=$stateParams.type0||1;
        console.log(vm.type0);
        vm.pickNav=function(e){
            vm.nav=(e===1)?1:2;
        };
        vm.cardData=[
            {
                ocp:'保安',
                desc: '孙先生 / 男 / 6年以上',
                tel: '13799772639(林女士)',
                updateAt: '2018-09-02'
            },
            {
                ocp:'保安',
                desc: '孙先生 / 男 / 6年以上',
                tel: '13799772639(林女士)',
                updateAt: '2018-09-02'
            },
            {
                ocp:'保安',
                desc: '孙先生 / 男 / 6年以上',
                tel: '13799772639(林女士)',
                updateAt: '2018-09-02'
            },
            {
                ocp:'保安',
                desc: '孙先生 / 男 / 6年以上',
                tel: '13799772639(林女士)',
                updateAt: '2018-09-02'
            },
            {
                ocp:'保安',
                desc: '孙先生 / 男 / 6年以上',
                tel: '13799772639(林女士)',
                updateAt: '2018-09-02'
            },
            {
                ocp:'保安',
                desc: '孙先生 / 男 / 6年以上',
                tel: '13799772639(林女士)',
                updateAt: '2018-09-02'
            },


        ];
    });