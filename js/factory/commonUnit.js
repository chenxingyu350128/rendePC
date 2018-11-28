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
    .factory('listsRequest',function($http,$state,$timeout,common,modalBox,devJobType,jobType,innerType,arrival,expList,eduList,natureList,sizeList,boon){
        return {
            lists: function() {
                console.log('最外端位置');
                // 获取行业类型接口
                let vm = this;
                let data = {};
                data['city']=sessionStorage.getItem('city');
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
                            vm.childTypes = vm.types.slice(vm.devJobType.length);
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
                            vm.showAlert=true;
                            modalBox.alert(res.data.msg,function () {
                                $timeout(function () {
                                    $state.go('signPage')
                                }, 300)
                            });
                        }
                        else {
                            vm.showAlert=true;
                            $state.go('signPage')
                            // modalBox.alert(function () {
                            //     $timeout(function () {
                            //         $state.go('signPage')
                            //     }, 300)
                            // });
                        }
                    });
                }
                else {
                    vm.devJobType = devJobType;
                    vm.innerType = innerType;
                    vm.eazyMainType = jobType;
                }
                // 福利待遇列表
                if (!boon) {
                    common.request('Boss/show_boon', data).then(function callback(res) {
                        if (res.data.code === 200) {
                            vm.boon = res.data.data;
                            sessionStorage.setItem('boon', JSON.stringify(vm.boon));
                        }
                        else if (res.data.code === 201) {
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
                        }
                        else if (res.data.code === 404) {
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
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
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
                        }
                        else {
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
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
                            sessionStorage.setItem('expList', JSON.stringify(vm.expList));
                        }
                        else if (res.data.code === 201) {
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
                        }
                        else {
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
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
                            vm.eduList = res.data.data;
                            sessionStorage.setItem('eduList', JSON.stringify(vm.eduList));
                        }
                        else if (res.data.code === 201) {
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                if(!vm.showAlert){
                                    vm.showAlert=!vm.showAlert;
                                    // modalBox.alert(res.data.msg,function () {
                                    //     $timeout(function () {
                                    //         $state.go('signPage')
                                    //     }, 300);
                                    // })
                                }else{
                                    $state.go('signPage')
                                }
                            }
                        }
                        else {
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
                        }

                    });
                }
                else{
                    vm.eduList=eduList;
                }
                // 公司性质列表
                if(!natureList){
                    common.request('Boss/show_nature',data).then(function callback(res){
                        if(res.data.code===200){
                            vm.natureList = res.data.data;
                            sessionStorage.setItem('natureList',JSON.stringify(vm.natureList));
                        }
                        else if(res.data.code===201){
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
                        }
                        else{
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
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
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
                        }
                        else {
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
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
                    boonList: vm.boon,
                };
            }
        }
    })
    .factory('changed',function($http,$state,$timeout,hotSearch,bannerImg,common,modalBox){
        return {
            hotSearchList: function(){
                let vm=this;
                let data={};
                data['city']=sessionStorage.getItem('city');
                if(!hotSearch){
                    common.request('other/hot_search',data).then(function callback(res){
                        if(res.data.code===200){
                            vm.hotSearch = res.data.data;
                            sessionStorage.setItem('hotSearch',JSON.stringify(vm.hotSearch));
                        }
                        else if(res.data.code===201){
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
                        }
                        else{
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
                        }
                    })
                }else{
                    vm.hotSearch=hotSearch;
                }
                return vm.hotSearch
            },
            bannerList: function(){
                let vm=this;
                let data={};
                data['city']=sessionStorage.getItem('city');
                if(!bannerImg){
                    common.request('Boss/show_banner',data).then(function callback(res){
                        if(res.data.code===200){
                            vm.banner = res.data.data;
                            sessionStorage.setItem('bannerImg',JSON.stringify(vm.banner));
                        }
                        else if(res.data.code===201){
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
                        }
                        else{
                            if(!vm.showAlert){
                                vm.showAlert=!vm.showAlert;
                                // modalBox.alert(res.data.msg,function () {
                                //     $timeout(function () {
                                //         $state.go('signPage')
                                //     }, 300);
                                // })
                            }else{
                                $state.go('signPage')
                            }
                        }
                    })
                }else{
                    vm.banner=bannerImg;
                }
                return vm.banner
            }
        }
    })
    .factory('district',function(cityData){
        return {
          cityByLetter: function () {
              let params={};
            //分类的城市
            params.filterCity = {
                A: [],
                B: [],
                C: [],
                D: [],
                E: [],
                F: [],
                G: [],
                H: [],
                // I: [],
                J: [],
                K: [],
                L: [],
                M: [],
                N: [],
                // O: [],
                P: [],
                Q: [],
                R: [],
                S: [],
                T: [],
                // U: [],
                // V: [],
                W: [],
                X: [],
                Y: [],
                Z: []
            };
            for(let i=0;i<cityData.length;i++){
                let city=cityData[i].initial;
                let value=cityData[i].city;
                switch (city) {
                    case ('A'):
                        params.filterCity.A.push(value);
                        break;
                    case ('B'):
                        params.filterCity.B.push(value);
                        break;
                    case ('C'):
                        params.filterCity.C.push(value);
                        break;
                    case ('D'):
                        params.filterCity.D.push(value);
                        break;
                    case ('E'):
                        params.filterCity.E.push(value);
                        break;
                    case ('F'):
                        params.filterCity.F.push(value);
                        break;
                    case ('G'):
                        params.filterCity.G.push(value);
                        break;
                    case ('H'):
                        params.filterCity.H.push(value);
                        break;
                    // case ('I'):
                    //     params.filterCity.I.push(value);
                    //     break;
                    case ('J'):
                        params.filterCity.J.push(value);
                        break;
                    case ('K'):
                        params.filterCity.K.push(value);
                        break;
                    case ('L'):
                        params.filterCity.L.push(value);
                        break;
                    case ('M'):
                        params.filterCity.M.push(value);
                        break;
                    case ('N'):
                        params.filterCity.N.push(value);
                        break;
                    // case ('O'):
                    //     params.filterCity.O.push(value);
                    //     break;
                    case ('P'):
                        params.filterCity.P.push(value);
                        break;
                    case ('Q'):
                        params.filterCity.Q.push(value);
                        break;
                    case ('R'):
                        params.filterCity.R.push(value);
                        break;
                    case ('S'):
                        params.filterCity.S.push(value);
                        break;
                    case ('T'):
                        params.filterCity.T.push(value);
                        break;
                    // case ('U'):
                    //     params.filterCity.U.push(value);
                    //     break;
                    // case ('V'):
                    //     params.filterCity.V.push(value);
                    //     break;
                    case ('W'):
                        params.filterCity.W.push(value);
                        break;
                    case ('X'):
                        params.filterCity.X.push(value);
                        break;
                    case ('Y'):
                        params.filterCity.Y.push(value);
                        break;
                    case ('Z'):
                        params.filterCity.Z.push(value);
                        break;
                    default:
                }

            }
            return params.filterCity;
          }
        }
    })

.factory('nickname',function($http,$state){
    return {
        request: function (arry) {
            arry.forEach(function (v) {
                if(v.sex=='女'){
                    v.nickname=v.name.slice(0,1)+'女士';
                }else if(v.sex=='男'){
                    v.nickname=v.name.slice(0,1)+'先生';
                }
            })
        }
    }
});

  