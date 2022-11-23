<template>
    <div class="common-layout body_card" >
      <el-container>
        <el-header>
          <div id="registerTips">
            <el-link type="primary" style="font-size: small" @click="goRegister"
              >还没有账号，注册<el-icon color="#409eff"><Right /></el-icon
            ></el-link>
          </div>
          <div id="signInTips">用户登录</div>
        </el-header>
        <el-container>
          <el-aside width="300px">
            <img src="../assets/tjdx.png" class="drawing" />
          </el-aside>
          <el-main>
            <div class="loginField">
              <div class="inputCard">
                <div class="label">用户手机号</div>
                <el-row>
                  <el-col :span="10">
                    <el-input
                      v-model="user_phone"
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
                  <el-col :span="10">
                    <el-input
                      v-model="user_password"
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
      user_phone: "",
      user_password: "",
    };
  },
  methods: {
    goRegister() {
    //   this.$router.replace("/register");
    },
    login() {
      /*此处日后需要加数据格式验证*/
      console.log(this.user_phone)
      console.log(this.user_password)
      axios({
        url:"api/user/login",
        method: "post",
        data: {
          userPhone: this.user_phone,
          userPassword: this.user_password,
        }
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            var user_info = res.data;
            //若成功登录
            ElMessage({
              message: user_info.username + "，欢迎您！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
            store.commit("loginIn", user_info); 
          } else {
            //若登录失败
            ElMessage.error("用户手机号或密码不正确！");
            (this.user_phone = ""), (this.user_password = "");
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
  color: #409eff;
  text-align: right;
  padding-right: 20px;
  padding-top: 50px;
}
#registerTips .el-icon {
  margin-left: 5px;
}
#signInTips {
  font-size: 40px;
  color: #409eff;
  font-family: SimSun;
  font-weight: bolder;
}
.drawing {
  height: 300px;
}
.loginField {
  margin-top: 30%;
}
.inputCard {
  color: #409eff;
  margin-top: 10%;
}
.inputCard .label {
  text-align: left;
  margin-bottom: 5px;
}
.buttonCard {
  margin-right: 58%;
  margin-top: 10%;
}
.el-input {
  --el-input-border-color: #a0cfff;
  --el-input-bg-color: #ffffff00;
  --el-input-hover-border-color: #88c3fe;
}
.body_card {
  width:98%;
  margin-left: 1%;
  border-radius: 17px;
  background: linear-gradient(#ffffffd0, #bdecfdd5);
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
}
</style>