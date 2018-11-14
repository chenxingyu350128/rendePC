angular.module('myApp')
.filter('eduFilter',function () {
    return function(edu){
        switch(edu){
            case 1:
                return '初中以下';
            case 2:
                return '高中毕业';
            case 3:
                return '大专';
            case 4:
                return '本科';
            case 5:
                return '研究生';
            case 6:
                return '博士';
        }
    }
});