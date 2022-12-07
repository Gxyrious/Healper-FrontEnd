<template>
  <div class="common-layout body_card">
    <el-container>
      <el-header height="100px">
        <el-link type="primary" style="font-size: small;text-align: left;padding-left: 20px;padding-top: 50px;"
          @click="goLogin">
          <el-icon>
            <Right />
          </el-icon>
          <span>已有账号，登陆</span>
        </el-link>
        <div id="registerTips" style="text-align: center;margin-top: 50px;">
          <span>用户注册</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="700px">
          <img src="../assets/healper.png" class="drawing" style="zoom:40%;margin-top: 300px;margin-left: 500px;" />
        </el-aside>

        <el-main>
          <div class="registerField">
            <div class="inputCard">
              <div class="label">昵称</div>
              <el-row>
                <el-col :span="15">
                  <el-input v-model="nickname" class="w-50 m-2">
                    <template #suffix>
                      <el-icon color="#409eff">
                        <UserFilled />
                      </el-icon>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </div>

            <div class="inputCard">
              <div class="label">手机号</div>
              <el-row>
                <el-col :span="15">
                  <el-input v-model="userPhone" class="w-50 m-2">
                    <template #suffix>
                      <el-icon color="#409eff">
                        <UserFilled />
                      </el-icon>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </div>

            <div class="inputCard">
              <div class="label">验证码</div>
              <el-row>
                <el-col :span="15">
                  <el-input v-model="idenCode" style="width:340px" v-on:input="validateCAPTCHA()">
                    <template #append>
                      <el-button type="primary" @click="getIdeCode" :disabled="isDisposed">
                        {{
                            this.isDisposed
                              ? `${this.time}s后重新获取`
                              : "获取验证码"
                        }}
                      </el-button>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </div>

            <div class="inputCard">
              <div class="label">密码</div>
              <el-row>
                <el-col :span="15">
                  <el-input v-model="userPassword" class="w-50 m-2" type="password" clearable />
                </el-col>
              </el-row>
            </div>

            <div class="inputCard">
              <div class="label">确认密码</div>
              <el-row>
                <el-col :span="15">
                  <el-input v-model="tmpPassword" class="w-50 m-2" type="password" v-on:input="validatePassword()"
                    clearable>
                    <template #append>
                      <el-icon v-if="check" style="color: green">
                        <SuccessFilled />
                      </el-icon>
                      <el-icon v-else style="color: #f56c6c">
                        <WarningFilled />
                      </el-icon>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </div>

            <div class="inputCard">
              <el-row>
                <el-col :span="3" style="padding-top: 4px">性别</el-col>
                <el-col :span="12">
                  <el-radio-group class="select-sex" v-model="this.sex">
                    <el-radio label="m">男</el-radio>
                    <el-radio label="f">女</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
            </div>

            <div class="inputCard">
              <el-row>
                <el-col :span="3" style="padding-top: 4px">性别</el-col>
                <el-col :span="12">
                  <el-select v-model="this.age" clearable placeholder="Select">
                    <el-option v-for="age in age_list" :key="age" :label="age" :value="age" />
                  </el-select>
                </el-col>
              </el-row>
            </div>

            <div class="buttonCard">
              <el-button type="primary" @click="register">注册</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog v-model="dialogVisible" title="注册成功" width="40%" :before-close="handleClose" append-to-body>
      <span>您的昵称为 {{ this.nickname }} </span>
      <br />
      <span>您的注册手机号为 {{ this.userPhone }} </span>
      <br />
      <span>您的ID为 {{ this.userId }} </span>
      <br />
      <span>您的密码为 {{ this.userPassword }} </span>
      <br />
      <span>请您牢记以上信息, 手机号及密码将作为用户登录唯一凭证</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="closeDialog">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
// import { Right } from "@element-plus/icons";
import axios from "axios";
// import store from "@/store";
// import { tryOnBeforeMount } from "@vueuse/core";
export default {
  //   components: { ElMessage },
  created() {
    for (var i = 1; i <= 100; i++) {
      this.age_list.push(i);
    }
  },
  data() {
    return {
      idenCode: "",
      nickname: "",
      userPhone: "",
      userPassword: "",
      sex: "",
      age: "",
      userId: "",
      tmpPassword: "",
      time: 60,
      isDisposed: false,
      check: false,
      dialogVisible: false,
      age_list: [],
    };
  },
  methods: {
    goLogin() {
      this.$router.replace("/login");
    },
    register() {
      if (
        this.nickname === "" ||
        this.userPhone === "" ||
        this.idenCode === "" ||
        this.userPassword === "" ||
        this.tmpPassword === "" ||
        this.sex === "" ||
        this.age === ""
      ) {
        ElMessage.error("以上均为必填项！");
        return;
      } else if (this.userPassword !== this.tmpPassword) {
        ElMessage.error("两次输入密码不相同！请再次确认密码");
        return;
      } else if (!this.validatePhone) {
        ElMessage({
          message: "请输入正确的手机号！",
          grouping: true,
          type: "error",
        });
        return;
      } else {
        axios({
          url: "/api/user/register",
          method: "post",
          data: {
            nickname: this.nickname,
            userPhone: this.userPhone,
            password: this.userPassword,
            sex: this.sex,
            age: this.age,
            code: this.idenCode,
          }
        })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.userId = res.data;
              ElMessage({
                message: "注册成功！您的id是" + this.userId,
                type: "success",
              });
              this.dialogVisible = true;
            } else {
              ElMessage.error("注册失败！");
              this.userPhone = "";
              this.userPassword = "";
              this.idenCode = "";
              this.tmpPassword = "";
            }
          })
          .catch((err) => {
            console.log(err);
            ElMessage.error(err.response.data);
            this.userPhone = "";
            this.userPassword = "";
            this.idenCode = "";
            this.tmpPassword = "";
          });
      }
    },
    validatePhone() {
      var reg = /^1[3456789]\d{9}$/;
      return reg.test(this.userPhone);
    },
    validateCAPTCHA() {
      if (this.idenCode === "") {
        ElMessage.error("验证码不可为空！");
      } else {
        if (this.idenCode !== "") {
          var reg = /^\d{1,6}$/;
          if (!reg.test(this.idenCode)) {
            ElMessage({
              message: "请输入正确的验证码！",
              grouping: true,
              type: "error",
            });
          }
        }
      }
    },
    validatePassword() {
      if (this.userPassword === "") {
        ElMessage({
          message: "请先输入密码",
          grouping: true,
          type: "error",
        });
      } else if (this.userPassword !== this.tmpPassword) {
        this.check = false;
      } else {
        ElMessage.success("两次输入密码相同");
        this.check = true;
      }
    },
    handleTimeChange() {
      if (this.time <= 0) {
        this.isDisposed = false;
        this.time = 60;
      } else {
        setTimeout(() => {
          this.time--;
          this.handleTimeChange();
        }, 1000);
      }
    },
    getIdeCode() {
      console.log("send" + this.userPhone);
      console.log("age = " + this.age);
      var reg = /^1[3456789]\d{9}$/;
      if (this.userPhone === "" || !reg.test(this.userPhone)) {
        ElMessage({
          message: "请输入正确的手机号！",
          grouping: true,
          type: "error",
        });
        this.userPhone = "";
        return;
      }
      axios({
        url: "api/user/sendMsg",
        method: "post",
        data: {
          userPhone: this.userPhone
        }
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            console.log("验证码发送成功！");
            ElMessage({
              message: "验证码发送成功！",
              grouping: true,
              type: "success",
            });
            this.isDisposed = true;
            this.handleTimeChange();
          }
          else {
            ElMessage({
              message: "验证码发送失败！",
              grouping: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          ElMessage({
            message: "该手机号已被注册！",
            grouping: true,
            type: "error",
          })
        })
    },
    handleClose() {
      ElMessageBox.confirm("确认关闭此对话框吗?")
        .then(() => {
          this.dialogVisible = false;
          // done();
        })
        .catch(() => {
          // catch error
        });
    },
    closeDialog() {
      this.dialogVisible = false;
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
#registerTips {
  font-size: 40px;
  font-family: SimSun;
  font-weight: bolder;
  margin-top: 5%;
}

.drawing {
  height: 600px;
}

.registerField {
  margin-top: 15%;
}

.inputCard {
  margin-top: 5%;
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
  --el-input-bg-color: #ffffff00;
  --el-input-hover-border-color: #88c3fe;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.body_card {
  width: 98%;
  margin-left: 1%;
  border-radius: 17px;
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
}
</style>
