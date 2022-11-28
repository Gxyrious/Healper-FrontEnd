<!--
  描述：测评记录
  作者：张泰圣
-->

<template>
    <el-container>
        <el-header>
            <el-page-header @back="goUserInfo" >
              <template #breadcrumb>
                <el-breadcrumb :separator-icon="ArrowRight">
                  <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/userInfo' }">我的信息</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/testRecord' }">测评记录</el-breadcrumb-item>
                </el-breadcrumb>
              </template>
              <template #title>
                <span>返回</span>
              </template>
              <template #content>
                <span class="text-large font-600 mr-3"> 测评记录 </span>
             </template>
            </el-page-header>
        </el-header>
        <el-row justify="center" class="tabs">
            <el-col :span="23">
                <el-tabs v-model="activeName">
    <el-tab-pane label="历史记录" name="first">
  <el-table :data="testRecord" height="600" style="width: 100%">
    <el-table-column prop="date" label="时间" width="120" />
    <el-table-column prop="name" label="名称" width="120" />
    <el-table-column prop="emo1" label="情绪因子1" width="120" />
    <el-table-column prop="emo2" label="情绪因子2" width="120" />
    <el-table-column prop="emo3" label="情绪因子3" width="120" />
    <el-table-column prop="emo4" label="情绪因子4" width="120" />
    <el-table-column prop="emo5" label="情绪因子5" width="120" />
    <el-table-column  label="操作">
        <template #default>
        <el-button link  size="small" @click="handleClick">查看</el-button>
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
           testRecord: [
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
        box-shadow: var(--el-box-shadow);
    }
    
    
    
</style>
    