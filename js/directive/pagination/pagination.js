app.directive('pageModel',function ($state,$stateParams) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/pagination/pagination.html',
        scope: {
            total: '=',
            // size: '=',
            page: '='
        },
        link: function (scope) {
            //点击页码
            scope.pageChange=function () {
                scope.page=parseInt(scope.page)||1;
                console.log('directive_page',scope.page);
                console.log("测试");
                $state.go('.', {page: scope.page},{reload: true});
            };
            //change size/page
            scope.changePage=function(){
                scope.setPage=scope.setPage.replace(/[^0-9]/g, '');
                if(parseInt(scope.setPage)===0){
                    scope.setPage=1;
                }
            };
            scope.changeSize=function(){
                scope.size=scope.size.replace(/[^0-9]/g, '');
                if(parseInt(scope.size)===0){
                    scope.size=10;
                }
            };
            //certain button of page module
            scope.getNewPage=function () {
                $state.go('.',
                    {
                        page: scope.setPage,
                        size: scope.size,
                    },{reload: true});
            };
        }
    }
});