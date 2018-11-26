'use strict';

angular.module('myApp')
    .controller('GWorkerCtrl',function ($scope,$http,$state,$stateParams,common,modalBox,listsRequest,$timeout) {
        let vm=this;
        vm.params=$stateParams;
        vm.lists=listsRequest.lists();
        vm.typeList=vm.lists.jobType;
        vm.otherTypes=vm.typeList.slice(6);
        vm.nav=parseInt(vm.params.navType)||0;
        vm.selectedType=vm.params.selectedType;
        let postData={};
        postData['types']='anything';//普工简历=求职
        let paramsData={};
        if(vm.nav){
            postData['time']='anything';
        }
        // let url='';
        // url=vm.nav?'Boss/show_work':'Boss/recommend_work';
        postData['job_type']=paramsData['jobType']=vm.params.jobType;
        vm.idx=parseInt(vm.params.idx40);
        vm.clearType=function(){
            paramsData['jobType']='';
            paramsData['idx40']=0;
            $state.go('.',paramsData,{reload:true});
        };
        vm.getJobType=function(e,idx){
            paramsData['jobType']=e;
            paramsData['idx40']=idx;
            paramsData['selectedType']='';
            $state.go('.',paramsData,{reload:true});
        };
        vm.getType=function(x){
            paramsData['jobType']=paramsData['selectedType']=x;
            paramsData['idx40']='';
            $state.go('.',paramsData,{reload:true});
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
                    'border': '3px solid #f61111',
                    'color': '#f61111'
                });
            }else{
                $('.typeSelect').css({
                    'border': '3px solid #000',
                    'color': '#000'
                })
            }
        });
    });