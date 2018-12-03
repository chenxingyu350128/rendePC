'use strict';
angular.module('myApp')
    .controller('TopicDetail',function ($http,$state,$timeout,$scope,$stateParams,listsRequest,common,modalBox) {
        let vm=this;
        // 各种用到的通用列表
        vm.lists=listsRequest.lists();
        console.log(vm.lists);
        vm.jobType=vm.lists.devJobType;
        vm.innerType=vm.lists.innerType;
        vm.expList=vm.lists.expList;
        vm.eduList=vm.lists.eduList;
        vm.natureList=vm.lists.natureList;
        vm.baseBoon=vm.lists.boonList;
        // 初始化信息
        vm.info={
            nature:'',
            name:'',
            detailaddress:'',
            starmoney:'',
            endmoney:'',
            educational:'',
            year:'',
            content:'',
            email:'',
            num:'',
            bright_spot:'',
            job_type:''
        };

        $("#jobtype").click(function () {
            $(".jobType").toggle();
            vm.showCates=false;
        })
        vm.mouseEnter=function(e){
            vm.typeDetail=vm.innerType[e-1];
            vm.cateIdx=e-1;
            vm.showCates=true;
        };
        vm.mouseLeave=function(){
            vm.showCates=false;
        };
        vm.setname =function (e) {
            $("#jobtype").val(e);
            vm.showCates=false;
        }

        // 获取企业招聘会列表接口
        let url='boss/recruit_company';
        let data={};
        common.request(url,data).then(function callback(res){
            vm.dataList = res.data.data;
            console.log(vm.dataList)
        })

        let id=$stateParams.id;
        vm.Recruit=function (e) {
            vm.province=$("#province10 option:selected"); //获取选中的项
            vm.city=$("#city10 option:selected"); //获取选中的项
            vm.district=$("#district10 option:selected"); //获取选中的项
            e.job_type= $("#jobtype").val()
            var emailReg = !!e.email.match(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/);
            var obj = document.getElementsByName("boon");
            var check_val = [];
            for(var k in obj){
                if(obj[k].checked)
                    check_val.push(obj[k].value);
            }
            e.bright_spot=JSON.stringify(check_val);
            if(e.nature ==""||e.name==""||e.detailaddress==""||e.num==""||e.email==""||e.content==""||e.year==""||e.educational==""||e.endmoney==''||e.starmoney==""||e.job_type==""){
                modalBox.alert("请输入完整招聘信息！")
            }else if(vm.province.val==""||vm.city.val==""||vm.district.val==""){
                modalBox.alert("请选择完整的省市县地址！")
            }else if(emailReg == false) {
                modalBox.alert("邮箱格式不对");
            } else if( e.bright_spot.length==2){
                modalBox.alert("请输入公司亮点！")
            }else {
                e.address=vm.province.val()+ vm.city.val()+vm.district.val()+e.detailaddress;
                e.money = e.starmoney +"-"+e.endmoney;
                let data={r_id:id,nature:e.nature,name:e.name,address:e.address,num:e.num,email:e.email,
                    content:e.content,year:e.year,educational:e.educational,money:e.money,
                    job_type:e.job_type,bright_spot:e.bright_spot};
                common.request("Boss/add_recruit_job",data).then(function callback(res){
                    modalBox.alert(res.data.msg)
                    history.go(0)
                })
            }

        }

    });