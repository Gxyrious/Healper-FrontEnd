<!--
  描述：咨询档案
  作者：张泰圣
-->

<template>
  <el-container>
    <el-header>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/userInfo' }"
          >我的信息</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/documentRecord' }"
          >咨询档案</el-breadcrumb-item
        >
      </el-breadcrumb>
    </el-header>

    <el-main style="margin: 20px 30px; background: #ffffff">
      <el-row
        style="font-weight: bolder; margin-bottom: 30px; padding-left: 30px"
        >咨询档案</el-row
      >
      <el-row justify="center" class="tabs">
        <el-col :span="23">
          <el-table
            :data="documentRecord"
            style="width: 100%"
            @row-click="goArchiveDetail"
          >
            <el-table-column prop="startTime" label="开始时间" width="300" />
            <el-table-column prop="endTime" label="结束时间" width="300" />
            <el-table-column
              prop="consultantRealName"
              label="咨询师"
              width="200"
            />
            <el-table-column
              prop="expense"
              label="费用"
              width="250"
            ></el-table-column>
            <!-- <el-table-column prop="advice" label="建议" width="500" /> -->
            <!-- <el-table-column label="">
              <template slot-scope="scope">
                <el-button link size="small" @click="goArchiveDetail">
                  查看详情
                </el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </el-col>
      </el-row>
      <el-row justify="center" style="margin-top: 30px">
        <el-col :span="7">
          <el-pagination
            layout="prev, pager, next"
            :total="documentSum"
            v-model:current-page="page"
            @current-change="getNewPage"
          />
        </el-col>
      </el-row>
    </el-main>

    <!--    <el-main style="margin: 20px 30px; background: #ffffff">-->
    <!--      <el-row-->
    <!--        style="font-weight: bolder; margin-bottom: 30px; padding-left: 30px"-->
    <!--        >咨询档案</el-row-->
    <!--      >-->
    <!--      <el-row justify="center" class="tabs">-->
    <!--        <el-col :span="23">-->
    <!--          <el-table :data="documentRecord" style="width: 100%">-->
    <!--            <el-table-column prop="endTime" label="时间" width="200" />-->
    <!--            <el-table-column-->
    <!--              prop="consultantRealName"-->
    <!--              label="咨询师"-->
    <!--              width="200"-->
    <!--            />-->
    <!--            <el-table-column prop="advice" label="建议" width="500" />-->
    <!--            &lt;!&ndash;-->
    <!--    <el-table-column  label="操作">-->
    <!--        <template #default>-->
    <!--        <el-button link  size="small" @click="handleClick">删除</el-button>-->
    <!--        <el-button link  size="small" @click="handleClick">隐藏</el-button>-->
    <!--        </template>-->
    <!--        -->
    <!--    </el-table-column>-->
    <!--  &ndash;&gt;-->
    <!--          </el-table>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--      <el-row justify="center" style="margin-top: 30px">-->
    <!--        <el-col :span="7">-->
    <!--          <el-pagination-->
    <!--            layout="prev, pager, next"-->
    <!--            :total="documentSum"-->
    <!--            v-model:current-page="page"-->
    <!--            @current-change="getNewPage"-->
    <!--          />-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </el-main>-->
  </el-container>
</template>

<script>
import router from "@/router";
import axios from "axios";
import {} from "@element-plus/icons-vue";

export default {
  created() {
    axios({
      method: "get",
      url: "api/history/archive/sum",
      params: {
        clientId: this.id,
      },
    }).then((res) => {
      console.log("res", res);
      this.documentSum = res.data;
    });
    axios({
      method: "get",
      url: "api/history/archives",
      params: {
        clientId: this.id,
        page: 1,
        size: 10,
      },
    }).then((res) => {
      if (res.status == 200) {
        console.log("res", res);
        this.documentRecord = res.data;
        for (var i = 0; i < this.documentRecord.length; i++) {
          this.documentRecord[i].endTime = this.getDate(
            this.documentRecord[i].endTime
          );
          this.documentRecord[i].startTime = this.getDate(
            this.documentRecord[i].startTime
          );
        }
      }
    });
  },
  methods: {
    goUserInfo() {
      router.push({ name: "userInfo" });
    },
    getDate(n) {
      n = new Date(1000 * n);
      return (
        n.toLocaleDateString().replace(/\//g, "-") +
        " " +
        n.toTimeString().substr(0, 8)
      );
    },
    getNewPage() {
      axios({
        method: "get",
        url: "api/history/archives",
        params: {
          clientId: this.id,
          page: this.page,
          size: 10,
        },
      }).then((res) => {
        console.log("res", res);
        this.documentRecord = res.data;
        for (var i = 0; i < this.documentRecord.length; i++) {
          this.documentRecord[i].endTime = this.getDate(
            this.documentRecord[i].endTime
          );
          this.documentRecord[i].startTime = this.getDate(
            this.documentRecord[i].startTime
          );
        }
      });
    },
    goArchiveDetail(row) {
      this.archiveContent.id = row.id;
      this.archiveContent.consultantId = row.consultantId;
      this.archiveContent.startTime = row.startTime;
      this.archiveContent.endTime = row.endTime;
      this.archiveContent.expense = row.expense;
      this.archiveContent.consultantRealName = row.consultantRealName;
      this.archiveContent.advice = row.advice;
      this.archiveContent.summary = row.summary;

      this.$router.push({
        path: "/archiveDetail",
        query: {
          archiveContent: JSON.stringify(this.archiveContent),
        },
      });
    },
  },
  components: {},
  data() {
    return {
      id: this.$store.state.userInfo.user.id,
      documentSum: 0,
      page: 1,
      documentRecord: [],
      archiveContent: {
        id: 0,
        consultantId: 0,
        startTime: "",
        endTime: "",
        expense: 0,
        consultantRealName: "",
        advice: "",
        summary: "",
      },
    };
  },
};
</script>
    
<style scoped>
/*.tabs {*/
/*  background: #ffffff;*/
/*}*/
/*.el-container {*/
/*  background: #f4f4f5;*/
/*}*/
/*.el-header {*/
/*  margin-left: 5px;*/
/*  border-bottom: 0.6px solid rgb(174, 174, 174);*/
/*  padding-top: 20px;*/
/*  padding-bottom: 20px;*/
/*  background: #ffffff;*/
/*}*/
.tabs {
  background: #ffffff;
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
    