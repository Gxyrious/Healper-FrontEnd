<template>
  <el-container>
    <el-header>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/userInfo' }">我的信息</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/scaleRecord' }">测评记录</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/scaleResult' }">测评结果</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main style="margin:20px 30px; background:#ffffff;">
      <el-row style="font-weight:bolder;margin-bottom:30px;padding-left:30px">{{ scaleName }}</el-row>
      <el-row style="padding-left:30px">您的测评结果是：</el-row>
      <el-row justify="center">
        <el-col :span="23">
          <ResultChart :factors="factors" :values="values"></ResultChart>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import router from "@/router"
import axios from "axios";
import {

} from "@element-plus/icons-vue"
import ResultChart from '../components/Scale/ResultChart.vue'

export default {
  created() {
    this.recordId = parseInt(this.$route.query.recordId);
    console.log(this.recordId);
    axios({
      method: 'get',
      url: 'api/scale/record',
      params: {
        recordId: this.recordId,
      }
    }).then((res) => {
      console.log("res", res);
      this.scaleName = res.data.scaleName;
      this.record = JSON.parse(res.data.record);
      for (var i = 0; i <= this.record.length; i++) {
        this.factors[i] = this.record[i].factor;
        this.values[i] = this.record[i].value;
      }
    });
  },
  methods: {
    goUserInfo() {
      router.push({ name: "userInfo" });
    },
  },
  components: {
    ResultChart,
  },
  data() {
    return {
      record: [],
      scaleName: "",
      scaleRecordId: 0,
      factors: [],
      values: [],
    };
  },
};
</script>
    
<style scoped>
.tabs {
  background: #ffffff
}

.el-container {
  background: #f4f4f5;

}

.el-header {
  margin-left: 5px;
  border-bottom: 0.6px solid rgb(174, 174, 174);
  padding-top: 20px;
  padding-bottom: 20px;
  background: #ffffff;
}
</style>
    