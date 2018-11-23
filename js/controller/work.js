'use strict';
angular.module('myApp')
    .controller('WorkCtrl',function ($scope,$http,$state,$stateParams,$timeout,salaryList,listsRequest,common,modalBox) {
        let vm=this;
        vm.params=$stateParams;
        console.log(vm.params);
        //获取所需列表
        vm.lists=listsRequest.lists();
        vm.typeList=vm.lists.jobType;
        vm.otherTypes=vm.typeList.slice(5);
        vm.otherTypes.unshift('更多');
        vm.show_boonList=vm.lists.boonList;
        vm.comeJobList=vm.lists.arrival;
        vm.expList=vm.lists.expList;
        vm.eduList=vm.lists.eduList;
        vm.boon=vm.lists.boonList;
        vm.otherBoones=vm.boon.slice(6);
        vm.otherBoones.unshift({name:'更多'});
        vm.keyword=vm.params.keyword;
        if(vm.keyword){
            sessionStorage.setItem('mainNav',2);
        }
        vm.salaryList=salaryList;
        let postData={};
        let paramsData={};
        //接受默认信息from$stateParams
        vm.navType=parseInt(vm.params.navType)||0;
        postData['jobType']=paramsData['jobType']=vm.params.jobType;
        paramsData['idx0']=vm.params.idx0||0;
        paramsData['idx1']=vm.params.idx1||0;
        postData['money']=paramsData['money']=vm.params.salary;
        vm.edu=postData['education']=paramsData['edu']=vm.params.edu;
        vm.exp=postData['experience']=paramsData['exp']=vm.params.exp;
        vm.time=postData['come_job']=paramsData['arrival']=vm.params.arrival;
        vm.sex=postData['sex']=paramsData['sex']=vm.params.sex;
        let realBoon=JSON.parse(sessionStorage.getItem('boonSelected'))||[];
        console.log(realBoon);
        postData['boonarr']=JSON.stringify(vm.params.boon);
        if(realBoon.length){
            $('.allBoon').css({
                'background': '#fff',
                'color': '#000'
            })
        }else{
            $('.allBoon').css({
                'background': '#f00',
                'color': '#fff'
            })
        }
        vm.selected=vm.params.selectedType||vm.otherTypes[0];
        if(vm.params.idx0){
            vm.selected=vm.otherTypes[0];
        }
        if(vm.keyword){
            postData['find']=vm.keyword;
        }
        vm.getBoon=function(x){
            if(!realBoon.includes(x)){
               realBoon.push(x);
            }
            else{
                let idx=realBoon.indexOf(x);
                realBoon.splice(idx,1);
            }
            sessionStorage.setItem('boonSelected',JSON.stringify(realBoon));
            console.log(realBoon);
            console.log(Array.isArray(realBoon));
            postData['boonarr']=paramsData['boon']=realBoon;
            $state.go('.',paramsData,{reload:true})
        };
        //清空
        vm.clearJobType=function(){
            paramsData['jobType']='';
            paramsData['selectedType']='';
            paramsData['idx0']=0;
            $state.go('.',paramsData,{reload:true})
        };
        //行业选择
        vm.getJobType=function(x,idx){
            paramsData['jobType']=x;
            paramsData['idx0']=idx;
           $state.go('.',paramsData,{reload:true})
        };
        vm.getType=function(e){
            paramsData['jobType']=e;
            paramsData['idx0']=undefined;
            paramsData['selectedType']=vm.selected;
            $state.go('.',paramsData,{reload:true})
        };
        //清空薪资
        vm.clearSalary=function(){
            paramsData['salary']='';
            paramsData['idx1']=0;
            $state.go('.',paramsData,{reload:true})
        };
        vm.getSalary=function(x,idx){
            paramsData['salary']=x;
            paramsData['idx1']=idx;
            $state.go('.',paramsData,{reload:true})
        };
        vm.defSalary=function(x,y){
            paramsData['salary']=x+'-'+y;
            paramsData['idx1']='';
            $state.go('.',paramsData,{reload:true})
        };
        //清除福利
        vm.clearBoon=function(){
           sessionStorage.removeItem('boonSelected');
           postData['boonarr']=paramsData['boon']='';
           $state.go('.',paramsData,{reload:true})
        };
        //清除学历，经验，到岗时间等
        vm.clearOthers=function(){
            vm.edu=postData['education']=paramsData['edu']='';
            vm.exp=postData['experience']=paramsData['exp']='';
            vm.time=postData['come_job']=paramsData['arrival']='';
            vm.sex=postData['sex']=paramsData['sex']='';
            $state.go('.',paramsData,{reload:true})
        };
        vm.getEdu=function(e){
            vm.edu=postData['education']=paramsData['edu']=e;
            $state.go('.',paramsData,{reload:true})
        };
        vm.getExp=function(e){
            vm.exp=postData['experience']=paramsData['exp']=e;
            $state.go('.',paramsData,{reload:true})
        };
        vm.getSex=function(e){
            vm.time=postData['sex']=paramsData['sex']=e;
            $state.go('.',paramsData,{reload:true})
        };
        vm.getArrival=function(e){
            vm.time=postData['come_job']=paramsData['arrival']=e;
            $state.go('.',paramsData,{reload:true});
        };
        $scope.$on('ngRepeatFinished', function () {
            //repeat结束
            let typeList=$('.Type');
            let salary=$('.salaryBtn');
            let boon=$('.boonOpt');
            let idx0=paramsData['idx0'];
            let idx1=paramsData['idx1'];
            let boonOnlyName=[];
            for(let i=0;i<vm.boon.length;i++){//css点亮已选项
                boonOnlyName[i]=vm.boon[i].name;
                for(let j=0;j<realBoon.length;j++){
                    if(boonOnlyName.includes(realBoon[j])){
                        let inBase=boonOnlyName.indexOf(realBoon[j]);
                        boon.eq(inBase+1).css({
                            'background': '#f00',
                            'color': '#fff'
                        })
                    }
                }
            }
            if(vm.idx0===undefined){
                $('.typeSelect').css({
                    'background': '#fff',
                    'color': '#000'
                })
            }
            if(vm.selected!=='更多'){
                typeList.eq(0).css({
                    'background': '#fff',
                    'color': '#000'
                });
                $('.typeSelect').css({
                    'background': '#f00',
                    'color': '#fff'
                })
            }

            typeList.eq(idx0).css({
                'background': '#f00',
                'color': '#fff'
            });
            salary.eq(idx1).css({
                'background': '#f00',
                'color': '#fff'
            });

        });
        let url='';
        if(!vm.navType){
            url='Boss/find_job';
        }else{
            url='Boss/new_job';
        }
        common.request(url,postData).then(function callback(res){
            console.log(postData);
            if(res.data.code===200){
                if(res.data.data.length){
                    vm.dataList=res.data.data;
                }
                else{
                    modalBox.alert('该关键词无搜索结果，请重试')
                }
            }
            else if(res.data.code===201){
                modalBox.alert(res.data.msg,function(){
                    $timeout(function(){
                        $state.go('signPage')
                    },300)
                });
            }
            else{
                modalBox.alert(res.data.msg)
            }
        });
        //投递简历
        $scope.$on('ngRepeatFinished2', function () {
            //repeat完成后
            vm.throw= function(id,index){
                console.log(index);
                common.request('user/throw_resume',{j_id:id}).then(function callback(res){
                    $(".position-btn").eq(index).text("已投递");
                    $timeout(function(){
                        modalBox.alert(res.data.msg);
                    },200)

                });
            }
        });
        // //点击查看更多是职位分类
        // $(".tipRight").on('click',function(){
        //     let distant1= sessionStorage.getItem('distant1')||0;
        //     // console.log(distant1);
        //     // distant1=parseInt(distant1)+100;
        //     if(distant1<3000){
        //         distant1=parseInt(distant1)+100;
        //     }
        //     else{
        //         distant1=2000;
        //     }
        //     sessionStorage.setItem('distant1',distant1);
        //     $(this).parent().prev().scrollLeft(distant1);
        // });
        //
        // //点击查看更多是职位分类
        // $(".tipleft").on('click',function(){
        //     let distant1= sessionStorage.getItem('distant1')||0;
        //     if(distant1>2000){
        //         distant1=parseInt(distant1)-100;
        //     }
        //     else{
        //         distant1=0;
        //     }
        //     sessionStorage.setItem('distant1',distant1);
        //     $(this).parent().prev().scrollLeft(distant1);
        // });

        //导航被选中高亮显示
        $('.work-position-l').eq(vm.navType).css({
           'background': '#f00',
            'color': '#fff'
        });
    });