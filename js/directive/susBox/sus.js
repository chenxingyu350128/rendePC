app.directive('susBox',function ($http,$state,$stateParams) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'js/directive/susBox/sus.html',
        scope: {
        },
        link: function (scope) {
            // 设置描点不失效
            $('.toTop').on('click',function () {
                window.location.hash="#header_top";
            });
            $('.qrCode_home').on('mouseover',function () {
                $('.QRImg').show();
            }).on('mouseout',function () {
                $('.QRImg').hide();
            });
            $('.toBottom').on('click',function () {
                window.location.hash="#footer_bottom";
            })
        }
    }
});