'use strict';

angular.module('myApp')
    .controller('ShopDetailCtrl',function ($http,$state) {
    var vm = this;

    vm.reduce= reduce;
    vm.add= add;

    var num=$("#num").val();
    console.log(num)
    function reduce() {
         if (num==0) {
             alert("当前商品数量不能再少了！")
         }else  {
             num--;
             $("#num").val(num);
         }
    }

        function add() {
                num++;
                $("#num").val(num);
        }

    });