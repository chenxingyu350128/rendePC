'use strict';

angular.module('myApp')
    .controller('recruitCtrl',function ($scope,$http,$state,$stateParams,common,modalBox,listsRequest,$timeout) {
        let vm=this;
        vm.params=$stateParams;
        vm.lists=listsRequest.lists();
        vm.typeList=vm.lists.jobType;
        vm.otherTypes=vm.typeList.slice(6);
        vm.nav=parseInt(vm.params.navType)||0;
        vm.selectedType=vm.params.selectedType;
        let postData={};
        let paramsData={};
        if(vm.nav){
            postData['time']='anything';
        }
        // let url='';
        // url=vm.nav?'Boss/show_work':'Boss/recommend_work';
        postData['job_type']=paramsData['jobType']=vm.params.jobType;
        vm.idx=parseInt(vm.params.idx);
        vm.clearType=function(){
            paramsData['jobType']='';
            paramsData['idx']=0;
            $state.go('recruit',paramsData,{reload:true});
        };
        vm.getJobType=function(e,idx){
            paramsData['jobType']=e;
            paramsData['idx']=idx;
            paramsData['selectedType']='';
            $state.go('recruit',paramsData,{reload:true});
        };
        vm.getType=function(x){
            paramsData['jobType']=paramsData['selectedType']=x;
            paramsData['idx']='';
            $state.go('recruit',paramsData,{reload:true});
        };
        common.request('Boss/show_work',postData).then(function callback(res){
            if(res.data.code===200){
                if(res.data.data.length){
                    vm.cardData=res.data.data;
                }else{
                    vm.noResult=true;
                }

            }
        });
        $('.leftNav div').eq(vm.nav).css({
            'background': '#f00',
            'color': '#fff'
        });
        $scope.$on('ngRepeatFinished', function () {
            //轮播图repeat完成后
           $('.job_type').eq(vm.idx).css({
               'background': '#f00',
               'color': '#fff'
           });
           if(vm.idx){
               $('.typeSelect').css({
                   'background': '#fff',
                   'color': '#000'
               });
           }
           if(vm.selectedType){
               $('.job_type').css({
                   'background': '#fff',
                   'color': '#000'
               });
               $('.typeSelect').css({
                   'background': '#f00',
                   'color': '#fff'
               });
           }
        });
        //********************************************************
       //  vm.nav=1;
       //  vm.type=$stateParams.type||1;
       //  // console.log(vm.type);
       //  let url='boss/show_work';
       //  vm.pickNav=pickNav;
       //  vm.change=change;
       //  vm.pickNav(vm.nav);
       //  vm.getData = getData;
       //  // 获取普工简历列表接口
       //
       // function pickNav(e){
       //      vm.nav=(e===1)?1:2;
       //      if(e==1){
       //          let data1={};
       //          getData(data1)
       //      }else if(e==2){
       //          let data1={time:1};
       //          getData(data1)
       //      }
       //
       //      //
       //      // if(e==1){
       //      //     let data1={};
       //      //     common.request(url,data1).then(function callback(res){
       //      //         if(res.data.code===200){
       //      //             vm.cardData = res.data.data;
       //      //         }
       //      //         else if(res.data.code===201){
       //      //             modalBox.alert(res.data.msg,function () {
       //      //                 $timeout(function () {
       //      //                     $state.go('sign',{sign:1})
       //      //                 },300)
       //      //             });
       //      //         } else if(res.data.code===404){
       //      //             modalBox.alert(res.data.msg)
       //      //         }
       //      //     })
       //      // }else if(e==2){
       //      //     let data2={time:1};
       //      //     common.request(url,data2).then(function callback(res){
       //      //         if(res.data.code===200){
       //      //             vm.cardData = res.data.data;
       //      //             // console.log(vm.cardData)
       //      //         }
       //      //         else if(res.data.code===201){
       //      //             modalBox.alert('未注册，登录已过期');
       //      //             $timeout(function(){
       //      //                 $state.go('sign',{sign:1})
       //      //             },1000)
       //      //         } else if(res.data.code===404){
       //      //             modalBox.alert(res.data.msg)
       //      //         }
       //      //     })
       //      // }
       //  };
       //
       //  function getData(data){
       //      common.request(url,data).then(function callback(res){
       //          if(res.data.code===200){
       //              vm.cardData = res.data.data;
       //          }
       //          else if(res.data.code===201){
       //              modalBox.alert(res.data.msg,function(){
       //                  $timeout(function(){
       //                      $state.go('signPage',{login:1})
       //                  },300)
       //              });
       //          }
       //          else{
       //              modalBox.alert(res.data.msg)
       //          }
       //      })
       //  }
       //
       // function change(e) {
       //     // console.log("【下拉框选择】：",e)
       // }
       //
       //
       //
       //  // 获取行业类型接口
       //  var data ={};
       //  let url2 ='Boss/show_jobtype_list';
       //  common.request(url2,data).then(function callback(res){
       //      vm.typeList = res.data.data;
       //      // console.log('行业类型回调数据：',vm.typeList)
       //  }),function errorCallback(response) {
       //  };

    });