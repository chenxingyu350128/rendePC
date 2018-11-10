'use strict';
angular.module('myApp')
    .controller('releasePositionCtrl',function ($http,$state,$stateParams) {
        var vm = this;
        console.log($stateParams);
        vm.pType=$stateParams.pType||0;
        vm.addList={}
        vm.addJob=addJob;

        vm.typelist=[
            "行政人事/财务1",
            "行政人事/财务2",
            "行政人事/财务3",
            "行政人事/财务4",
        ];
        vm.spotlist=[
            "创业公司1",
            "创业公司2",
            "创业公司3",
            "创业公司4",
        ];
        vm.noSpotlist=[
            "创业公司5",
            "创业公司6",
            "创业公司7",
            "创业公司8",
        ];
        vm.positonType=[
            {title:"全职",id:1},
            {title:"兼职",id:2},
            {title:"实习",id:3},
        ];


     ////////////////////////////////////////////////////////////////////////////////////////////////////
        vm.delete=function (e) {
             var index=e.$index;
             vm.item1= vm.spotlist.splice(index,1);
             vm.noSpotlist.push(vm.item1[0])
        }
        vm.add=function (e) {
            var index=e.$index;
            vm.item2= vm.noSpotlist.splice(index,1);
            vm.spotlist.push(vm.item2[0])
        }
        vm.type= function (e) {
            vm.index=e.$index;
            $('.release-type').click(function(){
                $('.release-type').eq(vm.index).addClass('suit-2').siblings().removeClass('suit-2');
            });
        };

        function addJob(e) {
            console.log(e)
        }

    });