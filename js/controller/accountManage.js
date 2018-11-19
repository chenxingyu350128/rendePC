'use strict';
angular.module('myApp')
    .controller('accountManage',function ($scope,$http,$state,$sce,$stateParams,$timeout,listsRequest,FileUploader,common,modalBox) {
        let vm=this;
        vm.navType=parseInt($stateParams.navType)||0;
        switch (vm.navType){
            case 0:
                vm.positionNow='公司信息';
                break;
            case 1:
                vm.positionNow='账户信息';
                break;
            case 2:
                vm.positionNow='账户安全';
                break;
        }
        // 图片选取
        $scope.uploadImage=function(e){
            $scope.$apply(function(){
                vm.INPUT0=e;
                vm.file0=e.files[0];
                vm.size0=vm.file0.size;
            })
        };
        $scope.uploadImage1=function(e){
            console.log(e);
            $scope.$apply(function(){
                vm.INPUT1=e;
                vm.file1=e.files[0];
                vm.size1=vm.file1.size;
            });
        };
        $scope.uploadImage2=function(e){
            console.log(e);
            $scope.$apply(function(){
                vm.INPUT2=e;
                vm.file2=e.files[0];
                vm.size2=vm.file2.size;
            });
        };
        //上传图片
        vm.upload=function(){
            let formData=new FormData();
            let fr=new FileReader();
            fr.readAsDataURL(vm.file0);
            formData.append('image',vm.file0);
            if(vm.size0 < 5242880 ){
                $http({
                    method: 'POST',
                    url: 'http://www.api.lendata.net/rd_api.php/index/Other/upload',
                    data: formData,
                    dataType: 'json',
                    headers: {"Content-Type": undefined},
                    uploadEventHandlers: {//upload事件监听
                        progress: function (res) {
                            vm.progress = (res.loaded/res.total)*100;
                        }
                    }
                }).then(function successCallBack(response) {
                    // scope.img= response.data.data.url;
                    console.log(response);
                    vm.avatar=response.data.data;
                    console.log(vm.avatar)
                })
            }
        };
        vm.upload1=function(){
            let formData=new FormData();
            let fr=new FileReader();
            fr.readAsDataURL(vm.file1);
            formData.append('image',vm.file1);
            if(vm.size1 < 5242880 ){
                $http({
                    method: 'POST',
                    url: 'http://www.api.lendata.net/rd_api.php/index/Other/upload',
                    data: formData,
                    dataType: 'json',
                    headers: {"Content-Type": undefined},
                    uploadEventHandlers: {//upload事件监听
                        progress: function (res) {
                            vm.progress1 = (res.loaded/res.total)*100;
                        }
                    }
                }).then(function successCallBack(response) {
                    // scope.img= response.data.data.url;
                    console.log(response);
                    vm.logo=response.data.data;
                    console.log(vm.logo)
                })
            }
        };
        vm.upload2=function(){
            let formData=new FormData();
            let fr=new FileReader();
            fr.readAsDataURL(vm.file2);
            formData.append('image',vm.file2);
            if(vm.size2 < 5242880 ){
                $http({
                    method: 'POST',
                    url: 'http://www.api.lendata.net/rd_api.php/index/Other/upload',
                    data: formData,
                    dataType: 'json',
                    headers: {"Content-Type": undefined},
                    uploadEventHandlers: {//upload事件监听
                        progress: function (res) {
                            vm.progress2 = (res.loaded/res.total)*100;
                        }
                    }
                }).then(function successCallBack(response) {
                    // scope.img= response.data.data.url;
                    console.log(response);
                    vm.license=response.data.data;
                })
            }
        };
        //删除图片
        vm.deleteImg=function(){
            vm.INPUT0.value='';
            vm.file0='';
            vm.size0='';
            vm.progress=0;
            vm.avatar='';
        };
        vm.deleteImg1=function(){
            vm.INPUT1.value='';
            vm.file1='';
            vm.size1='';
            vm.progress1=0;
            vm.logo='';
        };
        vm.deleteImg2=function(){
            vm.INPUT2.value='';
            vm.file2='';
            vm.size2='';
            vm.progress2=0;
            vm.license='';
        };
        //获取通用列表数据
        vm.lists=listsRequest.lists();
        console.log(vm.lists);
        vm.typeList=vm.lists.jobType;
        vm.jobType=vm.typeList[0];
        vm.natureList=vm.lists.natureList;
        vm.nature=vm.natureList[2].name;
        vm.sizeList=vm.lists.sizeList;
        vm.size=vm.sizeList[2].name;
        console.log(typeof (vm.size));
        console.log(vm.size);
        //获取公司资料
        let emptyData={};
        if(vm.navType===0){
            common.request('Boss/show_company',emptyData).then(function back(res){
                if(res.data.code===200){
                    let x=res.data.data;
                    vm.name=x.name;
                    vm.jobType=x.job_type;
                    vm.nature=x.nature;
                    vm.size=x.size;
                    vm.address=x.address;
                    vm.area=x.area;
                    vm.mail=x.mail;
                    vm.network=x.network;
                    vm.introduce=x.introduce;
                    vm.logo=x.img;
                    vm.license=x.usiness_license;
                }
                else if(res.data.code===201){
                    modalBox.alert(res.data.msg,function(){
                        $timeout(function(){
                            $state.go('signPage',{login:1})
                        },300)
                    });
                }
            });
            // 提交修改
            vm.commit=function(){
                let url='Boss/change_add_company';
                let data={
                    name:vm.name,
                    job_type:vm.jobType,
                    nature: vm.nature,
                    size: vm.size,
                    address: vm.address,
                    area: vm.area,
                    mail: vm.mail,
                    network: vm.network,
                    introduce:vm.introduce,
                    img: vm.logo,
                    usiness_license: vm.license,
                };
                common.request(url,data).then(function callback(res){
                    if(res.data.code===200){
                        modalBox.alert('修改成功')
                    }
                    else if(res.data.code===201){
                        modalBox.alert(res.data.msg,function(){
                            sessionStorage.removeItem('signSuccess');
                            $timeout(function(){
                                $state.go('signPage',{login:1})
                            },300)
                        });
                    }
                    else{
                        modalBox.alert(res.data.msg)
                    }
                    console.log(res)
                })
            };
        }

        if(vm.navType===1){
            //查看信息
            let data={network:'www.baidu.com'};
            common.request('user/get_userinfo',data).then(function back(res){
                if(res.data.code===200){
                    let x=res.data.data;
                    vm.avatar=x.img;
                    vm.username=x.loginname;
                    vm.real_name=x.name;
                    vm.firstMail=x.email;
                    vm.mobile=x.phone;
                    vm.landLine=x.hand_phone;
                    vm.id_card=x.id_card;
                }
                else if(res.data.code===201){
                    modalBox.alert(res.data.msg,function(){
                        $timeout(function(){
                            $state.go('signPage',{login:1})
                        },300)
                    });
                }
                else{
                    modalBox.alert(res.data.msg)
                }
            });
            // 修改
            vm.commit=function(){
                // let landLine=vm.areaId + '-' + vm.telNum + '-' + vm.extension;
                let data={
                    img: vm.avatar,
                    loginname: vm.username,
                    name: vm.real_name,
                    email: vm.firstMail,
                    phone: vm.mobile,
                    hand_phone: vm.landLine,
                    id_card: vm.id_card
                };
                console.log(data.img);
                common.request('Boss/add_change_userinfo',data).then(function callback(res){
                    if(res.data.code===200){
                        modalBox.alert('修改成功')
                    }
                    else if(res.data.code===201){
                        modalBox.alert(res.data.msg,function(){
                            sessionStorage.removeItem('signSuccess');
                            $timeout(function(){
                                $state.go('signPage',{login:1})
                            },300)
                        });
                    }
                    else{
                        modalBox.alert(res.data.msg)
                    }
                })
            };

        }

    });