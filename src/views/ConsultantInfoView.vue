<!--
描述：个人信息
作者：张泰圣
-->

<template>
    <el-container>
      
        <el-header>
          <el-breadcrumb>
                  <el-breadcrumb-item :to="{ path: '/consultantInfo' }">咨询历史</el-breadcrumb-item>
                </el-breadcrumb>
        </el-header>
    
        
        <el-main>
            <el-row class="head" justify="center">
                <el-col :span="2" >
                    <div class="avator">
                       <el-avatar shape="square" :size="60" :src="squareUrl" />
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="brief">
                        <p class="name">{{userName}}</p>
                        <p class="age">{{age}} | {{gender}}</p>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div class="password">
                       
                    </div>
                </el-col>
            </el-row>
            <el-row justify="center">
                <el-column :span="22">
                <el-descriptions
                 title="详细信息"
                 :column="3"
                 size="large"
                 border>
                <el-descriptions-item width="150px">
                  <template #label>
                  <div class="cell-item">
                  <el-icon :style="iconStyle"><User /></el-icon>
                  姓名
                  </div>
                  </template>
                  {{userName}}
                  <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
                </el-descriptions-item>
                 
        <el-descriptions-item width="150px">
          <template #label>
            <div class="cell-item" >
              性别
            </div>
          </template>
         {{gender}}
         <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
        </el-descriptions-item>
        <el-descriptions-item width="150px">
          <template #label>
            <div class="cell-item">
              年龄
            </div>
          </template>
          {{age}}
          <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
        </el-descriptions-item>
        <el-descriptions-item width="150px">
          <template #label>
            <div class="cell-item">
              咨询费用
            </div>
          </template>
          {{fee}}
          <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
        </el-descriptions-item>
        <el-descriptions-item width="150px">
          <template #label>
            <div class="cell-item">
              标签
            </div>
          </template>
          <el-tag v-for="item in label" style="margin: 5px" :key="item">{{item}}</el-tag>
          <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
        </el-descriptions-item>
      </el-descriptions>
    </el-column>
        </el-row>
        </el-main>
    </el-container>
    </template>
    
    <script>
    import router from "@/router";
    import {  
        Edit,
        User,
    } from "@element-plus/icons-vue"
    import axios from "axios";
    
    
    export default {
      created(){
        axios({
          method: 'get',
          url: 'api/user/info',
          params:{
            userphone: this.telephone
          }
        }).then((res)=>{
          console.log("res", res);
          this.userName = res.data.realname;
          this.age = res.data.age;
          this.squareUrl = res.data.profile;
          this.fee = res.data.expense;
          this.label = JSON.parse(res.data.label);
          if (res.data.sex == "f"){
            this.gender = "女";
          }
          else{
            this.gender = "男";
          }
        })
      },
      methods: {
        goHome() {
          router.push({ name: "main" });
        },
        viewAllScale(){
            router.push({name: "scaleRecord"});
        },
        viewAllDocumnet(){
            router.push({name: "documentRecord"});
        },
      },
      components:{
        Edit,
        User,
      },
      data() {
        return {
            squareUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            userName: "",
            age: 0,
            gender: "",
            telephone: this.$store.state.userInfo.user.userphone,
            fee: 0,
            label:[
                "标签1", "标签2"
            ],
            recentScale: [
                {date: "1234", name: "1234"},
                {date: "1234", name: "1234"},
                {date: "1234", name: "1234"},
                {date: "1234", name: "1234"},
                {date: "1234", name: "1234"},
            ],
            recentDocument: [
                {date: "1234", name: "1234"},
                {date: "1234", name: "1234"},
                {date: "1234", name: "1234"},
                {date: "1234", name: "1234"},
                {date: "1234", name: "1234"},
            ]
        };
      },
    };
    </script>
    
    <style scoped>
    .retitle{
        font-size: 16px;
        font-weight: bold;
    }
    .record{
        margin-top: 30px;
    }
    .head{
      margin-top: 30px;
    }
    .head .el-col{
        
        padding-top:30px;
        padding-left:15px;
        height:120px;
        background: #FFFFFF;
    }
    .el-main{
        background: #f4f4f5;
        
    }
    p.name{
        line-height: 20%;
        font-size: 20px;
    }
    p.age{
        line-height: 20%;
        font-size: 12px;
        color: #878787;
    
    }
    .pdbutton{
        float:right;
        margin-right: 20px;
        margin-top:10px;
    }
    .ebutton{
        float:right;
    }
    .avatar{
        float:left;
    }
    .brief{
        float:left;
    }
    .el-descriptions{
        margin-top: 50px;
        
    }
    .el-header{
        margin-left:5px;
        border-bottom: 0.6px solid rgb(174, 174, 174);
        padding-top:20px;
        padding-bottom:20px;
    }
    </style>
    