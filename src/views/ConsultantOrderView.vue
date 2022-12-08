<!--
描述：咨询师订单
作者：王若晗
-->

<template>
  <el-container>
    <el-header style="padding-top: 20px; padding-bottom: 20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>咨询历史</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-container style="background: #f4f4f5">
      <el-main style="margin: 20px 30px; background: #fff">
        <el-row
          style="font-weight: bolder; margin-bottom: 30px; padding-left: 30px"
          >咨询历史</el-row
        >
        <el-row style="margin-bottom: 30px; padding-left: 30px">
          <el-table :data="orderInfo" style="width: 100%">
            <el-table-column prop="startTime" label="开始时间" width="155" />
            <el-table-column prop="endTime" label="结束时间" width="155" />
            <el-table-column prop="realname" label="来访者" width="80" />
            <el-table-column prop="clientSex" label="性别" width="60" />
            <el-table-column prop="clientAge" label="年龄" width="60" />
            <el-table-column prop="status" label="状态" width="110">
              <template #default="scope">
                <el-tag type="success" v-if="scope.row.status == 'f'">
                  已完成
                </el-tag>
                <el-tag v-if="scope.row.status == 'w'"> 待开始 </el-tag>
                <el-tag type="danger" v-if="scope.row.status == 'p'">
                  待付款
                </el-tag>
                <el-tag type="info" v-if="scope.row.status == 'c'">
                  已取消
                </el-tag>
                <el-tag type="warning" v-if="scope.row.status == 's'">
                  已开始
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="expense" label="费用" width="90" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  v-if="scope.row.status == 's'||scope.row.status == 'f'||scope.row.status == 'w'"
                  @click="goChat(scope.row.clientId,scope.row.id,scope.row.status)"
                >
                  进入咨询室
                </el-link>
                <el-link
                  type="primary"
                  :underline="false"
                  v-if="scope.row.status == 'p'"
                  @click="changeStatus(scope.row.id, 'c')"
                >
                  取消
                </el-link>
                <el-link
                  type="primary"
                  :underline="false"
                  v-if="scope.row.status == 'w'"
                  @click="changeStatus(scope.row.id, 's')"
                >
                  开始咨询
                </el-link>
                <el-link
                  type="primary"
                  :underline="false"
                  v-if="scope.row.status == 's'"
                  @click="changeStatus(scope.row.id, 'f')"
                >
                  结束咨询
                </el-link>
                <el-link
                  type="primary"
                  :underline="false"
                  v-if="scope.row.status == 'f'"
                  @click="goSAEditor(scope.row.id)"
                >
                  撰写档案
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row justify="center" style="margin-top: 30px">
          <el-col :span="7">
            <el-pagination
              layout="prev, pager, next"
              :total="orderNum"
              v-model:current-page="this.page"
              @current-change="getNewPage"
            />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  components: {},
  inject: ['reload'],
  data() {
    return {
      toUserId: 0, //聊天对象的用户id
      id:this.$store.state.userInfo.user.id,
      consultantPhone: "",
      userType: this.$store.state.userInfo.userType, //本人的用户类型
      toUserType: "", //聊天对象的用户类型，比如本人是client，toUserType就是consultant
      orderNum:0,
      orderInfo:[],
      clientInfo:[],
      page: 1,
      dialogVisible:false,
      codeLink:"",
      orderId:0,
    };
  },
  created() {
    this.getNum();
    this.getNewPage();
    console.log("当前",this.orderInfo);
  },
  methods: {
    async getNewPage(){
      await axios({
          method:'get',
          url:'api/history/consultant',
          params:{
            consultantId:this.id,
            page:this.page,
            size:10,
          }
        }).then((res)=>{
          console.log("现在开始请求");
          console.log("订单信息",res.data);
          this.orderInfo=res.data;
          console.log("当前订单1",this.orderInfo);
          for (var i = 0; i < this.orderInfo.length; i++) {
            console.log("开始遍历");
            this.orderInfo[i].startTime = this.getDate(this.orderInfo[i].startTime);
            this.orderInfo[i].endTime = this.getDate(this.orderInfo[i].endTime);
            this.orderInfo[i].clientSex = this.orderInfo[i].clientSex=="f"?"女":"男";
          }
        });
      },
    getNum(){
      axios({
      method: 'get',
      url: 'api/history/consultant/sum',
      params:{
        consultantId: this.id,
      }
      }).then((res)=>{
        console.log("res.data",res.data);
        this.orderNum=res.data;
      }).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
    },
    changeStatus(orderId, curStatus) {
      axios({
        method: "put",
        url: "api/history/status",
        data: {
          historyId: orderId,
          status: curStatus,
        },
      }).then((res) => {
        console.log("res.status", res.status);
        if (res.status == 200) {
          if (curStatus == "c") {
            ElMessage({
              message: "订单取消成功！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
          } else if (curStatus == "s") {
            ElMessage({
              message: "已开始咨询，请进入咨询室！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
          } else if (curStatus == "f") {
            ElMessage({
              message: "已成功结束咨询，请去订单页撰写档案！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
          }
          this.reload();
        } else {
          if (curStatus == "c") {
            ElMessage({
              message: "订单取消失败，请重试！",
              type: "error",
              showClose: true,
              duration: 2000,
            });
          } else if (curStatus == "s") {
            ElMessage({
              message: "开始咨询失败，请重试！",
              type: "error",
              showClose: true,
              duration: 2000,
            });
          }
          if (curStatus == "f") {
            ElMessage({
              message: "结束咨询失败，请重试！",
              type: "error",
              showClose: true,
              duration: 2000,
            });
          }
        }
      });
    },
    goChat(id,orderID,status) {
      router.push({
        name: "chat",
        query: { toUserId: id, orderId:orderID, orderStatus:status }, //把聊天对象的id传给聊天室
      });
    },
    getDate(n) {
      n = new Date(1000 * n);
      return (
        n.toLocaleDateString().replace(/\//g, "-") +
        " " +
        n.toTimeString().substr(0, 8)
      );
    },
    goSAEditor(id) {
      console.log("goSA");
      console.log(this.orderId);
      this.$router.push({
        path: "/SAEditor",
        query: {
          archiveId: id,
        },
      });
    },
  },
};
</script>

  <style scoped>
.el-header {
  margin-left: 5px;
  border-bottom: 0.6px solid rgb(174, 174, 174);
}

.el-link {
  margin-right: 10px;
}
</style>