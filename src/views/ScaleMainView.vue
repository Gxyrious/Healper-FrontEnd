<!--
描述：心理测评
作者：张泰圣
-->

<template>
  <el-container>

    <el-header>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/scale' }">心理测评</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-container style="background:#f4f4f5">
      <el-main style="margin:20px 30px;background:#fff;">
        <el-row style="font-weight:bolder;margin-bottom:30px;padding-left:30px">选择问卷</el-row>
        <el-row gutter="20" justify="center" style="flex-wrap: wrap">
          <el-col :lg="{ span: 8 }" v-for="(info, index) in scaleInfo" :key="index">
            <scale-card :scaleId="index" :scaleName=info.name :quesNum=info.num></scale-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>
    
<script>
//import router from "@/router";
import {

} from "@element-plus/icons-vue"
import ScaleCard from "../components/Scale/ScaleCard"
import axios from "axios";

export default {
  methods: {
    
  },
  components: {
    ScaleCard
  },
  data() {
    return {
      scaleInfo: [],
    };
  },
  created() {
    axios({
      url: "api/scale/names",
      method: "get",
      params: {
        page: 0,
        size: 6
      }
    })
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        var resData = res.data;
        console.log(resData);
        for (var i = 0; i < resData.length; i++) {
          var scaleName = resData[i].name;
          var quesNum = resData[i].quesNum;
          this.scaleInfo.push({"name": scaleName, "num": quesNum});
        }
        console.log(this.scaleInfo);
      }
    })
    .catch((res) => {
      console.log(res);
    })
  }
};
</script>
    
<style scoped>
.retitle {
  font-size: 16px;
  font-weight: bold;
}

.record {
  margin-top: 30px;
}

.head {
  margin-top: 30px;
}

.head .el-col {

  padding-top: 30px;
  padding-left: 15px;
  height: 120px;
  background: #FFFFFF;
}

.el-main {
  background: #f4f4f5;

}

.el-header {
  margin-left: 5px;
  border-bottom: 0.6px solid rgb(174, 174, 174);
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
    