<!--
  描述：用户首页
  作者：王若晗，张泰圣
-->

<template>
    <el-container>
      <el-header>
        
        <el-breadcrumb>
              <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
       
      </el-header>
      <el-main>
        这是首页
      </el-main>
    </el-container>
</template>

<script>
//import NavBar from "../../src/components/NavBar/NavBar";
export default {
  components:{
    //NavBar,
  },
  data() {
    return {
      
    };
  },
  methods: {
  },
};
</script>

<style scoped>
  .el-header{
    margin-left:5px;
    border-bottom: 0.6px solid rgb(174, 174, 174);
    padding-top:20px;
    padding-bottom:20px;
}

  .el-main{
    background: #f4f4f5;
    padding-top:100px;
    padding-left:40px;
  }
</style>