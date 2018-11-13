'use strict';

app.directive('commonSearch',function ($http,$state,$stateParams,common,$timeout,modalBox) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/common_search/common_search.html',
        scope: {

        },
        link: function (scope) {
            var vm=this;
            console.log(12243);

            //热门搜索
            let url5 ='other/hot_search';
            var data={};
            common.request(url5,data).then(function callback(res){
                vm.hot_search = res.data.data
                console.log("热门搜索：",vm.hot_search)
                scope.$eval(attr.repeatFinish)
            })
        }
    }
});