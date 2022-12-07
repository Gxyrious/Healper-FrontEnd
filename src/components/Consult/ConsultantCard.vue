<template>
    <el-card shadow="hover">
        <el-row>
            <el-col :span="14">
                <el-avatar shape="square" :size=140 :src="this.info?.profile" />
            </el-col>
            <el-col :span="10">
                <div style="font-size:30px;font-weight:500;display:flex;justify-content: flex-end;padding-right:20px;padding-top:18px">
                    {{this.info?.realname}}
                </div>
                <div style="font-size:13px;font-weight:300;display:flex;justify-content: flex-end;padding-right:25px;margin-top:2px">
                    {{ this.info?.sex=='m'?'男':'女' }} | {{this.info?.age}}
                </div>
                <div style="display:flex;justify-content: flex-end;margin-top:50px;padding-right:18px">
                    <el-tag v-for="i in this.info?.label" :key="i">{{i}}</el-tag>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top:10px;margin-left:15px;font-size:25px;font-weight:400">
            <el-col :span="8">
                {{this.info?.expense}}￥
            </el-col>
        </el-row>
        <el-row style="margin-top:15px;font-size:13px;font-weight:300;margin-left:15px">
            <el-col :span="18">
                <div>
                    正在排队人数{{this.info?.curNum}}
                </div>
                <div style="margin-top:5px">
                    最大排队人数{{this.info?.maxNum}}
                </div>
            </el-col>
            <el-col :span="6">
                <el-button type="text" v-if="this.status=='0'" 
                @click="appoint()" style="margin-left:40%"
                >预约</el-button>
                <el-button type="text" v-if="this.status=='1'" 
                @click="changeStatus(this.historyId,'c')" style="margin-left:22%"
                >取消预约</el-button>
                <el-button type="text" v-if="this.status=='2'" @click="goChat()">进入咨询室</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: 'ConsultantCard',
  props:['info','status','clientID','historyId'],
  inject: ['reload'],
  data() {
        return {
        };
    },
  computed: {
  },
  created(){
    console.log(this.clientID);
    console.log(this.info?.id);
    console.log(this.info?.expense);
  },
  methods:{
    appoint(){
        axios({
          method:'post',
          url:'api/history/add',
          data:{
            clientId: this.clientID,
            consultantId: this.info?.id,
            expense:this.info?.expense
          }
        }).then((res)=>{
          console.log("现在开始请求");
          console.log("res",res.data);
          console.log(this.status);
          if(res.status==200)
          {
            console.log("预约成功");
            console.log("res",res.data);
            this.reload();
            ElMessage({
                message: "预约成功，请去订单页支付！",
                type: "success",
                showClose: true,
                duration: 2000,
            });
          }
          else{
          ElMessage({
                message: "预约失败，请重试！",
                type: "error",
                showClose: true,
                duration: 2000,
            });
          }
        }).catch((err) =>{
          console.log(err);
        });
    },
    goChat(){
      router.push({
        name: "chat",
        query: { toUserId: this.info?.id }, //把聊天对象的id传给聊天室
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
                  message: "取消成功！",
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
                message: "取消失败，请重试！",
                type: "error",
                showClose: true,
                duration: 2000,
            });
          }
        }
      })
    },
  }
}
</script>

<style scoped>
.el-card{
    height:300px;
    margin-left:30px;
    margin-right:40px;
    margin-bottom:40px;
    padding-bottom:20px;
}

.el-tag{
    margin-left:10px;
}
</style>