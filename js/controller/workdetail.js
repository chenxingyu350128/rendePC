'use strict';

angular.module('myApp')
    .controller('WorkDetail',function ($http,$state,$scope,$stateParams,common,modalBox) {
        let vm = this;
        let url='boss/look_job';
        let data={j_id:$stateParams.id};
        // 工作类型
        common.request(url,data).then(function callback(res){
            if(res.data.code===200){
                vm.info=res.data.data;
                console.log(vm.info)
            }
            else if(res.data.code===404){
                modalBox.alert(res.msg)
            }
        });
        vm.shownum =shownum;
        vm.hidenum =hidenum;
        // 高德地图显示指定区域
        let map = new AMap.Map('container', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom:11, //初始化地图层级
            center: [119.306239,26.075302],
        });
        let marker = new AMap.Marker({
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
