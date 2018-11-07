'use strict';

app.directive("sideBar",function () {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "js/directive/sidebar/sidebar.html",
        scope: {
            sidebar: "="
        },
        link: function (scope) {
            // 刷新后保持高亮
            scope.level_1 = sessionStorage.getItem('level_1');
            scope.level_2 = sessionStorage.getItem('level_2');
            // 点击一级菜单
            scope.toggleList = function (x) {
                if (x === undefined) {
                    sessionStorage.setItem('level_1',undefined);
                    // session.set("level_1", undefined);
                }
                scope.level_1 = (scope.level_1 == x) ? undefined : x;  // 点击只显示当前项，再次点击隐藏
            };
            // 点击二级菜单
            scope.currentList = function (y, parentIndex) {
                scope.level_2 = y;
                // 把当前点击的菜单信息存入sessionStorage中
                sessionStorage.setItem('level_1',parentIndex);
                // session.set("level_1", parentIndex);
                sessionStorage.setItem('level_2',y);
                // session.set("level_2", y);
            }
        }
    }
});