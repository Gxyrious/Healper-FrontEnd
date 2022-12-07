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
        <div class="question" v-for="(question, index) in this.questions" :key="index">
          <el-divider />
          <span class="single-question">{{ index + 1 }}. {{ question["question"] }}</span>
          <br /> <br />
          <el-radio-group v-model="this.choices[index]">
            <el-radio label="1" size="large">没有</el-radio>
            <el-radio label="2" size="large">很轻</el-radio>
            <el-radio label="3" size="large">中等</el-radio>
            <el-radio label="4" size="large">偏重</el-radio>
            <el-radio label="5" size="large">严重</el-radio>
          </el-radio-group>
          <br /> <br /> <br /> <br />
        </div>

        <div class="submit" style="text-align:center">
          <el-button @click="submit" type="primary">提交</el-button>
        </div>
      </div>
    </el-main>

  </el-container>

  <div class="scale-question">
    <el-row>
      <el-col>

      </el-col>
    </el-row>
  </div>

</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
export default {
  components: {

  },
  data() {
    return {
      scaleId: -1,
      quesNum: 0,
      scaleName: "",
      factors: {},
      choices: {},
      questions: [],
    }
  },
  created() {
    this.scaleId = parseInt(this.$route.query.scaleId);
    axios({
      url: "api/scale/single",
      method: "get",
      params: {
        scaleId: this.scaleId + 1,
      }
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          var resData = res.data;
          this.quesNum = resData.quesNum;
          this.scaleName = resData.name;
          this.questions = JSON.parse(resData.content.replaceAll('/', ''));
          console.log(this.questions);
          for (var i = 0; i < this.questions.length; i++) {
            var ques = this.questions[i];
            this.choices[i] = 0;
            this.factors[ques["factor"]] = 0;
          }
          console.log(this.choices);
        }
      })
  },
  methods: {
    submit() {
      // 提交量表
      console.log(this.choices);
      for (let i = 0; i < this.questions.length; i++) {
        let score = parseInt(this.choices[i]);
        if (score == 0) {
          ElMessage({
            message: "您还有未完成的题目！",
            type: "warning",
            duration: 2000
          })
          return;
        }
        let factor = this.questions[i]["factor"];
        this.factors[factor] += score;
      }
      console.log(this.factors);
      let factorKeys = Object.keys(this.factors);
      let jsonFactors = []
      for (let i = 0; i < factorKeys.length; i++) {
        jsonFactors.push({
          "factor": factorKeys[i],
          "value": this.factors[factorKeys[i]],
        })
      }
      axios({
        url: "api/scale/update",
        method: "post",
        data: {
          clientId: this.$store.state.userInfo.user.id,
          endTime: Date.now() / 1000,
          isHidden: 0,
          scaleId: this.scaleId + 1,
          record: JSON.stringify(jsonFactors),
        }
      })
      .then((res) => {
        console.log(res);
        let recordId = parseInt(res.data.id);
        console.log(recordId);
        this.$router.push({
          path: "/scaleResult",
          query: {
            recordId: recordId
          },
        });
      })
      .catch((err) => {
        console.log(err);
        ElMessage({
          message: "提交失败！",
          type: "warning"
        })
      })
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
  text-align: center;
}

.el-radio {
  margin-left: 40px;
  margin-right: 40px;
  padding-left: 40px;
  padding-right: 40px;
}

.ques-card {
  justify-content: center;
  width: 800px;
}

.submit {
  margin: 20px;

}
</style>