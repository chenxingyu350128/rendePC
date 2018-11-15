'use strict';

angular.module('myApp')
    .controller('WorkDetail',function ($http,$state,$scope,$stateParams,common,modalBox,$timeout) {
        let vm = this;
        let data={j_id:$stateParams.id};
        let index=$stateParams.index;
        console.log(index)
        vm.cinfo=cinfo;

        // 查看岗位信息
        common.request("boss/look_job",data).then(function callback(res){
            if(res.data.code===200){
                vm.info=res.data.data[0];
                console.log(vm.info);
                cinfo(vm.info.c_id);
                like(vm.info.job_type);
            }
            else if(res.data.code===201){
                modalBox.alert('未注册，登录已过期');
                $timeout(function(){
                    $state.go('sign',{sign:1})
                },1000)
            } else if(res.data.code===404){
                modalBox.alert(res.data.msg)
            }
        });

        // 查看岗位被收藏数量
        common.request("Boss/show_resume_like",data).then(function callback(res){
                vm.browse=res.data.data;
        });

        // 查看该公司的其他职位
        common.request("Boss/company_job_list",data).then(function callback(res){
            vm.others=res.data.data;
            for(var i=0;i<vm.others.length;i++){
            if(i==index){
                vm.other=vm.others[i]
                }
            }
        });

        //查看相似职位列表
        function like(type){
            common.request("Boss/resemble_job",{job_type:type}).then(function callback(res){
                vm.like=res.data.data;
                console.log("查看相似职位列表:", vm.like)
            });
        }


        //查看公司信息
        function cinfo(id){
            common.request("Boss/look_company",{c_id:id}).then(function callback(res){
                vm.cinfo=res.data.data;
                console.log("【获取公司信息】：",vm.cinfo)
            });
        }



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
