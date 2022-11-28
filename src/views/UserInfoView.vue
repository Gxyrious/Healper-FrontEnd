<!--
描述：个人信息
作者：张泰圣
-->

<template>
<el-container>
  
    <el-header>
        <el-page-header @back="goHome" >
          <template #breadcrumb>
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/userinfo' }">我的信息</el-breadcrumb-item>
            </el-breadcrumb>
          </template>
          <template #title>
            <span>返回</span>
          </template>
          <template #content>
            <span class="text-large font-600 mr-3"> 我的信息 </span>
         </template>
        </el-page-header>
    </el-header>

    
    <el-main>
        <el-row class="head">
            <el-col :span="2" >
                <div class="avator">
                   <el-avatar shape="square" :size="60" :src="squareUrl" />
                </div>
            </el-col>
            <el-col :span="10">
                <div class="brief">
                    <p class="name">{{userName}}</p>
                    <p class="age">{{age}} | {{gender}}</p>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="password">
                    <el-button type="primary" class="pdbutton"><el-icon class="el-icon--left"><Edit></Edit></el-icon>修改密码</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-column :span="24">
            <el-descriptions
             title="详细信息"
             :column="3"
             size="large"
             border>
            <el-descriptions-item width="170px">
              <template #label>
              <div class="cell-item">
              <el-icon :style="iconStyle"><User /></el-icon>
              昵称
              </div>
              </template>
              {{userName}}
              <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
            </el-descriptions-item>
             
    <el-descriptions-item width="170px">
      <template #label>
        <div class="cell-item" >
          性别
        </div>
      </template>
     {{gender}}
     <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
    </el-descriptions-item>
    <el-descriptions-item width="170px">
      <template #label>
        <div class="cell-item">
          年龄
        </div>
      </template>
      {{age}}
      <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
    </el-descriptions-item>
    <el-descriptions-item >
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Iphone />
          </el-icon>
          手机号码
        </div>
      </template>
      {{telephone}}
      <el-button type="primary" class="ebutton"><el-icon class="el-icon--left"><Edit></Edit></el-icon>修改绑定手机号</el-button>
    </el-descriptions-item>
  </el-descriptions>
</el-column>
    </el-row>
    <el-row :gutter="40" class="record">

        <el-col :span="12">
            <p class="retitle">最近的测评记录</p>
            <el-table :data="recentTest" border style="width: 100%">
    <el-table-column prop="date" label="时间" width="180" />
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column  label="操作">
        <template #default>
        <el-button link  size="small" @click="handleClick">查看</el-button>
        </template>
    </el-table-column>
  </el-table>
        </el-col>

        <el-col :span="12">
            <p class="retitle">最近的咨询档案</p>
            <el-table :data="recentConsult" border style="width: 100%">
    <el-table-column prop="date" label="时间" width="180" />
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column  label="操作">
        <template #default>
        <el-button link  size="small" @click="handleClick">查看</el-button>
        </template>
    </el-table-column>
  </el-table>
        </el-col>
    </el-row>
    </el-main>
</el-container>
</template>

<script>
import router from "@/router";
import {  
    Edit,
    User,
    Iphone
} from "@element-plus/icons-vue"


export default {
  methods: {
    goHome() {
      router.push({ name: "main" });
    },
  },
  components:{
    Edit,
    User,
    Iphone
  },
  data() {
    return {
        squareUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        userName: "Ken",
        age: 20,
        gender: "男",
        telephone: "12345678900",
        recentTest: [
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
        ],
        recentConsult: [
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
        ]
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
    box-shadow: var(--el-box-shadow);
}

p.name{
    line-height: 20%;
    font-size: 20px;
}
p.age{
    line-height: 20%;
    font-size: 12px;
    color: #878787;

}
.pdbutton{
    float:right;
    margin-right: 20px;
    margin-top:10px;
}
.ebutton{
    float:right;
}
.avatar{
    float:left;
}
.brief{
    float:left;
}
.el-descriptions{
    margin-top: 30px;
}
</style>
