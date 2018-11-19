'use strict';//模态框和签名、请求
angular.module('myApp')
    .factory('modalBox', function () {
        return {
            alert: function (message,callback) {
                bootbox.alert({
                    title: "提示",
                    backdrop: 'false',
                    message: "<div style='text-align: center!important;color: #03A9F4'>" + message + "</div>",
                    buttons: {
                        ok: {
                            label: '确定',
                            className: 'btn-success'
                        }
                    },
                    callback: function () {
                        if(callback){
                            callback();
                        }
                    }
                });
            },
            confirm: function (message,callback,cancel) {
                bootbox.confirm({
                    message: "<div style='text-align: center !important;color: #03A9F4'>" + message + "</div>",
                    title: "提示",
                    backdrop: 'false',
                    onEscape: true,
                    buttons: {
                        confirm: {
                            label: '确定',
                            className: 'btn-danger'
                        },
                        cancel: {
                            label: '取消',
                            className: 'btn-success'
                        }
                    },
                    callback: function (result) {
                        if (result) {
                            callback();    //callback 为传入的回调函数
                        }else if(!result && cancel){
                            cancel();
                        }
                    }
                });
            }
        }
    })

    .factory('common',function($http,$state){
        return {
            jsonSort: function(postData){
                let arr = [];
                for (let key in postData) {
                    arr.push(key)
                }
                arr.sort();
                let str = '';
                for (let i in arr) {
                    str += arr[i].toLowerCase()  + postData[arr[i]];
                }
                return str.toLowerCase()
            },
            sign: function(postData,key){
                let that=this;
                let strData = that.jsonSort(postData);
                let sign =md5(strData+key);
                return sign
            },
            request: function(url,data){
                let that=this;
                let appid = 'apprende';
                let appsecret ='fdfc8fede5c0bea035215dfbf1e33f5f';// require('sign.js')//加载签名功能
                let real_url='https://www.api.lendata.net/rd_api.php/index/'+url;
                let postData={};
                if(!sessionStorage.getItem('uid')){
                    $state.go('signPage')
                }else{
                    data['uid']=JSON.parse(sessionStorage.getItem('uid'));
                    data['token']=JSON.parse(sessionStorage.getItem('token'));
                }
                postData['app_id'] = appid;
                postData['data'] = JSON.stringify(data);
                postData['timestrap'] = Date.parse(new Date()) / 1000;
                postData['sign'] = that.sign(postData,appsecret);
                return $http({
                    method: 'POST',
                    url: real_url,
                    data: postData,
                })
            },
            upload: function(url,data){
                let real_url='https://www.api.lendata.net/rd_api.php/index/'+url;
                return $http({
                    method: 'FILE',
                    url: real_url,
                    data: data,
                })
            }


        }
    })
    .factory('listsRequest',function($http,$state,$timeout,common,modalBox,devJobType,jobType,innerType,arrival,expList,eduList,natureList,sizeList,bannerImg,boon,hotSearch){
        return {
            lists: function() {
                // 获取行业类型接口
                let vm = this;
                let data = {};
                if (!jobType) {
                    common.request('Boss/show_jobtype_list', data).then(function callback(res) {
                        if (res.data.code === 200) {
                            vm.types = res.data.data;
                            vm.devJobType = [];
                            vm.innerType = [];
                            for (let i = 0; i < vm.types.length; i++) {
                                if (vm.types[i].fid === 0) {
                                    vm.devJobType.push(vm.types[i])//完整的总类别
                                }
                            }
                            vm.eazyMainType = [];
                            for (let i = 0; i < vm.devJobType.length; i++) {
                                vm.innerType[i] = [];
                                vm.eazyMainType[i] = vm.devJobType[i].name;//只有Name的总类别
                            }
                            console.log(vm.innerType);
                            vm.childTypes = vm.types.slice(vm.devJobType.length);
                            console.log(vm.childTypes);
                            for (let i = 0; i < vm.childTypes.length; i++) {
                                for (let j = 1; j < vm.devJobType.length + 1; j++) {
                                    if (vm.childTypes[i].fid === j) {
                                        vm.innerType[j - 1].push(vm.childTypes[i])//各个类别详细汇总
                                    }
                                }
                            }
                            sessionStorage.setItem('jobType', JSON.stringify(vm.eazyMainType));//总分类列表（只含name）
                            sessionStorage.setItem('devJobType', JSON.stringify(vm.devJobType));//总分类列表
                            sessionStorage.setItem('innerType', JSON.stringify(vm.innerType));//各分类详细
                        }
                        else if (res.data.code === 201) {
                            modalBox.alert('jobType', function () {
                                $timeout(function () {
                                    $state.go('signPage')
                                }, 300)
                            });
                        }
                        else {
                            modalBox.alert(res.data.msg)
                        }
                    });
                } else {
                    vm.devJobType = devJobType;
                    vm.innerType = innerType;
                    vm.eazyMainType = jobType;
                }
                //热门搜索
                if (!hotSearch) {
                    common.request('other/hot_search', data).then(function callback(res) {
                        if (res.data.code === 200) {
                            vm.hotSearch = res.data.data;
                            sessionStorage.setItem('hotSearch', JSON.stringify(res.data.data))
                        }
                        else if (res.data.code === 201) {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                            // modalBox.alert('未注册或登录已过期', function () {
                            //
                            // });
                        }
                        else if (res.data.code === 404) {
                            modalBox.alert(res.data.msg)
                        }
                    });
                } else {
                    vm.hotSearch = hotSearch;
                }
                //banner轮播图
                if (!bannerImg) {
                    common.request('Boss/show_banner', data).then(function callback(res) {
                        if (res.data.code === 200) {
                            vm.banner = res.data.data;
                            sessionStorage.setItem('bannerImg', JSON.stringify(vm.banner));
                        }
                        else if (res.data.code === 201) {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                            // modalBox.alert('未注册或登录已过期', function () {
                            //
                            // });
                        }
                        else if (res.data.code === 404) {
                            modalBox.alert(res.data.msg)
                        }
                    });
                } else {
                    vm.banner = bannerImg;
                }
                //福利待遇列表
                if (!boon) {
                    common.request('Boss/show_boon', data).then(function callback(res) {
                        if (res.data.code === 200) {
                            vm.boon = res.data.data;
                            sessionStorage.setItem('boon', JSON.stringify(vm.boon));
                        }
                        else if (res.data.code === 201) {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                        }
                        else if (res.data.code === 404) {
                            // modalBox.alert(res.data.msg)
                        }
                    });
                } else {
                    vm.boon = boon;
                }
                // 获取到岗列表接口
                if (!arrival) {
                    common.request('Boss/come_job_list', data).then(function callback(res) {
                        if (res.data.code === 200) {
                            vm.comeJobList = res.data.data;
                            sessionStorage.setItem('arrival', JSON.stringify(vm.comeJobList));
                        }
                        else if (res.data.code === 201) {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                            // modalBox.alert(res.data.msg, function () {
                            //
                            // });
                        }
                        else {
                            // modalBox.alert(res.data.msg)
                        }
                    });
                } else {
                    vm.comeJobList = arrival;
                }
                // 获取工作经验列表接口
                if (!expList) {
                    common.request('Boss/show_job_years', data).then(function callback(res) {
                        if (res.data.code === 200) {
                            vm.expList = res.data.data;
                            console.log('expList',vm.expList);
                            sessionStorage.setItem('expList', JSON.stringify(vm.expList));
                        }
                        else if (res.data.code === 201) {
                            $timeout(function () {
                                $state.go('signPage', {login: 1})
                            }, 300);
                            // modalBox.alert(res.data.msg, function () {
                            //
                            // });
                        }
                        else {
                            // modalBox.alert(res.data.msg)
                        }


                    })
                }
                else {
                    vm.expList = expList;
                }
                // 获取学历列表接口
                if (!eduList) {
                    common.request('Boss/show_education_list', data).then(function callback(res) {
                        if (res.data.code === 200) {
                            vm.mark6 = true;
                            vm.eduList = res.data.data;
                            console.log('edulist',vm.eduList);
                            sessionStorage.setItem('eduList', JSON.stringify(vm.eduList));
                        }
                        else if (res.data.code === 201) {
                            vm.mark6 = false;
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300);
                            // modalBox.alert(res.data.msg, function () {
                            //
                            // });
                        }
                        else {
                            // modalBox.alert(res.data.msg)
                        }

                    });
                }
                else{
                    vm.eduList=eduList;
                }
                // /公司性质列表
                if(!natureList){
                    common.request('Boss/show_nature',data).then(function callback(res){
                        if(res.data.code===200){
                            vm.natureList = res.data.data;
                            sessionStorage.setItem('natureList',JSON.stringify(vm.natureList));
                        }
                        else if(res.data.code===201){
                            $timeout(function(){
                                $state.go('signPage')
                            },300);
                            // modalBox.alert(res.data.msg,function(){
                            //
                            // });
                        }
                        else{
                            // modalBox.alert(res.data.msg)
                        }

                    });
                }
                else{
                    vm.natureList=natureList;
                }
                //公司规模
                if (!sizeList) {
                    common.request('Boss/show_job_size', data).then(function callback(res) {
                        if (res.data.code === 200) {
                            vm.sizeList = res.data.data;
                            sessionStorage.setItem('sizeList', JSON.stringify(vm.sizeList));
                        }
                        else if (res.data.code === 201) {
                            $timeout(function () {
                                $state.go('signPage')
                            }, 300)
                        }
                        else {
                            // modalBox.alert(res.data.msg)
                        }

                    });
                }
                else {
                    vm.sizeList = sizeList;
                }
                return {
                    jobType: vm.eazyMainType,
                    devJobType: vm.devJobType,
                    innerType: vm.innerType,
                    arrival: vm.comeJobList,
                    eduList: vm.eduList,
                    expList: vm.expList,
                    natureList: vm.natureList,
                    sizeList: vm.sizeList,
                    bannerList: vm.banner,
                    boonList: vm.boon,
                    hotSearch: vm.hotSearch,
                };
            }
        }
    });

  