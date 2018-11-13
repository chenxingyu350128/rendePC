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
    });
  