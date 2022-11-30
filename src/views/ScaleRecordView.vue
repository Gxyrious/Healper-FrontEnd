<!--
  描述：测评记录
  作者：张泰圣
-->

<template>
    <el-container>
        <el-header>
          <el-breadcrumb>
                  <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/userInfo' }">我的信息</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/scaleRecord' }">测评记录</el-breadcrumb-item>
                </el-breadcrumb>
        </el-header>
        <el-row justify="center" class="tabs">
            <el-col :span="23">
                <el-tabs v-model="activeName">
    <el-tab-pane label="历史记录" name="first">
  <el-table :data="scaleRecord" height="600" style="width: 100%">
    <el-table-column prop="date" label="时间" width="400" />
    <el-table-column prop="name" label="名称" width="400" />
    <el-table-column  label="操作">
        <template #default>
        <el-button link  size="small" @click="handleClick">查看</el-button>
        <el-button link  size="small" @click="handleClick">删除</el-button>
        </template>
    </el-table-column>
  </el-table>

    </el-tab-pane>
    <el-tab-pane label="统计分析" name="second">
  
  <div style="width: auto;height: 400px" id="main">
  </div>


    </el-tab-pane>
  </el-tabs>
            </el-col>
        </el-row>
        <el-main>
            
        </el-main>
    </el-container>
</template>

<script>
    import router from "@/router"
    
    import {  
        
    } from "@element-plus/icons-vue"
    
    export default {
      methods: {
        goUserInfo() {
          router.push({ name: "userInfo" });
        },
      },
      components:{
        
      },
      data() {
        return {
           activeName: "first",
           scaleRecord: [
            {date: "1234", name: "1234", emo1: 1, emo2: 1, emo3: 1, emo4: 5, emo5: 6},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
        ],
        };
      },
    };
</script>
    
<style scoped>
    
    .tabs{
        background:#ffffff
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
    