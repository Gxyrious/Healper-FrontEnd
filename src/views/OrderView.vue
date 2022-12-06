<!--
描述：我的订单
作者：王若晗
-->

<template>
  <el-container>
    <el-header style="padding-top: 20px; padding-bottom: 20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>心理咨询</el-breadcrumb-item>
        <el-breadcrumb-item>我的订单</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-container style="background: #f4f4f5">
      <el-main style="margin: 20px 30px; background: #fff">
        <el-row
          style="font-weight: bolder; margin-bottom: 30px; padding-left: 30px"
          >订单历史</el-row
        >
        <el-row style="margin-bottom: 30px; padding-left: 30px">
          <el-table :data="orderInfo" style="width: 100%">
            <el-table-column prop="startTime" label="开始时间" width="180" />
            <el-table-column prop="endTime" label="结束时间" width="180" />
            <el-table-column prop="realname" label="咨询师" width="100" />
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
              </template>
            </el-table-column>
            <el-table-column prop="expense" label="费用" width="90" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  v-if="
                    scope.row.status == 'f' || scope.row.status == 'w'
                  "
                  @click="handleClick"
                >
                  进入咨询室
                </el-link>
                <el-link
                  type="primary"
                  :underline="false"
                  v-if="scope.row.status == 'p'"
                  @click="pay(scope.row.consultantId,scope.row.id)"
                >
                  支付
                </el-link>
                <el-dialog :modal=false :append-to-body="true" v-model="dialogVisible" title="请扫码支付给咨询师对应金额">
                  <div style="text-align:center">
                    <img :src="this.codeLink" width="200"/><br/>
                    <el-button type="primary" plain @click="payFinish()" style="margin-top:10px">支付完成</el-button>
                  </div>
                </el-dialog>
                <el-link
                  type="primary"
                  :underline="false"
                  v-if="
                    scope.row.status == 'p' || scope.row.status == 'w'
                  "
                  @click="changeStatus(scope.row.id,'c')"
                >
                  取消
                </el-link>
                <el-link
                  type="primary"
                  :underline="false"
                  v-if="scope.row.status == '待付款'"
                  @click="goSAEditor"
                >
                  编辑档案
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row justify="center" style="margin-top: 30px">
          <el-col :span="7">
            <el-pagination layout="prev, pager, next" :total="orderNum" v-model:current-page="this.page" @current-change="getNewPage"/>
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
      page: 1,
      dialogVisible:false,
      codeLink:"",
      orderId:0,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getNewPage(){
      axios({
          method:'get',
          url:'api/history/orders',
          params:{
            clientId:2,
            page:1,
            size:10,
          }
        }).then((res)=>{
          console.log("现在开始请求");
          console.log("订单信息",res.data);
          this.orderInfo=res.data;
        }).catch((err) =>{
          console.log(err);
        });
    },
    getInfo() {
      console.log("用户身份", this.userType);
      if (this.userType == "client") {
        // 来访者获取订单信息
        axios({
          method: 'get',
          url: 'api/history/order/sum',
          params:{
            clientId: 2
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
        });
        this.getNewPage();
      } else if (this.userType == "consultant") {
        //咨询师获取记录
        axios({
          method: "get",
          url: "api/history/consultant",
          params: {
            consultantId: this.$store.state.userInfo.user.id,
            page: 1,
            size: 1,
          },
        }).then((res) => {
          console.log("res.data", res.data);
          this.toUserId = res.data[0].clientId;
          console.log("来访者id", this.toUserId);
        });
      }
    },
    handleClick() {
      router.push({
        name: "chat",
        query: { toUserId: this.toUserId }, //把聊天对象的id传给聊天室
      });
    },
    changeStatus(orderId,curStatus){
      axios({
        method: "put",
        url: "api/history/status",
        data: {
          historyId: orderId,
          status: curStatus
        },
      }).then((res) => {
          console.log("res", res);
          if (res.status == 200){
            if(curStatus=='c'){
              ElMessage({
                  message: "取消成功",
                  type: "success",
                  showClose: true,
                  duration: 2000,
                });
            }
            this.reload();
          }
      else{
        if(curStatus=='c'){
          ElMessage({
                message: "取消失败",
                type: "error",
                showClose: true,
                duration: 2000,
            });
          }
        }
      })
    },
    pay(consultantId,orderId){
      console.log("orderId:",orderId);
      this.orderId=orderId;
      axios({
          method: 'get',
          url: 'api/user/info',
          params:{
            id:consultantId,
            userType:"consultant"
          }
        }).then((res)=>{
          console.log("res.data",res.data);
          console.log(res.data.qrCodeLink);
          this.codeLink=res.data.qrCodeLink;
          console.log(consultantId);
          console.log(this.codeLink);
        })
      this.dialogVisible=true;
    },
    payFinish(){
      console.log(this.orderId);
      axios({
        method: "put",
        url: "api/history/status",
        data: {
          historyId: this.orderId,
          status: 'w'
        },
      }).then((res) => {
          console.log("改变状态");
          console.log(res.status);
          console.log("res", res);
          if (res.status == 200){
              ElMessage({
                  message: "支付成功，等待咨询",
                  type: "success",
                  showClose: true,
                  duration: 2000,
                });
            this.reload();
          }
          else{   
          ElMessage({
                message: "支付失败，请重试",
                type: "error",
                showClose: true,
                duration: 2000,
            });
        }
      })
      this.dialogVisible=false;
    },
    goSAEditor() {
      router.push({ name: "SAEditor" });
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

.v-modal {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>