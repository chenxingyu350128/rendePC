'use strict';

angular.module('myApp')
    .controller('wpInfo',function ($http,$state,common) {
        let vm =this;
        let url='show_news';
        let data={name:'cxx',password:'123456'};
        common.request(url,data).then(function callback(res){
            console.log(res)
        });

        // $http({
        //     method: 'POST',
        //     url: 'https://www.api.lendata.net/rd_api.php/index/'+url,
        //     data: postData,
        // }).then(function back(e){
        //     console.log(e);
        //     console.log(e.data.data);
        //     vm.dataList=e.data.data;
        // });
        // common.request(url,postData);
//         function jsonSort(jsonObj) {
//             let arr = [];
//             for (let key in jsonObj) {
//                 arr.push(key)
//             }
//             arr.sort();
//             console.log(arr)
//             console.log(jsonObj['app_id'])
//             let str = '';
//             for (let i in arr) {
//                 console.log(jsonObj[arr[i]])
//                 str += arr[i].toLowerCase()  + jsonObj[arr[i]];
//             }
//             console.log(str)
//             return str.toLowerCase()
//         }
//         function sign(postData,key){
//             let strData = jsonSort(postData);
//             console.log(strData)
//             let sign =md5(strData+key);
//             return sign
//         }
//
//
//         let appid = 'apprende';
//         let appsecret ='fdfc8fede5c0bea035215dfbf1e33f5f'// require('sign.js')//加载签名功能
//         let data={};
// // let urls='https://www.api.lendata.net/rd_api.php/index/'+url;
//         let urls='https://www.api.lendata.net/rd_api.php/index/boss/show_news';
//         let postdata = {};
//         postdata['app_id'] = appid;
//         postdata['data'] = JSON.stringify(data);
//         postdata['timestrap'] = Date.parse(new Date()) / 1000
//         postdata['sign'] = sign(postdata,appsecret);
//         console.log(1223);
//         $.post(urls,postdata,function(result){
//             console.log(result);
//             if(result['code']==200){
//                 vm.dataList =result.data;
//                 console.log(vm.dataList);
//             }
//             else if(result.code==404){
//                 alert(result.msg)
//             }
//         });
    });
