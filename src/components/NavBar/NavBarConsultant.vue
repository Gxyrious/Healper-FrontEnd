<!--
描述：导航栏
作者：张泰圣、王若晗
-->

<template>
    <div style="margin-left:20px;">
        <img src="../../assets/healper.png" style="zoom:30%; object-fit: contain;"/>
    </div>
    <el-menu
        default-active="main"
        class="el-menu-vertical"
        router=true
        length=1000px
        @select="handleSelect"
    >
        <el-menu-item index="consultantMain">
            <el-icon><ChatDotRound /></el-icon>
            <span>首页</span>
        </el-menu-item>
            <el-menu-item index="consultantOrder">
            <el-icon><Notebook /></el-icon>
            <span>咨询历史</span>
            </el-menu-item>
            <el-menu-item index="consultantInfo">
            <el-icon><User /></el-icon>
            <span>个人信息</span>
            </el-menu-item>
        <el-menu-item index="login" @click="logout">
        <el-icon><Remove /></el-icon>
        <span>退出登录</span>
        </el-menu-item>
    </el-menu>

</template>

<script>
import router from "@/router";
import store from "@/store";
import {  
    ChatDotRound,
    Notebook,
    User,
    Remove} from "@element-plus/icons-vue"
//import { ElMessage } from "element-plus";
export default {
//   components: {
//     ElMessage,
//   },
  components:{
    ChatDotRound,
    Notebook,
    User,
    Remove,
  },
  data() {
    return {
    };
  },
  methods: {
    logout() {
      store.state.userInfo = null;
      localStorage.clear();
      router.replace('/login');
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
    .el-menu-vertical{
        height:100vh;
    }
</style>
