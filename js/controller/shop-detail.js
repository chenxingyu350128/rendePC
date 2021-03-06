'use strict';

angular.module('myApp')
    .controller('ShopDetailCtrl',function ($http,$state,$timeout,$stateParams,common,modalBox) {
        var vm = this;
        vm.id= $stateParams.id;
        vm.reduce= reduce;
        vm.add= add;
        vm.info={};
        vm.exchange = exchange; //立即兑换


        var num=$("#num").val();
        function reduce() {
            if (num==0) {
                modalBox.alert("当前商品数量不能再少了！")
            }else{
                num--;
                $("#num").val(num);
            }
        }
        function add() {
            var limitBuy=$("#limitBuy").text();
            var num=$("#num").val();
            console.log(num)
            if (num==limitBuy) {
                modalBox.alert("超过限购数量！")
            }else{
                num++;
                $("#num").val(num);
            }
        }

        // 获取商品详情信息
        let url='boss/show_shopping_detail';
        let data={r_id:vm.id};
        common.request(url,data).then(function callback(res){
            if(res.data.code===200){
                vm.shop = res.data.data
                vm.imgList = JSON.parse(vm.shop.detailsimg)
                vm.specList = JSON.parse(vm.shop.spec)
                console.log(vm.specList)
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

        //立即兑换
        function exchange(id,info){
            let exchangedata={s_id:id,address:vm.info.address,phone:vm.info.phone,name:vm.info.name};
            common.request("boss/exchange",exchangedata).then(function callback(res){
                $('#exchange').modal('hide')
                if(res.data.code===200){
                    modalBox.alert(res.data.msg);
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


        // 获取猜你喜欢商品列表
        let likeurl='boss/Guess_like_shop';
        let likedata={};
        common.request(likeurl,likedata).then(function callback(res){
            if(res.data.code===200){
                vm.likeList = res.data.data
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


    });