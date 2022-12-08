<!--
描述：咨询首页
作者：王若晗
-->

<template>
<el-container>
    <el-header style="padding-top:20px;padding-bottom:20px;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>心理咨询</el-breadcrumb-item>
            <el-breadcrumb-item>预约咨询</el-breadcrumb-item>
  </el-breadcrumb>
    </el-header>
    <el-container style="background:#f4f4f5">
        <el-main style="margin:20px 30px;
                        background:#fff;"
                        >
            <el-row style="font-weight:bolder;margin-bottom:30px;padding-left:30px">推荐</el-row>
            <el-row>
                <el-col :span="8" v-for="i in consultantInfo" :key=i>
                    <consultation-card :info="i.info" :status="i.status" :clientID="this.id" :historyId="i.historyId" :avatarSize="this.size">
                    </consultation-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import ConsultationCard from "../../src/components/Consult/ConsultantCard.vue"
import axios from "axios";
export default {
  components:{
    ConsultationCard
  },
  data() {
    return {
        id:this.$store.state.userInfo.user.id,
        consultantInfo:[],
        size:100,
    };
  },
  created(){
    axios({
        url: 'api/user/consultants/client',
        method: 'get',
        params:{
            clientId:this.id,
            page:1,
            size:10,
            label: "",
        },
    }).then((res) => {
        console.log(res);
        this.consultantInfo=res.data;
        for(var i=0;i<this.consultantInfo.length;i++)
        {
            console.log(this.consultantInfo[i].info.label);
            this.consultantInfo[i].info.label=JSON.parse(this.consultantInfo[i].info.label);
            console.log(this.consultantInfo[i].info.label);
            if(this.consultantInfo[i].info.label.length>3)
            {
                this.consultantInfo[i].info.label=this.consultantInfo[i].info.label.slice(0,3);
            }
        }
        console.log(this.consultantInfo[0]);
    }).catch((err) => {
        console.log(err);
    })
  }
};

</script>

<style scoped>
.el-header{
    margin-left:5px;
    border-bottom: 0.6px solid rgb(174, 174, 174);
}
</style>