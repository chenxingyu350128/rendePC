'use strict';
angular.module('myApp')
    .controller('citySelect',function ($scope,$http,$state,$sce,$stateParams,$timeout,listsRequest,common,modalBox) {
        let vm = this;
        // 单选
        vm.singleSelect1 = $('#single-select-1').citySelect({
            dataJson: cityData,
            multiSelect: false,
            whole: true,
            shorthand: true,
            search: true,
            onInit: function () {
                console.log(this)
            },
            onTabsAfter: function (target) {
                console.log(target)
            },
            onCallerAfter: function (target, values) {
                vm.cityselect= values;
                sessionStorage.setItem('city',JSON.stringify(vm.cityselect.name));
                history.go(-1);
            }
        });

        // 单选设置城市
        vm.singleSelect1.setCityVal('福州市');

        // 单选
        vm.singleSelect2 = $('#single-select-2').citySelect({
            dataJson: cityData
        });

        // 单选设置城市
        vm.singleSelect2.setCityVal('福州市');

        // 禁止点击显示的接口
        vm.singleSelect2.status('readonly');

        //单选
        vm.singleSelect3 = $('#single-select-3').citySelect({
            dataJson: cityData
        });

        // 单选设置城市
        vm.singleSelect3.setCityVal('福州市');

        // 禁止点击显示的接口
        vm.singleSelect3.status('disabled');
    })

