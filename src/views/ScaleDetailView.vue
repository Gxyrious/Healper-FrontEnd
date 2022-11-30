<template>
  <el-container>
    <el-header>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/scale' }">心理测评</el-breadcrumb-item>
        <el-breadcrumb-item>心理量表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    
    <el-main>
      <div class="scale-name">
        <span>量表名称：{{ this.scaleName }}</span>
      </div>
      <div class="scale-body">
        <!-- <div class="question" v-for="(i, temp_questions) in this.questions" :key="i">
          {{temp_questions}}
          <div v-for="(j, question) in temp_questions" :key="j">
            <el-row>
            <el-col :span="6">问题：{{question}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6"></el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </div>
        </div> -->
        <div class="question" v-for="i in 15" :key="i">
          <span>{{i}}.你会感到头痛吗?</span>
          <br/>
          <el-radio-group class="ml-4">
            <el-radio label="1" size="large" >没有</el-radio>
            <el-radio label="2" size="large">很轻</el-radio>
            <el-radio label="3" size="large">中等</el-radio>
            <el-radio label="4" size="large">偏重</el-radio>
            <el-radio label="5" size="large">严重</el-radio>
          </el-radio-group>
        </div>

        <div class="submit">
          <el-button @click="submit" type="primary">提交</el-button>
        </div>
      </div>
    </el-main>

  </el-container>
  
  <div class="scale-question">
    <el-row>
      <el-col>
        
      </el-col>
    <!-- <el-card class="ques-card" v-for="i in 15" :key="i">
      <template #header>
        <div class="ques-card-header">
            <span>问卷{{this.$route.query.scaleId}}问题{{i}}描述</span>
        </div>
      </template>
      <div class="choices">
          <span v-for="i in 5" :key="i">{{'选项' + i + '  '}}</span>
      </div>
    </el-card> -->
  </el-row>
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
  components: {

  },
  data() {
    return {
      scaleId: -1,
      quesNum: 0,
      scaleName: "",
      factors: ["躯体化", "强迫", "人际关系敏感", "抑郁", "焦虑", "敌对", "恐怖", "偏执", "精神病性"],
      questions: [],
    }
  },
  created() {
    this.scaleId = this.$route.query.scaleId;
    axios({
      url: "api/scale/single",
      method: "get",
      params: {
        scaleId: this.scaleId,
      }
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          var resData = res.data;
          this.quesNum = resData.quesNum;
          this.scaleName = resData.name;
          this.questions = JSON.parse(resData.content.replaceAll('/', ''));
          console.log(this.questions)
          for (var i=0;i<this.factors.length;i++) {
            // console.log(this.factors[i]);
            var li = this.questions[this.factors[i]];
            for(var j=0;j<this.li.length;j++){
              console.log(li[j]);
            }
          }
        }
      })
  },
  methods: {
    submit() {
      // 提交量表
    }
  }
}
</script>

<style>
.el-header {
  margin-left: 5px;
  border-bottom: 0.6px solid rgb(174, 174, 174);
  padding-top: 20px;
  padding-bottom: 20px;
}
.scale-name {
  font-size: large;
}
.question {
  margin: 10px;
}

.ques-card {
  justify-content: center;
  width: 800px;
}
.submit {
  margin: 20px;

}
</style>