angular.module('myApp')
    // .constant('token',JSON.parse(sessionStorage.getItem('token')))
    // .constant('uid',JSON.parse(sessionStorage.getItem('uid')))
    .constant('homeMenu',JSON.parse(sessionStorage.getItem('homeMenu')))
    .constant('enterHome',JSON.parse(sessionStorage.getItem('enterHome')))
    .constant('jobType',JSON.parse(sessionStorage.getItem('jobType')))
    .constant('devJobType',JSON.parse(sessionStorage.getItem('devJobType')))
    .constant('innerType',JSON.parse(sessionStorage.getItem('innerType')))
    .constant('hotSearch',JSON.parse(sessionStorage.getItem('hotSearch')))
    .constant('arrival',JSON.parse(sessionStorage.getItem('arrival')))
    .constant('boon',JSON.parse(sessionStorage.getItem('boon')))
    .constant('expList',JSON.parse(sessionStorage.getItem('expList')))
    .constant('eduList',JSON.parse(sessionStorage.getItem('eduList')))
    .constant('bannerImg',JSON.parse(sessionStorage.getItem('bannerImg')))
    .constant('natureList',JSON.parse(sessionStorage.getItem('natureList')))
    .constant('sizeList',JSON.parse(sessionStorage.getItem('sizeList')))
    .constant('orderBy',[
        {name:"排列顺序",value:2},
        {name:"正序",value:0},
        {name:"倒序",value:1},
        ])
    .constant('salaryList',[
        '2000以下',
        '2000-4000',
        '4000-6000',
        '6000-8000'
    ]);
