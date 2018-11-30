'use strict';

angular.module('myApp')
    .controller('storeCtrl',function ($http,$state,$stateParams,common,$timeout,modalBox) {
        let vm=this;
        vm.params=$stateParams;
        console.log(vm.params);
        let postData={};
        vm.page=postData['page']=vm.params.page;
        let paramsData={};
        vm.type = $stateParams.type;
        vm.homePage=function(){
            $state.go('home')
        };
        vm.enterprise=function () {
            $state.go('enterprise')
        };
        let navList=$('.nav').find('div').eq(4);
        navList.css({
            'border-bottom':'5px solid #e11c19'
        });

        //清除筛选条件等
        vm.clearOthers=function(){
            paramsData['idx1']=0;
            paramsData['integral1']='';
            paramsData['time1']='';
            $state.go('store',paramsData,{reload:true})
        };
        vm.getintegral=function(e){
            vm.integral=postData['integral']=paramsData['integral1']=e;
            console.log(e)
            $state.go('store',paramsData,{reload:true})
        };

        if(vm.params.integral1){
            $('#integral').css({
                'border': '1px solid #f61111',
                'color': '#f61111'
            })
        }else{
            $('#integral').css({
                'border': '1px solid #000',
                'color': '#000'
            })
        }

        if(vm.params.idx1){
            $('#all').css({
                'background': ' #f61111',
                'color': '#fff',
                'border-radius': '10px'
            })
        }else{
            $('#integral').css({
                'background': ' #fff',
                'color': '#000',
            })
        }


        vm.getList=function(url){
            let shopdata={typeid:0,desc:vm.params.integral1};
            common.request(url,shopdata).then(function callback(res){
                if(res.data.code===200){
                    vm.shoppingList = res.data.data;
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
        };
        if(vm.type==1){
            let url='boss/show_exchange';  // 获取我的兑换列表接口
            vm.getList(url)
        }else {
            let url='boss/shopping_list';  // 获取商品列表接口
            vm.getList(url)
        }


        // 获取最新商品列表
        let timeurl='boss/Guess_like_shop';
        let timedata={typeid:0,desc:'',time:1};
        common.request(timeurl,timedata).then(function callback(res){
            vm.timeList = res.data.data
            console.log("最新商品",vm.timeList)
        })

        // 获取猜你喜欢商品列表
        let likeurl='boss/Guess_like_shop';
        let likedata={};
        common.request(likeurl,likedata).then(function callback(res){
            vm.likeList = res.data.data
            // console.log(vm.likeList)
        })

        // 获取用户信息
        let userurl='user/get_userinfo';
        let userdata={network:1};
        common.request(userurl,userdata).then(function callback(res) {
            vm.userList = res.data.data
        })

    });