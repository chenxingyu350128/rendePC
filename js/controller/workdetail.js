'use strict';

angular.module('myApp')
    .controller('WorkDetail',function ($http,$state,$scope) {
        var vm = this;
        vm.shownum =shownum;
        vm.hidenum =hidenum;
        // 高德地图显示指定区域
        var map = new AMap.Map('container', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom:11, //初始化地图层级
            center: [119.306239,26.075302],
        });
        var marker = new AMap.Marker({
            position: map.getCenter(),
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            offset: new AMap.Pixel(-13, -30),
            // 设置是否可拖拽
            draggable: true,
            cursor: 'move'
        });

        marker.setMap(map);

        // 设置点标记的动画效果，此处为弹跳效果
        marker.setAnimation('AMAP_ANIMATION_BOUNCE');

        function shownum() {
         $("#hidebtn").show();
         $("#shownum").show();
         $("#hidenum").hide();
         $("#showbtn").hide();
      }
      function hidenum() {
          $("#hidebtn").hide();
          $("#shownum").hide();
          $("#hidenum").show();
          $("#showbtn").show();
      }

    });
