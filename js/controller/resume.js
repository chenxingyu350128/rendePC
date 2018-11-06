angular.module('myApp')
    .controller('resumeCtrl',function ($http,$state) {
        let vm=this;
        vm.homePage=function(){
            $state.go('home')
        };
        vm.edit1=function () {
            vm.table1=!vm.table1;
        };
        vm.commit1=function () {

        };
        vm.edit2=function () {
            vm.table2=!vm.table2;
        };
        vm.commit2=function () {

        };
        vm.edit3=function () {
            vm.table3=!vm.table3
        };
        vm.commit3=function () {

        };
        vm.commitAdd=function () {

        };
        vm.delete=function () {

        };//工作经历修改按钮
        let modify=$('.modify');
        for(let i=0;i<modify.length;i++){
            let tables=$('.jobExpShell .editTable');
            tables.hide();
            modify.eq(i).on('click',function () {
                console.log($(this).parent());
                $(this).parent().parent().parent().siblings().show();
            })
        }//关闭按钮
        let closeBtn=$('.jobExpShell img');
        for(let i=0;i<closeBtn.length;i++){
            closeBtn.eq(i).on('click',function () {
                console.log(i);
                $(this).parent().parent().hide()
            })
        }
        // 添加工作经历
        $('.addExp>span').on('click',function () {
            $('.addExp .editTable').show();
        });
        $('.addExp img').on('click',function () {
            $(this).parent().parent().hide()
        });
        $('.addExp button').on('click',function () {
            $(this).parent().parent().parent().hide()
        });
        console.log(modify.eq(0))
        //教育经历
        let edu=$('.eduExp');
        console.log(edu);
        for(let i=0;i<edu.length;i++){
            edu.eq(i).on('click',function () {
                console.log(i);
                $(this).siblings().show()
            });
        }
        $('.eduResume img').on('click',function () {
            $(this).parent().parent().hide()
        });
        $('.eduResume button').on('click',function () {
            $(this).parent().parent().parent().hide()
        });
        //添加教育
        $('.addEdu>span').on('click',function () {
            $('.addEdu .editTable').show();
        });
        $('.addEdu img').on('click',function () {
            $(this).parent().parent().hide()
        });
        $('.addEdu button').on('click',function () {
            $(this).parent().parent().parent().hide()
        });
        vm.editEval=function () {
            vm.evaluation=!vm.evaluation;
        };
        vm.commitEval=function () {
            
        }
    });