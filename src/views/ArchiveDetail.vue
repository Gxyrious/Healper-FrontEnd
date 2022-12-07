<template>
  <el-container>
    <el-header style="padding-top: 20px; padding-bottom: 20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order' }"
          >个人信息</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: 'documentRecord' }"
          >咨询档案</el-breadcrumb-item
        >
        <el-breadcrumb-item>档案详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-container class="input_background">
      <el-main class="input_field">
        <el-descriptions
          title="档案详情"
          direction="vertical"
          :column="4"
          :size="size"
          border
        >
          <el-descriptions-item label="咨询师">{{
            this.archive.consultantRealName
          }}</el-descriptions-item>
          <el-descriptions-item label="开始时间">{{
            this.archive.startTime
          }}</el-descriptions-item>
          <el-descriptions-item label="结束时间">{{
            this.archive.endTime
          }}</el-descriptions-item>
          <el-descriptions-item label="费用">{{
            archive.expense
          }}</el-descriptions-item>
          <el-descriptions-item label="咨询师建议">
            <p v-if="this.hasAdvice" v-html="this.archive.advice"></p>
            <p v-else>咨询师还未撰写哦~</p>
          </el-descriptions-item>
        </el-descriptions>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      archive: {},
      content: "",
      adviceURL: "https://healper.oss-cn-hangzhou.aliyuncs.com/advice-3.html",
      hasAdvice: false,
    };
  },
  methods: {
    getDate(n) {
      n = new Date(n);
      return (
        n.toLocaleDateString().replace(/\//g, "-") +
        " " +
        n.toTimeString().substr(0, 8)
      );
    },
    init() {
      this.archive = JSON.parse(this.$route.query.archiveContent);
      this.archive.startTime = this.getDate(this.archive.startTime);
      this.archive.endTime = this.getDate(this.archive.endTime);
      console.log(this.archive.advice);
      if (this.archive.advice != null) {
        this.hasAdvice = true;
        const xhrFile = new XMLHttpRequest();
        console.log("开始解析oss");
        xhrFile.open("GET", this.archive.advice, true);
        xhrFile.send();
        xhrFile.onload = () => {
          this.archive.advice = xhrFile.response;
          console.log("oss解析完成");
        };
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped>
.input_background {
  background: #f4f4f5;
}

.input_field {
  width: 98%;
  margin-top: 2%;
  margin-left: 3%;
  margin-right: 3%;
  background: #fff;
  border-bottom: 1px solid #f0f0f2;
  height: 85%;
}
</style>
