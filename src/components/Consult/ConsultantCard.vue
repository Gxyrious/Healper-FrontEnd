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
        <el-row style="margin-top:20px;margin-left:15px;font-size:17px;font-weight:400">
            <el-col :span="6">
                {{this.info?.expense}}￥
            </el-col>
            <el-col :span="18">
                预计 {{this.info?.time}} 开始
            </el-col>
        </el-row>
        <el-row style="margin-top:15px;font-size:13px;font-weight:300;margin-left:15px">
            <el-col :span="20">
                <div>
                    正在排队人数{{this.info?.curNum}}
                </div>
                <div style="margin-top:5px">
                    最大排队人数{{this.info?.maxNum}}
                </div>
            </el-col>
            <el-col :span="3">
                <el-button type="text" v-if="this.status==false">预约</el-button>
                <el-button type="text" v-if="this.status==true">进入咨询室</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
  name: 'ConsultantCard',
  props:['info','status'],
  computed: {
  },
  created(){
  },
  methods:{
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