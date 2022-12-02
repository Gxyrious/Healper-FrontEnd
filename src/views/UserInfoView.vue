<!--
描述：个人信息
作者：张泰圣
-->

<template>
<el-container>
  
    <el-header>
      <el-breadcrumb>
              <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/userInfo' }">我的信息</el-breadcrumb-item>
            </el-breadcrumb>
    </el-header>

    
    <el-main>
        <el-row class="head" justify="center">
            <el-col :span="2" >
                <div class="avator">
                   <el-avatar shape="square" :size="60" :src="squareUrl" />
                </div>
            </el-col>
            <el-col :span="9">
                <div class="brief">
                    <p class="name">{{userName}}</p>
                    <p class="age">{{age}} | {{gender}}</p>
                </div>
            </el-col>
            <el-col :span="11">
                <div class="password">
                    <el-button type="primary" class="pdbutton"><el-icon class="el-icon--left"><Edit></Edit></el-icon>修改密码</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row justify="center">
            <el-column :span="22">
            <el-descriptions
             title="详细信息"
             :column="3"
             size="large"
             border>
            <el-descriptions-item width="150px">
              <template #label>
              <div class="cell-item">
              <el-icon :style="iconStyle"><User /></el-icon>
              昵称
              </div>
              </template>
              <div v-if="!isEditingName">
              {{userName}}
              <el-button class="ebutton"  @click="editName" circle><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
            </div>
              <div v-else>
                <el-input v-model="userName">
                  <template #append>
                    <el-button class="ebutton"  @click="saveName"><el-icon :style="iconStyle"><Check /></el-icon></el-button>
                    </template>
                </el-input>
              
            </div>
            </el-descriptions-item>
             
    <el-descriptions-item width="150px">
      <template #label>
        <div class="cell-item" >
          性别
        </div>
      </template>
      <div v-if="!isEditingGender">
     {{gender}}
     <el-button class="ebutton" circle @click="editGender"><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
      </div>
     <div v-else>
      <el-row>
        <el-col :span="12">
      <el-select v-model="gender">
    <el-option
      v-for="item in genders"
      :key="item"
      :value="item"
    />
  </el-select>
</el-col>
<el-col :span="12">
  <el-button class="ebutton"  @click="saveGender"><el-icon :style="iconStyle"><Check /></el-icon></el-button>
</el-col>
</el-row>
     </div>
    </el-descriptions-item>
    <el-descriptions-item width="150px">
      <template #label>
        <div class="cell-item">
          年龄
        </div>
      </template>
      <div v-if="!isEditingAge">
      {{age}}
      <el-button class="ebutton" circle @click="editAge"><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
    </div>
    <div v-else>

      <el-input-number
    v-model="age"
    :min="0"
    :max="120"
    controls-position="right"
  />


  <el-button class="ebutton"  @click="saveAge"><el-icon :style="iconStyle"><Check /></el-icon></el-button>
    </div>
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
    <el-row :gutter="100" class="record" justify="center">

        <el-col :span="11">
            <p class="retitle">最近的测评记录
                <el-button type="primary" class="ebutton" id="test" @click="viewAllScale">查看全部</el-button></p>
            
            <el-table :data="recentScale" border style="width: 100%">
    <el-table-column prop="date" label="时间" width="170" />
    <el-table-column prop="name" label="名称" width="170" />
    <el-table-column  label="操作">
        <template #default>
        <el-button link  size="small" @click="handleClick">查看</el-button>
        </template>
    </el-table-column>
  </el-table>
        </el-col>

        <el-col :span="11">
            <p class="retitle">最近的咨询档案
                <el-button type="primary" class="ebutton" @click="viewAllDocument">查看全部</el-button></p>
            <el-table :data="recentDocument" border style="width: 100%">
    <el-table-column prop="endTime" label="时间" width="170" />
    <el-table-column prop="consultantRealName" label="咨询师" width="170" />
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
    Iphone,
Check
} from "@element-plus/icons-vue"
import axios from "axios";


export default {
  created(){
    axios({
      method: 'get',
      url: 'api/user/info',
      params:{
        id: this.id,
        userType: "client",
      }
    }).then((res)=>{
      console.log("res", res);
      this.userName = res.data.nickname;
      this.age = res.data.age;
      this.squareUrl = res.data.profile;
      this.telephone = res.data.userphone;
      if (res.data.sex == "f"){
        this.gender = "女";
      }
      else{
        this.gender = "男";
      }
    });

    axios({
      method: 'get',
      url: 'api/history/archive/getSome',
      params:{
        clientId: this.id,
        page: 1,
        size: 5,
      }
    }).then((res)=>{
      console.log("res", res);
      //this.recentDocument = JSON.parse(res.data);
    })
  },
  methods: {
    goHome() {
      router.push({ name: "main" });
    },
    viewAllScale(){
        router.push({name: "scaleRecord"});
    },
    viewAllDocumnet(){
        router.push({name: "documentRecord"});
    },
    editName(){
      this.isEditingName = true;
    },
    saveName(){
      this.isEditingName = false;
      axios({
      method: 'put',
      url: 'api/user/info',
      data:{
        id: this.id,
        nickname: this.userName,
      }
    })
    },
    editGender(){
      this.isEditingGender = true;
    },
    saveGender(){
      this.isEditingGender = false;
      var sex = "";
      if (this.gender == "男")
        sex = "m";
      else
        sex = "f";
      axios({
      method: 'put',
      url: 'api/user/info',
      data:{
        id: this.id,
        sex: sex,
      }
    })
    },
    editAge(){
      this.isEditingAge = true;
    },
    saveAge(){
      this.isEditingAge = false;
      axios({
      method: 'put',
      url: 'api/user/info',
      data:{
        id: this.id,
        age: this.age,
      }
    })
    },
  },
  components:{
    Edit,
    User,
    Iphone,
    Check
},
  data() {
    return {
        id: this.$store.state.userInfo.user.id,
        squareUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        userName: "",
        age: 0,
        gender: "",
        telephone: "",
        isEditingName: false,
        isEditingGender: false,
        isEditingAge: false,
        genders: [
          "男", "女",
        ],
        recentScale: [
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
        ],
        recentDocument: [
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
.head{
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
    margin-top: 50px;
    
}
.el-header{
    margin-left:5px;
    border-bottom: 0.6px solid rgb(174, 174, 174);
    padding-top:20px;
    padding-bottom:20px;
}
</style>
