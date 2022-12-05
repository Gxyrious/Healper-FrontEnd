<!--
描述：个人信息
作者：张泰圣
-->

<template>
  
  <el-dialog v-model="isEditingPassword" title="修改密码">
    <el-form :model="form" :rules="rules">
      <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassword">
        <el-input v-model="form.oldPassword" autocomplete="off" type="password"/>
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
        <el-input v-model="form.newPassword" autocomplete="off" type="password"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="(isEditingPassword = false)">取消</el-button>
        <el-button type="primary" @click="editPassword()">
          修改
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="isEditingAvatar" title="修改头像">
    <el-upload
    class="avatar-uploader"
    :on-change="onChange"
    :auto-upload="false"
    limit="1"
    ref="uploadRef"
  >
    <img v-if="newProfile" :src="newProfile" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isEditingAvatar = false">取消</el-button>
        <el-button type="primary" @click="editAvatar">
          修改
        </el-button>
      </span>
    </template>
  </el-dialog>
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
                   <el-avatar shape="square" :size="60" :src="squareUrl" @click="isEditingAvatar = true"/>
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
                    <el-button type="primary" class="pdbutton" @click="isEditingPassword = true"><el-icon class="el-icon--left"><Edit></Edit></el-icon>修改密码</el-button>
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
    <el-table-column prop="endTime" label="时间" width="170" />
    <el-table-column prop="scaleName" label="名称" width="170" />
    <el-table-column  label="操作">
        <template #default="scope">
        <el-button link  size="small" @click="viewResult(scope.row.scaleName, scope.row.record)">查看</el-button>
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
        <template #default="scope">
          <el-popover
    placement="top-start"
    title="建议"
    :width="400"
    trigger="click"
    :content="scope.row.advice"
  >
  
  <template #reference>
        <el-button link  size="small" @click="handleClick">查看</el-button>
      </template>
          </el-popover>
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
Check,
Plus,
} from "@element-plus/icons-vue"
import axios from "axios";
import { ElMessage, UploadInstance} from "element-plus";
import { ref } from "vue";

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
      var random = Math.ceil(Math.random() * 100000);
      this.squareUrl = res.data.profile + '?' + random;
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
      url: 'api/history/archives',
      params:{
        clientId: this.id,
        page: 1,
        size: 5,
      }
    }).then((res)=>{
      console.log("res", res);
      this.recentDocument = res.data;
      for (var i = 0; i < this.recentDocument.length; i++){
        this.recentDocument[i].endTime = this.getDate(this.recentDocument[i].endTime);
      }
    });

    axios({
      method: 'get',
      url: 'api/scale/getRecord',
      params:{
        clientId: this.id,
        page: 1,
        size: 5,
      }
    }).then((res)=>{
      console.log("res", res);
      this.recentScale = res.data;
      for (var i = 0; i < this.recentScale.length; i++){
        this.recentScale[i].endTime = this.getDate(this.recentScale[i].endTime);
      }
    })
  },
  methods: {
    onChange(uploadFile){
  if (uploadFile.raw.type !== 'image/jpeg' && uploadFile.raw.type !== 'image/png') {
    ElMessage.error('请上传JPG/PNG格式文件')
    return false
  } else if (uploadFile.raw.size / 1024 / 1024 > 10) {
    ElMessage.error('文件不能超过10MB!')
    return false
  }
  console.log(uploadFile);
  var reader = new FileReader();
      reader.readAsDataURL(uploadFile.raw);
      reader.onload = (e) => {
        this.newProfile = e.target.result;
        console.log(this.newProfile);
      };
  return true
},
    getDate(n){
      n=new Date(n)
      return n.toLocaleDateString().replace(/\//g, "-") + " " + n.toTimeString().substr(0, 8)
    },
    goHome() {
      router.push({ name: "main" });
    },
    viewAllScale(){
        router.push({name: "scaleRecord"});
    },
    viewAllDocument(){
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
    savePassword(){
      this.isEditingPassword = false;
      axios({
      method: 'put',
      url: 'api/user/passwd',
      data:{
        id: this.id,
        oldPasswd: this.form.oldPassword,
        newPasswd: this.form.newPassword,
      }
    }).then((res)=>{
      if (res.status == 200){
        ElMessage({
              message: "修改成功",
              type: "success",
              showClose: true,
              duration: 2000,
            });
      }
      else{
        ElMessage({
              message: "密码错误",
              type: "error",
              showClose: true,
              duration: 2000,
            });
      }
    });
    this.form.oldPassword = "";
    this.form.newPassword = "";
    },
    editPassword(){
      if (this.form.newPassword == this.form.oldPassword){
        ElMessage({
              message: "不能输入相同的密码",
              type: "error",
              showClose: true,
              duration: 2000,
            });
      }
      else if (this.form.newPassword != "" && this.form.oldPassword != "")
        this.savePassword();
      
  },
  editAvatar(){
    axios({
      method: 'post',
      url: 'api/user/uploadProfile',
      data:{
        base64: this.newProfile,
        id: this.id,
        userType: "client",
      }
  }).then((res)=>{
      if (res.status == 200){
        ElMessage({
              message: "修改成功",
              type: "success",
              showClose: true,
              duration: 2000,
            });
      }
      else{
        ElMessage({
              message: "修改失败",
              type: "error",
              showClose: true,
              duration: 2000,
            });
      }
    });
  this.isEditingAvatar = false;
  this.squareUrl = this.newProfile;
},
viewResult(scaleName, record){
      this.$router.push({
        path: '/scaleResult',
        query: {
          scaleName: scaleName,
          record: record,
        }
      })
    }
},
  components:{
    Edit,
    User,
    Iphone,
    Check,
    Plus,
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
        isEditingPassword: false,
        isEditingAvatar: false,
        newProfile: null,
        uploadRef: ref<UploadInstance>(null),
        isShowingResult: true,
        genders: [
          "男", "女",
        ],
        recentScale: [
        ],
        recentDocument: [
           
        ],
        form: {oldPassword: "", newPassword: ""},
        rules: {
          oldPassword:[{ required: true, message: '不能为空', trigger: 'blur' },],
          newPassword:[{ required: true, message: '不能为空', trigger: 'blur' },],
        }
    };
  },
}
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

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
