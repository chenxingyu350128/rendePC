'use strict';
let app=angular.module('myApp',['ui.router','ngMessages','ui.bootstrap','oc.lazyLoad','angularFileUpload'])
    .config(function($stateProvider,$urlRouterProvider){
        let _ocLazy = function (file) {
            return ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(file)
            }]
        };
        $urlRouterProvider.when('/','/home');
        $stateProvider//首页
            .state('home',{
                url: '/home',
                templateUrl: 'html/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'css/home.css',
                        'js/controller/home.js',
                        'js/directive/repeatEnd2.js'
                    ])
                }
            })
            .state('cityMap',{
                url: '/cityMap',
                templateUrl: 'html/cityMap.html',
                controller: 'cityMap',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'css/cityMap.css',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/controller/cityMap.js',
                    ])
                }
            })
            //简历详情页(个人增删改)
            .state('resume',{
                url: '/resume',
                templateUrl: 'html/resume.html',
                controller: 'resumeCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/resume.css',
                        'js/controller/resume.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })
            //找工作
            .state('WorkCtrl',{
                url: '/workCtrl?jobType&id&keyword&salary&boon&nature&edu&exp&sex&arrival&idx0&idx1&selectedType&navType&page&href',
                templateUrl: 'html/work.html',
                controller: 'WorkCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/work.css',
                        'js/controller/work.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//帮助页
            .state('help',{
                url: '/help',
                templateUrl: 'html/help.html',
                controller: 'HelpCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/help.css',
                        'css/work.css',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/controller/help.js'
                    ])
                }
            })//找人才
            .state('personel',{
                url: '/personel?jobType1&id&keyword&salary1&boon1&nature1&edu1&exp1&sex1&arrival1&idx10&idx11&selectedType1&navType1&page',
                templateUrl: 'html/personel.html',
                controller: 'PersonelCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/personel.css',
                        'css/work.css',
                        'js/controller/personel.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })
            //岗位详情
            .state('workDetail',{
                url: '/workDetail?id?index',
                templateUrl: 'html/workdetail.html',
                controller: 'WorkDetail',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/workdetail.css',
                        'css/work.css',
                        'js/controller/workdetail.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })
            // 职位修改
            .state('position-modify',{
                url: '/position-modify',
                templateUrl: 'html/position-modify.html',
                controller: 'ModifyCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/position-modify.css',
                        'css/work.css',
                        'css/workdetail.css',
                        'css/personel.css',
                        'js/controller/position-modify.js'
                    ])
                }
            })
            .state('hunt-position',{
                url: '/hunt-position',
                templateUrl: 'html/hunt-position.html',
                controller: 'Huntposition&position0Ctrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/hunt-position&position0.css',
                        'css/work.css',
                        'js/controller/hunt-position&position0.js',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                    ])
                }
            })
            //人才详情
            .state('personnel-detail',{
                url: '/personnel-detail?r_id&g_id',
                templateUrl: 'html/personnel-detail.html',
                controller: 'PersonnelDetailCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/personnel-detail.css',
                        'css/headhunt-detail.css',
                        'css/work.css',
                        'js/controller/personnel-detail.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//商品详情
            .state('shop-detail',{
                url: '/shop-detail?id',
                templateUrl: 'html/shop-detail.html',
                controller: 'ShopDetailCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/shop-detail.css',
                        'css/headhunt-detail.css',
                        'css/work.css',
                        'js/controller/shop-detail.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//职场资讯列表
            .state('workplace-news',{
                url: '/workplace-news&page',
                templateUrl: 'html/workplace-news.html',
                controller: 'WorkplaceNewsCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/workplace-news.css',
                        'js/controller/workplace-news.js'
                    ])
                }
            })//职场资讯详情
            .state('new-detail',{
                url: '/new-detail?id?index',
                templateUrl: 'html/new-detail.html',
                controller: 'NewDetailCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/new-detail.css',
                        'js/controller/new-detail.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })//找企业
            .state('enterprise',{
                url: '/enterprise?nav0&idx00&idx01&idx02&jobType0&nature0&size0&boon0&selectedType0&selectedNature0&selectedBoon0&page',
                templateUrl: 'html/enterprise.html',
                controller: 'enterprise',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/enterprise.css',
                        'js/controller/enterprise.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//仁德猎头
            .state('headHunt',{
                url: '/headHunt',
                templateUrl: 'html/headhunt.html',
                controller: 'HeadhuntCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/headhunt.css',
                        'js/controller/headhunt.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//猎头详情
            .state('headhunt-detail',{
                url: '/headHunt/detail?id',
                templateUrl: 'html/headhunt-detail.html',
                controller: 'HeadhuntDetailCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/headhunt-detail.css',
                        'js/controller/headhunt-detail.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })

            //企业详情
            .state('enterpriseInfo',{
                url: '/enterprise/enterpriseInfo?id',
                templateUrl: 'html/enterpriseInfo.html',
                controller: 'enterpriseInfo',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/enterpriseInfo.css',
                        'js/controller/enterpriseInfo.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//公司详情
            .state('companyInfo',{
                url: '/enterprise/companyInfo',
                templateUrl: 'html/companyInfo.html',
                controller: 'companyInfo',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/companyInfo.css',
                        'js/controller/companyInfo.js'
                    ])
                }
            })//积分商城
            .state('store',{
                url: '/store?type?integral1?idx1?page',
                templateUrl: 'html/store.html',
                controller: 'storeCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/store.css',
                        'js/controller/store.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js'
                    ])
                }
            })//登录/注册页
            .state('signPage',{
                url: '/signPage?choice&clientId&method',
                templateUrl: 'html/sign.html',
                controller: 'signCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/sign.css',
                        'js/controller/sign.js'
                    ])
                }
            })
            //填写资料
            .state('write-massage',{
                url: '/write-massage',
                templateUrl: 'html/write-massage.html',
                controller: 'WriteMassageCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/write-massage.css',
                        'js/controller/write-massage.js'
                    ])
                }
            })//仁德代理
            .state('proxy',{
                url: '/proxy',
                templateUrl: 'html/proxy.html',
                controller: 'proxyCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/proxy.css',
                        'js/controller/proxy.js',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })//职场资讯
            .state('WPInfo',{
                url: '/wpInfo?page',
                templateUrl: 'html/workplace-news.html',
                controller: 'wpInfo',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'html/workplace-news.html',
                        'css/workplace-news.css',
                        'js/controller/wpInfo.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'css/work.css',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })//普工
            .state('GWorker',{
                url: '/GWorker??navType&jobType&idx40&selectedType&page',
                templateUrl: 'html/GWorker.html',
                controller: 'GWorkerCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/GWorker.css',
                        'js/controller/GWorker.js',
                        'css/GWDetail.css',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//店铺/招普工i
            .state('recruit',{
                url: '/recruit?navType&jobType&idx30&selectedType&page',
                templateUrl: 'html/recruit.html',
                controller: 'recruitCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/GWDetail.css',
                        'css/recruit.css',
                        'js/controller/recruit.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/susBox/sus.js',
                        'js/directive/susBox/sus.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//招聘会
            .state('jobFair',{
                url: '/jobFair',
                templateUrl: 'html/jobFair.html',
                controller: 'jobFairCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'html/jobFair.html',
                        'css/jobFair.css',
                        'js/controller/jobFair.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//普工详情
            .state('GWDetail',{
                url: '/GWDetail?id',
                templateUrl: 'html/GWDetail.html',
                controller: 'GWDetail',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'html/GWDetail.html',
                        'css/GWDetail.css',
                        'js/controller/GWDetail.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })
            .state('GWResume',{//普工简历详情
                url: '/GWResume?id',
                templateUrl: 'html/GWResume.html',
                controller: 'GWResume',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'html/GWResume.html',
                        'css/GWResume.css',
                        'js/controller/GWResume.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })
            // 专题招聘
            .state('special-zp',{
                url: '/special-zp',
                templateUrl: 'html/special-zp.html',
                controller: 'SpecialZp',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'html/workplace-news.html',
                        'css/special-zp.css',
                        'css/home.css',
                        'js/controller/special-zp.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            // 专题招聘详情
            .state('topic-detail',{
                url: '/topic-detail',
                templateUrl: 'html/topic-detail.html',
                controller: 'TopicDetail',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'html/topic-detail.html',
                        'css/special-zp.css',
                        'js/controller/topic-detail.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            //**********************************企业端****************
            .state('enterpriseHome',{
                url: '/enterpriseHome',
                templateUrl: 'html/enterprise/enterpriseHome.html',
                controller: 'enterpriseHome',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/enterprise/home.css',
                        'css/home.css',
                        'js/controller/enterprise/home.js',
                        'css/work.css',
                        'css/proxy.css',
                        'css/personel.css',
                        'css/workdetail.css',
                        'css/position-modify.css',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            .state('resumeManage',{
                url: '/resumeManage?resumeType&job_type&come_job&sex&education&years&idx&interview&keyword&j_id',
                templateUrl: 'html/resumeManage.html',
                controller: 'resumeManage',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/resumeManage.css',
                        'js/controller/resumeManage.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/repeatEnd2.js'
                    ])
                }
            })
            .state('searchTalent',{
                url: '/searchTalent?resumeType&job_type&come_job&sex&education&years&idx&interview',
                templateUrl: 'html/searchTalent.html',
                controller: 'searchTalent',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/searchTalent.css',
                        'js/controller/searchTalent.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            .state('accountManage',{
                url: '/accountManage?type0&type1&navType&position0',
                templateUrl: 'html/accountManage.html',
                controller: 'accountManage',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/accountManage.css',
                        'js/controller/accountManage.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            .state('superPosition',{
                url: '/superPosition?resumeType&job_type&come_job&sex&education&years&idx&interview',
                templateUrl: 'html/superPosition.html',
                controller: 'superPosition',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/superPosition.css',
                        'css/resumeManage.css',
                        'js/controller/superPosition.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            // 职位管理
            .state('positionManage',{
                url: '/positionManage?type0&type1&nav',
                templateUrl: 'html/enterprise/positionManage.html',
                controller: 'positionManageCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'js/controller/enterprise/positionManage.js',
                        'css/enterprise/positionManage.css',
                        'css/work.css',
                        'css/home.css',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            // 发布职位
            .state('releasePosition',{
                url: '/releasePosition?type0&type1&pType&index&j_id',
                templateUrl: 'html/enterprise/releasePosition.html',
                controller: 'releasePositionCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'js/controller/enterprise/releasePosition.js',
                        'css/enterprise/releasePosition.css',
                        'css/work.css',
                        'css/home.css',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })

            // 账号切换
            .state('setting',{
                url: '/setting',
                templateUrl: 'html/setting.html',
                controller: 'setting',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'js/controller/setting.js',
                        'css/setting.css',
                        'css/headhunt.css',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            //用户中心
            .state('usercenter',{
                url: '/usercenter',
                templateUrl: 'html/usercenter.html',
                controller: 'userCenter',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'js/controller/usercenter.js',
                        'css/usercenter.css',
                        'css/headhunt-detail.css',
                        'css/personnel-detail.css',
                        'css/workdetail.css',
                        'css/enterprise.css',
                        'css/store.css',
                        'css/enterprise/home.css',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            .state('collection',{
                url: '/collection?navType',
                templateUrl: 'html/collection.html',
                controller: 'collection',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/collection.css',
                        'css/work.css',
                        'css/enterprise.css',
                        'js/controller/collection.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })
    });
app.run(function($state){
    $state.go('home');
});