<template>
  <el-container>
    <el-aside width=200px>
      <nav-bar></nav-bar>
    </el-aside>
    <router-view></router-view>
  </el-container>
  
</template>

<script>
import NavBar from "../src/components/NavBar/NavBar";
export default {

  mounted(){
    this.$router.replace('/main')
  },
  components:{
    NavBar,
  },
};
</script>

<style>
</style>
