'use strict';
angular.module('myApp')
    .controller('positionManageCtrl',function ($http,$state,common,$timeout,modalBox) {
         let vm=this;
        vm.client=sessionStorage.getItem('client');
        vm.positionList=positionList ;
        vm.get= get;

        //导航被选中高亮显示
        $(document).ready(function(){
            $('.work-position-l').eq(0).addClass('manage-active').siblings().removeClass('manage-active');
            $('.work-position-l').click(function(){
                var i = $(this).index();
                $('.work-position-l').eq(i).addClass('manage-active').siblings().removeClass('manage-active');
            });
            positionList(1)
        });

        function positionList(e) {
            console.log(e);
            if(e==1){
                var data= {};
                get(data)
            }else if(2){
                var data= {company_uid:'',complete:1}
                get(data)
            }
        }

       function get(data) {
            common.request('Boss/company_job_list',data).then(function callback(res){
                if(res.data.code===200){
                    vm.position = res.data.data;
                    console.log(vm.position)
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
        }

    });