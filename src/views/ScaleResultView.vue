<template>
    <el-container>
        <el-header>
          <el-breadcrumb>
                  <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/userInfo' }">我的信息</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/scaleRecord' }">测评记录</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/scaleResult' }">测评结果</el-breadcrumb-item>
                </el-breadcrumb>
        </el-header>
        
        <el-main style="margin:20px 30px; background:#ffffff;">
            <el-row style="font-weight:bolder;margin-bottom:30px;padding-left:30px">{{scaleName}}</el-row>
          <el-row justify="center">
            <el-col :span="23">
                <ResultChart ></ResultChart>
            </el-col>
        </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import router from "@/router"
    
    import {  

    } from "@element-plus/icons-vue"
    import ResultChart from '../components/Scale/ResultChart.vue'
    
    export default {
      
      methods: {
        goUserInfo() {
          router.push({ name: "userInfo" });
        },
      },
      components:{
        ResultChart,
      },
      data() {
        return {
           record: null,
           scaleName: "",
        
        };
      },
    };
</script>
    
<style scoped>
    
    .tabs{
        background:#ffffff
    }
    .el-container{
        background: #f4f4f5;
        
    }
    .el-header{
    margin-left:5px;
    border-bottom: 0.6px solid rgb(174, 174, 174);
    padding-top:20px;
    padding-bottom:20px;
    background: #ffffff;
}
    
    
    
</style>
    