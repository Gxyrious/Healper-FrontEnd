<!--
  描述：用户首页
  作者：王若晗，张泰圣
-->

<template>
    <el-container>
      <el-header style="padding:0">
        
        <div>
        <el-row id="header">
          <el-col :span=5>
            首页
          </el-col>
        </el-row>
        </div>
       
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
  #header{
    padding-top:24px;
    padding-left:5%;
    height:80px;
    box-shadow:5px 2px 10px rgb(199, 206, 206);
    font-size: 20px;
    font-weight: 500;
    
  }

  .el-main{
    background: #f4f4f5;
    padding-top:100px;
    padding-left:40px;
  }
</style>