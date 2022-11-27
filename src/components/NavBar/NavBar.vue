<!--
描述：导航栏
作者：张泰圣、王若晗
-->

<template>
    <el-menu
        default-active="1"
        class="el-menu-vertical"
        background-color="#6ac6c6"
        text-color="#fff"
        active-text-color="#2c698d"
        length=1000px
        @select="handleSelect"
    >
        <el-menu-item index="1" @click="goHome">
            <el-icon><House /></el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="2">
        <template #title>
            <el-icon><ChatDotRound /></el-icon>
            <span>心理咨询</span>
        </template>
            <el-menu-item index="2-1">预约咨询</el-menu-item>
            <el-menu-item index="2-2">我的订单</el-menu-item>
        </el-sub-menu>
            <el-menu-item index="3" @click="goTest">
            <el-icon><Notebook /></el-icon>
            <span>心理测评</span>
            </el-menu-item>
            <el-sub-menu index="4"> 
        <template #title>
            <el-icon><User /></el-icon>
            <span>个人信息</span>
        </template>
        <el-menu-item index="4-1">我的信息</el-menu-item>
        <el-menu-item index="4-2">测评记录</el-menu-item>
        <el-menu-item index="4-3">咨询档案</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="5">
        <el-icon><Remove /></el-icon>
        <span>退出登录</span>
        </el-menu-item>
    </el-menu>
    <router-view></router-view>
</template>

<script>
import router from "@/router";
import {  
    House,
    ChatDotRound,
    Notebook,
    User,
    Remove} from "@element-plus/icons"
//import { ElMessage } from "element-plus";
export default {
//   components: {
//     ElMessage,
//   },
  components:{
    House,
    ChatDotRound,
    Notebook,
    User,
    Remove,
  },
  data() {
    return {};
  },
  methods: {
    goHome() {
      router.push({ name: "main" });
    },
    goTest(){//仅为测试用
      router.push({name:"login"});
    }
  },
};
</script>

<style scoped>
    .el-menu-vertical{
        height:100vh;
    }
</style>
