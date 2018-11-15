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
            confirm: function (message, callback,cancel) {
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
    .factory('common',function($http){
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
                data['uid']=JSON.parse(sessionStorage.getItem('uid'));
                data['token']=JSON.parse(sessionStorage.getItem('token'));
                postData['app_id'] = appid;
                postData['data'] = JSON.stringify(data);
                postData['timestrap'] = Date.parse(new Date()) / 1000;
                postData['sign'] = that.sign(postData,appsecret);
                // postData['uid'] = JSON.parse(sessionStorage.getItem('uid'));
                // postData['token'] = JSON.parse(sessionStorage.getItem('token'));
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
    .factory('listsRequest',function($http,jobType,arrival,expList,eduList){
        return {
            lists: function(){
                // 获取行业类型接口
                let vm=this;
                if(!jobType){
                    common.request('Boss/show_jobtype_list',data).then(function callback(res){
                        vm.typeList = res.data.data;
                        sessionStorage.setItem('jobType',JSON.stringify(vm.typeList));
                    });
                }else{
                    vm.typeList=jobType;
                }
                // 获取到岗列表接口
                if(!arrival){
                    common.request('Boss/come_job_list',data).then(function callback(res){
                        vm.comeJobList = res.data.data;
                        sessionStorage.setItem('arrival',JSON.stringify(vm.comeJobList));
                    });
                }else{
                    vm.comeJobList=arrival
                }
                // 获取工作经验列表接口
                if(!expList){
                    common.request('Boss/show_job_years',data).then(function callback(res){
                        vm.expbList = res.data.data;
                        sessionStorage.setItem('expList',JSON.stringify(vm.expbList));
                    })
                }else{
                    vm.expbList=expList;
                }
                // 获取学历列表接口
                if(!eduList){
                    common.request('Boss/show_education_list',data).then(function callback(res){
                        vm.eduList = res.data.data;
                        sessionStorage.setItem('eduList',JSON.stringify(vm.eduList));
                    });
                }else{
                    vm.eduList=eduList;
                }
                return {
                    jobType: vm.typeList,
                    arrival: vm.comeJobList,
                    eduList: vm.eduList,
                    expList: vm.expbList
                };
            }
        }
    });
  