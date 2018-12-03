'use strict';

angular.module('myApp')
    .controller('storeCtrl',function ($scope,$http,$state,$stateParams,common,$timeout,modalBox) {
        let vm=this;
        vm.params=$stateParams;
        console.log(vm.params);
        vm.salaryList= [
            '0-2000',
            '2000-8000',
            '8000-10000',
            '10000-20000',
        ]
        let paramsData={};
        let postData={};
        postData['start']=vm.params.start;
        postData['end']=vm.params.end;
        postData['typeid']=0;
        // let shopdata={typeid:0,desc:vm.params.integral1};
        vm.page=postData['page']=vm.params.page||1;
        vm.type = $stateParams.type;
        $scope.$on('ngRepeatFinished', function () {
            vm.idx=vm.params.idx;
            let salary=$('.salaryBtn span');
            if(vm.idx==0){
                $('#all').css({
                    'background': '#f61111',
                    'color': '#fff',
                    'border-radius': '0px',
                })
            }
            salary.eq(vm.idx).css({
                'background': '#f00',
                'color': '#fff',
                'border-radius': '0px',
            });
        })


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
        let salary=$('.salaryBtn span');


        //清空薪资
        vm.clearSalary=function(){
            paramsData['start']='';
            paramsData['end']='';
            paramsData['idx']=0;
            $state.go('store',paramsData,{reload:true})
        };
        vm.getSalary=function(x,idx){
            var arr =x.split("-")
            console.log(arr)
            paramsData['start']=arr[0];
            paramsData['end']=arr[1];
            paramsData['idx']=idx;
            $state.go('store',paramsData,{reload:true})
        };
        vm.defSalary=function(x,y){
            paramsData['start']=x;
            paramsData['end']=y;
            paramsData['idx']='';
            $state.go('store',paramsData,{reload:true})
        };



        vm.getList=function(url){
            common.request(url,postData).then(function callback(res){
                if(res.data.code===200){
                    vm.shoppingList=res.data.data[0].data;
                    vm.total=res.data.data[1];
                    vm.size=res.data.data[0].per_page;
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