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
    <el-container>
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
        <el-header>
          <el-breadcrumb>
                  <el-breadcrumb-item :to="{ path: '/consultantInfo' }">个人信息</el-breadcrumb-item>
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
                  姓名
                  </div>
                  </template>
                  {{userName}}
                  <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
                </el-descriptions-item>
                 
        <el-descriptions-item width="150px">
          <template #label>
            <div class="cell-item" >
              性别
            </div>
          </template>
         {{gender}}
         <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
        </el-descriptions-item>
        <el-descriptions-item width="150px">
          <template #label>
            <div class="cell-item">
              年龄
            </div>
          </template>
          {{age}}
          <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
        </el-descriptions-item>
        <el-descriptions-item width="150px">
          <template #label>
            <div class="cell-item">
              咨询费用
            </div>
          </template>
          {{fee}}
          <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
        </el-descriptions-item>
        <el-descriptions-item width="150px">
          <template #label>
            <div class="cell-item">
              标签
            </div>
          </template>
          <el-tag v-for="item in label" style="margin: 5px" :key="item">{{item}}</el-tag>
          <el-button class="ebutton" circle ><el-icon :style="iconStyle"><Edit /></el-icon></el-button>
        </el-descriptions-item>
      </el-descriptions>
    </el-column>
        </el-row>
        </el-main>
    </el-container>
    </template>
    
    <script>
    import { ElMessage } from "element-plus";
    import {  
        Edit,
        User,
        Plus,
    } from "@element-plus/icons-vue"
    import axios from "axios";
    
    
    export default {
      created(){
        axios({
          method: 'get',
          url: 'api/user/info',
          params:{
            id: this.id,
            userType: "consultant",
          }
        }).then((res)=>{
          console.log("res", res);
          this.userName = res.data.realname;
          this.age = res.data.age;
          var random = Math.ceil(Math.random() * 100000);
          this.squareUrl = res.data.profile + '?' + random;
          this.fee = res.data.expense;
          this.telephone = res.data.userphone;
          this.label = JSON.parse(res.data.label);
          if (res.data.sex == "f"){
            this.gender = "女";
          }
          else{
            this.gender = "男";
          }
        })
      },
      methods: {
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
        editAvatar(){
    axios({
      method: 'post',
      url: 'api/user/uploadProfile',
      data:{
        base64: this.newProfile,
        id: this.id,
        userType: "consultant",
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
      },
      components:{
        Edit,
        User,
        Plus
      },
      data() {
        return {
            id: this.$store.state.userInfo.user.id,
            squareUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            userName: "",
            age: 0,
            gender: "",
            telephone: "",
            fee: 0,
            label:[
                "标签1", "标签2"
            ],
            isEditingAvatar: false,
            newProfile: null,
            isEditingPassword: false,
            form: {oldPassword: "", newPassword: ""},
        rules: {
          oldPassword:[{ required: true, message: '不能为空', trigger: 'blur' },],
          newPassword:[{ required: true, message: '不能为空', trigger: 'blur' },],
        }
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
    