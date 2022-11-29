<!--
描述：心理测评
作者：张泰圣
-->

<template>
    <el-container>
      
        <el-header>
          <el-breadcrumb>
                  <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/test' }">心理测评</el-breadcrumb-item>
                </el-breadcrumb>
        </el-header>
    
        
        <el-container style="background:#f4f4f5">
        <el-main style="margin:20px 30px;
                        background:#fff;">
            <el-row style="font-weight:bolder;margin-bottom:30px;padding-left:30px">选择问卷</el-row>
            <el-row gutter="20" justify="center">
                
                <el-col :span="7">
                    <TestCard>
                    </TestCard>
                    <TestCard>
                    </TestCard>
                </el-col>
                <el-col :span="7">
                    <TestCard>
                    </TestCard>
                    <TestCard>
                    </TestCard>
                </el-col>
                <el-col :span="7">
                    <TestCard>
                    </TestCard>
                    <TestCard>
                    </TestCard>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
    </el-container>
    </template>
    
    <script>
    import router from "@/router";
    import {  
        
    } from "@element-plus/icons-vue"
    import TestCard from "../components/Test/TestCard"
    
    export default {
      methods: {
        goHome() {
          router.push({ name: "main" });
        },
        viewAllTest(){
            router.push({name: "testRecord"});
        },
        viewAllDocumnet(){
            router.push({name: "documentRecord"});
        },
      },
      components:{
        TestCard
      },
      data() {
        return {
           
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

    .el-header{
        margin-left:5px;
        border-bottom: 0.6px solid rgb(174, 174, 174);
        padding-top:20px;
        padding-bottom:20px;
    }
    </style>
    