<template>
    <el-container>
      <el-header>
        <el-breadcrumb>
          <el-breadcrumb-item >首页</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main style="background: #f4f4f5;
                      padding-left:0px;
                      padding-right:30px;
                      padding-top:20px;">
          <el-row class="head" justify="center">
            <el-col :span="3" >
              <el-avatar shape="square" :size="60" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </el-col>
            <el-col :span="8">
                <div class="brief">
                    <p class="name">{{userName}}</p>
                    <p class="age">{{age}} | {{sex}}</p>
                </div>
            </el-col>
            <el-col :span="11">
                <div class="password">
                    <el-button type="primary" class="pdbutton" @click="goUserInfo">
                      <el-icon><Search /></el-icon>
                      个人中心
                    </el-button>
                </div>
            </el-col>
          </el-row>
          <div style="background:#fff;margin-top:30px;margin-left:30px;padding:30px 0;">
            <el-row style="font-weight:700;padding-left:10px;padding-right:30px">
              <el-col :span="5">
                <div class="go" @click="goTest">
                  <div class="book"><img src="../../src/assets/book.png" width=90></div>
                  <div style="padding-left:20px">进行测评</div>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="go" @click="goConsult">
                  <div class="book"><img src="../../src/assets/book.png" width=90></div>
                  <div style="padding-left:20px">预约咨询</div>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="go" @click="goDocument">
                  <div class="book"><img src="../../src/assets/book.png" width=90></div>
                  <div style="padding-left:20px">咨询档案</div>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="go" @click="goTestResult">
                  <div class="book"><img src="../../src/assets/book.png" width=90></div>
                  <div style="padding-left:20px">测评结果</div>
                </div>
              </el-col>
              <el-col :span="4" @click="goOrder">
                <div class="go">
                  <div class="book"><img src="../../src/assets/book.png" width=90></div>
                  <div style="padding-left:20px;">历史订单</div>
                </div>
              </el-col>
            </el-row>
          </div>
      </el-main>
    </el-container>
</template>

<script>
//import NavBar from "../../src/components/NavBar/NavBar";
import {  
    Search
} from "@element-plus/icons-vue"
export default {
  components:{
    Search,
    //NavBar
  },
  data() {
    return {
      userName:"美女",
      age:20,
      sex:"女",
    };
  },
  methods: {
    goUserInfo(){
      this.$router.replace("/consultantInfo");
    },
    goTest(){
      this.$router.replace("/test");
    },
    goConsult(){
      this.$router.replace("/consultation");
    },
    goDocument(){
      this.$router.replace("/documentRecord");
    },
    goTestResult(){
      this.$router.replace("/documentRecord");
    },
    goOrder(){
      this.$router.replace("/order");
    },
  }
};
</script>

<style scoped>
  .el-header{
    margin-left:5px;
    border-bottom: 0.6px solid rgb(174, 174, 174);
    padding-top:20px;
    padding-bottom:20px;
}

  .head{
    height:120px;
    background:#FFFFFF;
    padding-top:30px;
    margin-left:30px;
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

  .book{
    padding-left:3px;
    margin-bottom:0;
  }

  .go{
    cursor:pointer;
  }
</style>