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
  components: {
    NavBar,
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === null) {
      this.$router.replace('/login');
    } else {
      this.$router.replace('/main');
    }
  }
};
</script>

<style>
</style>
