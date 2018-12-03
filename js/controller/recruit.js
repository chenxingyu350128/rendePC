'use strict';

angular.module('myApp')
    .controller('recruitCtrl',function ($scope,$http,$state,$stateParams,common,modalBox,listsRequest,$timeout) {
        let vm=this;
        vm.params=$stateParams;
        vm.lists=listsRequest.lists();
        vm.typeList=vm.lists.jobType;
        vm.expList=vm.lists.expList;
        vm.otherTypes=vm.typeList.slice(6);
        vm.nav=parseInt(vm.params.navType)||0;
        vm.selectedType=vm.params.selectedType;
        let postData={};
        postData['city']=sessionStorage.getItem('city');
        postData['page']=parseInt(vm.params.page)||1;
        let paramsData={};
        if(vm.nav){
            postData['time']='anything';
        }
        // let url='';
        // url=vm.nav?'Boss/show_work':'Boss/recommend_work';
        postData['job_type']=paramsData['jobType']=vm.params.jobType;
        vm.idx=parseInt(vm.params.idx30)||0;
        vm.clearType=function(){
            paramsData['jobType']='';
            paramsData['idx30']=0;
            $state.go('recruit',paramsData,{reload:true});
        };
        vm.getJobType=function(e,idx){
            paramsData['jobType']=e;
            paramsData['idx30']=idx;
            paramsData['selectedType']='';
            $state.go('recruit',paramsData,{reload:true});
        };
        vm.getType=function(x){
            paramsData['jobType']=paramsData['selectedType']=x;
            paramsData['idx30']=undefined;
            $state.go('recruit',paramsData,{reload:true});
        };
        common.request('Boss/show_work',postData).then(function callback(res){
            if(res.data.code===200){
                vm.cardData=res.data.data[0].data;
                vm.total=res.data.data[1];
                postData['page']=res.data.data[0].current_page;
                if(!res.data.data[0].data.length){
                    vm.noResult=true;
                }
                $('.pageFromBase').html(vm.total);
                $(".pagination button").on("click",function(){
                    let href = $(this).attr("class");
                    common.pageRequest(postData,href).then(function callback(res){
                        console.log(postData);
                        console.log(res);
                        if(res.data.code===200){
                            console.log('YO!');
                            console.log('YO!');
                            vm.dataList=res.data.data[0].data;
                            vm.total=res.data.data[1];
                            console.log(vm.dataList);
                            $state.go('.')
                        }
                    });
                });
            }
        });
        $('.leftNav div').eq(vm.nav).css({
            'background': '#f00',
            'color': '#fff',
            'border-radius': '0'
        });
        $scope.$on('ngRepeatFinished', function () {
            //轮播图repeat完成后
           $('.job_type').eq(vm.idx).css({
               'background': '#f00',
               'color': '#fff',
               'border-radius': '0'
           });
           if(vm.idx==0){
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
                   'border': '1px solid #f61111',
                   'color': '#f61111',
                   'border-radius': '0'
               });
           }
           else{
               $('.typeSelect').css({
                   // 'border': '3px solid #000',
                   'color': '#000'
               })
           }
        });
        vm.format = "yyyy-MM-dd";
        vm.popup = {opened: false}
        vm.open = function () {
            vm.popup.opened = true
        };
        vm.resume =function (info) {
            console.log(info)
            vm.province=$("#province10 option:selected").val(); //获取选中的项
            vm.city=$("#city10 option:selected").val(); //获取选中的项
            vm.district=$("#district10 option:selected").val(); //获取选中的项
            info.address=vm.province+ vm.city+vm.district+info.adressdetail;
            info.end_time=new Date(info.end_time).toLocaleDateString().replace('/','-').replace('/','-');

            var data = {network:1,title:info.title,money:info.money,content:info.content,
                phone:info.phone,name:info.name,address:info.address,years:info.years,sex:info.sex,job_type:info.job_type,end_time:info.end_time}
            common.request('Boss/add_change_work',data).then(function callback(res){
                if(res.data.code==200){
                    modalBox.alert(res.data.msg)
                    history.go(0)
                }
            });
        }
    });