<template>
    <div class="common-layout body_card" >
      <el-container>
        <el-header>
          <div id="registerTips">
            <el-link type="primary" style="font-size: small" @click="goRegister">
              <span>还没有账号，注册——</span>
            </el-link>
          </div>
          <el-row>
            <el-col :span=8 id="">
              <img src="../assets/healper.png" style="zoom:40%;margin-left: 200px;"/>
            </el-col>
            <el-col :span=8>
              <div id="signInTips" style="text-align: center;margin-top: 50px;">
                <span>用户登录</span>
              </div>
            </el-col>
            <el-col :span=8></el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside width=38%>
          </el-aside>
          <el-main>
            <div class="loginField">
              <div class="inputCard">
                <div class="label">用户手机号</div>
                <el-row>
                  <el-col :span="12">
                    <el-input
                      v-model="userPhone"
                      class="w-50 m-2"
                      :input-style="this.input_style"
                    >
                      <template #suffix>
                        <el-icon color="#409eff"><UserFilled /></el-icon>
                      </template>
                    </el-input>
                  </el-col>
                </el-row>
              </div>
  
              <div class="inputCard">
                <div class="label">密码</div>
                <el-row>
                  <el-col :span="12">
                    <el-input
                      v-model="userPassword"
                      class="w-50 m-2"
                      type="password"
                      clearable
                    />
                  </el-col>
                </el-row>
              </div>
              <div class="buttonCard">
                <el-button type="primary" @click="login">登录</el-button>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
import store from "@/store";
export default {
//   components: { ElMessage },
  data() {
    return {
      userPhone: "",
      userPassword: "",
    };
  },
  methods: {
    goRegister() {
       this.$router.replace("/register");
    },
    login() {
      /*此处日后需要加数据格式验证*/
      console.log(this.userPhone)
      console.log(this.userPassword)
      axios({
        url:"api/user/login",
        method: "post",
        data: {
          userPhone: this.userPhone,
          userPassword: this.userPassword,
        }
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            var userInfo = res.data;

            //若成功登录
            
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            store.state.userInfo = userInfo;
            this.$emit('login');
            userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (userInfo.userType == "client")
              this.$router.replace("/main");
            else if (userInfo.userType == "consultant")
            this.$router.replace("/consultantMain");
            ElMessage({
              message: userInfo.user.nickname + "，欢迎您！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
          } else {
            //若登录失败
            ElMessage.error("用户手机号或密码不正确！");
            (this.userPhone = ""), (this.userPassword = "");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#registerTips {
  font-size: small;
  text-align: right;
  padding-right: 20px;
  padding-top: 50px;
}

#registerTips .el-icon {
  margin-left: 5px;
}

#signInTips {
  font-size: 40px;
  font-family: SimSun;
  font-weight: bolder;
}

.el-container{
  height:100vh;
}

.loginField {
  margin-top: 30%;
}

.inputCard {
  margin-top: 10%;
}

.inputCard .label {
  text-align: left;
  margin-bottom: 5px;
}

.buttonCard {
  margin-left:15%;
  margin-top:5%;
}

.el-input {
  --el-input-bg-color: #ffffff00;
  --el-input-hover-border-color: #88c3fe;
}

.body_card {
  width:98%;
  margin-left: 1%;
  border-radius: 17px;
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
}
</style>