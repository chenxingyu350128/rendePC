'use strict';
let app=angular.module('myApp',['ui.router','ngMessages','ui.bootstrap','oc.lazyLoad'])
    .config(function($stateProvider,$urlRouterProvider){
        let _ocLazy = function (file) {
            return ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(file)
            }]
        };
        $urlRouterProvider.when('/','/home');
        $stateProvider//首页
            .state('home',{
                url: '/home?position',
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
                        'css/home.css',
                        'js/controller/home.js',
                    ])
                }
            })//找工作
            .state('WorkCtrl',{
                url: '/workCtrl?position&jobType&id&find',
                templateUrl: 'html/work.html',
                controller: 'WorkCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/work.css',
                        'js/controller/work.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//职位详情
            .state('help',{
                url: '/help',
                templateUrl: 'html/help.html',
                controller: 'HelpCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/help.css',
                        'css/work.css',
                        'js/controller/help.js'
                    ])
                }
            })
            .state('personel',{
                url: '/personel?position&position0',
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
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            .state('workDetail',{
                url: '/workDetail?id',
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
            .state('position&position0-modify',{
                url: '/position&position0-modify',
                templateUrl: 'html/position&position0-modify.html',
                controller: 'position&position0ModifyCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/position&position0-modify.css',
                        'css/work.css',
                        'css/workdetail.css',
                        'css/personel.css',
                        'js/controller/position&position0-modify.js'
                    ])
                }
            })
            .state('hunt-position&position0',{
                url: '/hunt-position&position0',
                templateUrl: 'html/hunt-position&position0.html',
                controller: 'Huntposition&position0Ctrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/hunt-position&position0.css',
                        'css/work.css',
                        'js/controller/hunt-position&position0.js'
                    ])
                }
            })
            .state('personnel-detail',{
                url: '/personnel-detail',
                templateUrl: 'html/personnel-detail.html',
                controller: 'PersonnelDetailCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/personnel-detail.css',
                        'css/headhunt-detail.css',
                        'css/work.css',
                        'js/controller/personnel-detail.js'
                    ])
                }
            })
            .state('shop-detail',{
                url: '/shop-detail',
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
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })
            .state('workplace-news',{
                url: '/workplace-news',
                templateUrl: 'html/workplace-news.html',
                controller: 'WorkplaceNewsCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/workplace-news.css',
                        'js/controller/workplace-news.js'
                    ])
                }
            })
            .state('new-detail',{
                url: '/new-detail/:id',
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
            })
            .state('enterprise',{
                url: '/enterprise?position&position0',
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
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//仁德猎头
            .state('headHunt',{
                url: '/headHunt?position&position0',
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
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })//猎头详情
            .state('headhunt-detail',{
                url: '/headHunt/detail',
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
            })//企业详情
            .state('enterpriseInfo',{
                url: '/enterprise/enterpriseInfo/:id',
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
                url: '/store?position&position0',
                templateUrl: 'html/store.html',
                controller: 'storeCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/store.css',
                        'js/controller/store.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js'
                    ])
                }
            })//登录/注册页
            .state('signPage',{
                url: '/signPage?sign&login',
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
            })
            .state('proxy',{
                url: '/proxy?position&position0',
                templateUrl: 'html/proxy.html',
                controller: 'proxyCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/proxy.css',
                        'js/controller/proxy.js',
                        'js/directive/sidebar/sidebar.js',
                        'css/sideBar.css',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            .state('WPInfo',{
                url: '/wpInfo?position&position0',
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
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                    ])
                }
            })
            .state('GWorker',{
                url: '/GWorker?position&position0&type0',
                templateUrl: 'html/GWorker.html',
                controller: 'GWorkerCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/GWorker.css',
                        'js/controller/GWorker.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })
            .state('recruit',{
                url: '/recruit?position&position0&type',
                templateUrl: 'html/recruit.html',
                controller: 'recruitCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/recruit.css',
                        'js/controller/recruit.js',
                        'css/lib/header.css',
                        'css/lib/footer.css',
                        'js/directive/rendeHeader/header.js',
                        'js/directive/rendeFooter/footer.js',
                        'js/directive/common_search/common_search.js',
                        'css/lib/search_common.css'
                    ])
                }
            })
            .state('jobFair',{
                url: '/jobFair?position&position0',
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
            })
            .state('GWDetail',{
                url: '/GWDetail',
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
                url: '/GWResume',
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
                url: '/special-zp?position&position0',
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
                url: '/enterpriseHome?position0',
                // params:{position0:1},
                templateUrl: 'html/enterprise/home.html',
                controller: 'enterpriseHome',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/enterprise/home.css',
                        'css/home.css',
                        'js/controller/enterprise/home.js',
                        'css/work.css',
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
                url: '/resumeManage?type0&type1&resumeType&position0',
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
                    ])
                }
            })
            .state('searchTalent',{
                url: '/searchTalent?type0&type1&resumeType&position0',
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
                url: '/superPosition?type0&type1&navType&position0',
                templateUrl: 'html/superPosition.html',
                controller: 'superPosition',
                controllerAs: 'vm',
                resolve: {
                    loadMyFile: _ocLazy([
                        'css/superPosition.css',
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
                url: '/positionManage?type0&type1&position0',
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
                url: '/releasePosition?type0&type1&pType&position0',
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

    });
app.run(function($state){
    $state.go('home');
});