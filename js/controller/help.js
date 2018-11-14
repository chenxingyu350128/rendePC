'use strict';

angular.module('myApp')
    .controller('HelpCtrl',function ($http,$state,hotSearch) {
        var vm=this;
          vm.hotSearch=hotSearch;
          console.log(vm.hotSearch)
    });