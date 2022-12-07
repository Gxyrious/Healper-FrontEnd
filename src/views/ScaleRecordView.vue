<!--
  描述：测评记录
  作者：张泰圣
-->

<template>
    <el-container>
        <el-header>
          <el-breadcrumb>
                  <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/userInfo' }">我的信息</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/scaleRecord' }">测评记录</el-breadcrumb-item>
                </el-breadcrumb>
        </el-header>
        
        <el-main style="margin:20px 30px; background:#ffffff;">
          <el-row justify="center" class="tabs">
            <el-col :span="23">
                <el-tabs v-model="activeName">
                  <el-tab-pane label="统计分析" name="first">
                    <AnalysisChart v-for="item in analysis" :key="item.factor" :factor="item.factor" :detail="item.detail"></AnalysisChart>
    </el-tab-pane>
    <el-tab-pane label="历史记录" name="second">
  <el-table :data="scaleRecord"  style="width: 100%">
    <el-table-column prop="endTime" label="时间" width="400" />
    <el-table-column prop="scaleName" label="名称" width="400" />
    <el-table-column  label="操作">
        <template #default="scope">
        <el-button link  size="small" @click="viewResult(scope.row.scaleRecordId)">查看</el-button>
        <el-popconfirm title="您确定要删除这条测评记录吗？" confirm-button-text="是"
    cancel-button-text="否" @confirm="deleteRecord(scope.row.scaleRecordId)">
    
    <template #reference>
      <el-button link  size="small">删除</el-button>
    </template>
  </el-popconfirm>
        
        </template>
    </el-table-column>
  </el-table>
  <el-row justify="center" style="margin-top: 30px;">
    <el-col :span="7">
  <el-pagination layout="prev, pager, next" :total="scaleSum" v-model:current-page="page" @current-change="getNewPage"/>
</el-col>
  </el-row>
    </el-tab-pane>
    
  </el-tabs>
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
import { ElMessage } from "element-plus";
import AnalysisChart from "../components/Scale/AnalysisChart.vue";
export default {
  created() {
    axios({
      method: 'get',
      url: 'api/scale/sum',
      params: {
        clientId: this.id,

      }
    }).then((res) => {
      console.log("res", res);
      this.scaleSum = res.data;
    });
    axios({
      method: 'get',
      url: 'api/scale/records',
      params: {
        clientId: this.id,
        page: 1,
        size: 10,
      }
    }).then((res) => {
      if (res.status == 200) {
        console.log("res", res);
        this.scaleRecord = res.data;
        for (var i = 0; i < this.scaleRecord.length; i++) {
          this.scaleRecord[i].endTime = this.getDate(this.scaleRecord[i].endTime);
        }
      }

      axios({
      method: 'get',
      url: 'api/scale/jsonRecords',
      params:{
        clientId: this.id,
      }
    }).then((res)=>{
      console.log("res", res);
      this.analysis = res.data;
    })
    })
      },
      methods: {
        
        goUserInfo() {
          router.push({ name: "userInfo" });
        },
        getDate(n){
      n=new Date(n)
      return n.toLocaleDateString().replace(/\//g, "-") + " " + n.toTimeString().substr(0, 8)
    },
    getNewPage() {
      axios({
        method: 'get',
        url: 'api/scale/records',
        params: {
          clientId: this.id,
          page: this.page,
          size: 10,
        }
      }).then((res) => {
        console.log("res", res);
        this.scaleRecord = res.data;
        for (var i = 0; i < this.scaleRecord.length; i++) {
          this.scaleRecord[i].endTime = this.getDate(this.scaleRecord[i].endTime);
        }
      })
    },
    viewResult(scaleRecordId) {
      this.$router.push({
        path: '/scaleResult',
        query: {
          recordId: scaleRecordId,
        }
      })
    },
    deleteRecord(scaleRecordId) {
      axios({
        method: 'delete',
        url: 'api/scale/delete',
        params: {
          id: scaleRecordId,
        }
      }).then((res) => {
        if (res.status == 200) {
          ElMessage({
            message: "删除成功",
            type: "success",
            showClose: true,
            duration: 2000,
          });
        }
        else {
          ElMessage({
            message: "删除失败",
            type: "error",
            showClose: true,
            duration: 2000,
          });
        }
      });
      setTimeout(() => { this.getNewPage(); }, 1000)

    }
  },
  components: {
    AnalysisChart,
  },
  data() {
    return {
      activeName: "first",
      scaleSum: 0,
      page: 1,
      id: this.$store.state.userInfo.user.id,
      scaleRecord: [

      ],
      analysis: [
        { detail: { time: null, value: null }, factor: null },
      ],

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
    