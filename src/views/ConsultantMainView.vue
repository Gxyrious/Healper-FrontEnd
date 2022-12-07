<template>
    <el-container>
      <el-header>
        <el-breadcrumb>
          <el-breadcrumb-item >首页</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main style="background: #f4f4f5;
                      padding-left:0px;
                      padding-right:0px;
                      padding-top:20px;">
        <el-container>
        <el-aside style="width:60%">
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
          <div style="background:#fff;margin-left:30px;margin-top:30px;">
            <el-row style="font-weight:bolder;margin-bottom:30px;padding-left:30px;padding-top:20px;">推荐咨询师</el-row>
            <el-row>
              <el-col :span="12" v-for="i in consultant_info" :key=i>
              <consultation-card :info="i">
             </consultation-card>
              </el-col>
            </el-row>
          </div>
        </el-aside>
        <el-main style="padding-top:0px;padding-left:30px;">
          <div style="background:#fff;padding-top:20px;padding-bottom:5px;">
            <div style="font-weight:bolder;margin-left:30px;margin-bottom:20px;">待开始的咨询</div>
            <consultation-card :info=consultant_info[2]></consultation-card>
          </div>
          <div style="padding:20px 30px;background:#fff;margin-top:30px;">
            <div style="font-weight:bolder;margin-bottom:20px;">推荐量表</div>
            <scale-card></scale-card>
          </div>
        </el-main>
        </el-container>
      </el-main>
    </el-container>
</template>

<script>
//import NavBar from "../../src/components/NavBar/NavBar";
import ConsultationCard from "../components/Consult/ConsultantCard.vue"
import ScaleCard from "../components/Scale/ScaleCard"
import {  
    Search
} from "@element-plus/icons-vue"
export default {
  components:{
    Search,
    ConsultationCard,
    ScaleCard,
    //NavBar
  },
  data() {
    return {
      userName:"美女",
      age:20,
      sex:"女",
      consultant_info:[{
            name:"美女",
            sex:"女",
            age:20,
            price:648,
            tagList:[
                {tag:"焦虑"}
            ],
            curNum:12,
            maxNum:30,
            time:"11/11 11:11",
        },
        {   name:"超级美女",
            sex:"女",
            age:20,
            price:648,
            tagList:[
                {tag:"焦虑"}
            ],
            curNum:14,
            maxNum:20,
            time:"11/11 11:11",
        },
        {   name:"普通美女",
            sex:"女",
            age:20,
            price:648,
            tagList:[
                {tag:"焦虑"},
                {tag:"抑郁"}
            ],
            curNum:14,
            maxNum:20,
            time:"11/11 11:11",
        },
        {   name:"无敌美女",
            sex:"女",
            age:20,
            price:648,
            tagList:[
                {tag:"焦虑"},
                {tag:"抑郁"}
            ],
            curNum:14,
            maxNum:20,
            time:"11/11 11:11",
        },
        ],
    };
  },
  methods: {
    goUserInfo(){
      this.$router.replace("/userInfo");
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