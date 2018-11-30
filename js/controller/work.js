'use strict';
angular.module('myApp')
    .controller('WorkCtrl',function ($scope,$http,$state,$stateParams,$timeout,salaryList,listsRequest,common,modalBox) {
        let vm=this;
        vm.params=$stateParams;
        console.log(vm.params);
        //获取所需列表
        vm.lists=listsRequest.lists();
        console.log(vm.lists);
        vm.typeList=vm.lists.jobType;
        if(vm.typeList.length){
            vm.otherTypes=vm.typeList.slice(5);
        }
        // vm.otherTypes.unshift('更多');
        vm.show_boonList=vm.lists.boonList;
        vm.natureList=vm.lists.natureList;
        vm.comeJobList=vm.lists.arrival;
        vm.expList=vm.lists.expList;
        vm.eduList=vm.lists.eduList;
        vm.boon=vm.lists.boonList;
        // vm.otherBoones=vm.boon.slice(6);
        vm.keyword=vm.params.keyword;
        if(vm.keyword){
            sessionStorage.setItem('mainNav',2);
        }
        vm.salaryList=salaryList;
        let postData={};
        postData['city']=sessionStorage.getItem('city');
        vm.page=postData['page']=parseInt(vm.params.page)||1;
        let paramsData={};
        //接受默认信息from$stateParams
        vm.navType=parseInt(vm.params.navType)||0;
        postData['jobType']=paramsData['jobType']=vm.params.jobType;
        paramsData['idx0']=vm.params.idx0;
        paramsData['idx1']=vm.params.idx1;
        postData['money']=paramsData['money']=vm.params.salary;
        vm.edu=postData['education']=paramsData['edu']=vm.params.edu;
        vm.nature=postData['nature']=paramsData['nature']=vm.params.nature;
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
        vm.selected=vm.params.selectedType;
        if(vm.params.idx0){
            vm.selected='';
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
            paramsData['idx1']=undefined;
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
            paramsData['edu']='';
            paramsData['exp']='';
            paramsData['arrival']='';
            paramsData['sex']='';
            paramsData['nature']='';
            $state.go('.',paramsData,{reload:true})
        };
        vm.getNature=function(e){
            paramsData['nature']=e;
            $state.go('.',paramsData,{reload:true})
        };
        vm.getEdu=function(e){
            paramsData['edu']=e;
            $state.go('.',paramsData,{reload:true})
        };
        vm.getExp=function(e){
            paramsData['exp']=e;
            $state.go('.',paramsData,{reload:true})
        };
        vm.getSex=function(e){
            paramsData['sex']=e;
            $state.go('.',paramsData,{reload:true})
        };
        vm.getArrival=function(e){
            paramsData['arrival']=e;
            $state.go('.',paramsData,{reload:true});
        };
        $scope.$on('ngRepeatFinished', function () {
            //repeat结束
            let typeList=$('.Type span');
            let salary=$('.salaryBtn span');
            let boon=$('.boonOpt span');
            let idx0=paramsData['idx0'];
            let idx1=paramsData['idx1'];
            let boonOnlyName=[];
            for(let i=0;i<vm.boon.length;i++){//css点亮已选项
                boonOnlyName[i]=vm.boon[i].name;
                for(let j=0;j<realBoon.length;j++){
                    if(boonOnlyName.includes(realBoon[j])){
                        let inBase=boonOnlyName.indexOf(realBoon[j]);
                        boon.eq(inBase).css({
                            'background': '#f61111',
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
            typeList.eq(idx0).css({
                'background': '#f61111',
                'color': '#fff'
            });
            if(vm.selected){
                typeList.eq(0).css({
                    'background': '#fff',
                    'color': '#000'
                });
                $('.typeSelect').css({
                    'padding': '0 10px',
                    'border-color': '#f61111'
                })
            }else{
                $('.typeSelect').css({
                    'padding': '0 10px',
                    'color': '#000'
                })
            }
            salary.eq(idx1).css({
                'background': '#f61111',
                'color': '#fff'
            });

        });
        let url='';
        // vm.navType=0;

        if(vm.navType==0){
            url='Boss/find_job';
        }else if(vm.navType==1){
            url='Boss/new_job';
        }
        if(vm.nature){
            $('#nature').css({
                // 'border': '1px solid #f61111',
                'color': '#f61111'
            })
        }else{
            $('#nature').css({
                // 'border': '1px solid #000',
                'color': '#000'
            })
        }
        if(vm.edu){
            $('#education').css({
                'border': '1px solid #f61111',
                'color': '#f61111'
            })
        }else{
            $('#education').css({
                // 'border': '1px solid #000',
                'color': '#000'
            })
        }
        if(vm.exp){
            $('#experience').css({
                'border': '1px solid #f61111',
                'color': '#f61111'
            })
        }else{
            $('#experience').css({
                // 'border': '1px solid #000',
                'color': '#000'
            })
        }
        if(vm.sex){
            $('#gender').css({
                'border': '1px solid #f61111',
                'color': '#f61111'
            })
        }else{
            $('#gender').css({
                // 'border': '1px solid #000',
                'color': '#000'
            })
        }
        if(vm.time){
            $('#arrival').css({
                'border': '1px solid #f61111',
                'color': '#f61111'
            })
        }else{
            $('#arrival').css({
                // 'border': '1px solid #000',
                'color': '#000'
            })
        }
        if(!vm.time&&!vm.sex&&!vm.exp&&!vm.edu&&!vm.nature){
            $('.allOptions').css({
                'background': '#f61111',
                'color': '#fff'
            })
        }
        common.request(url,postData).then(function callback(res){
            console.log(postData);
            console.log(res);
            if(res.data.code===200){
                // if(res.data.data.length){
                    vm.dataList=res.data.data[0].data;
                    console.log(res.data.data);
                    console.log('200');
                    vm.total=res.data.data[1];
                // }
                // else{
                //     modalBox.alert('该关键词无搜索结果，请重试')
                // }
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
        //导航被选中高亮显示
        $('.work-position-l').eq(vm.navType).css({
           'background': '#f61111',
            'color': '#fff'
        });
    });