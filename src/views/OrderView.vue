<!--
描述：我的订单
作者：王若晗
-->

<template>
<el-container>
    <el-header style="padding-top:20px;padding-bottom:20px;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>心理咨询</el-breadcrumb-item>
            <el-breadcrumb-item>我的订单</el-breadcrumb-item>
  </el-breadcrumb>
    </el-header>
    <el-container style="background:#f4f4f5">
        <el-main style="margin:20px 30px;
                        background:#fff;"
                        >
            <el-row style="font-weight:bolder;margin-bottom:30px;padding-left:30px">订单历史</el-row>
            <el-row style="margin-bottom:30px;padding-left:30px">
                <el-table :data="order_info" style="width: 100%">
                    <el-table-column prop="start_time" label="开始时间" width="180" />
                    <el-table-column prop="end_time" label="结束时间" width="180" />
                    <el-table-column prop="consultant" label="咨询师" width="100"/>
                    <el-table-column prop="status" label="状态" width="110">
                              <template #default="scope">
                                <el-tag type="success" v-if="scope.row.status=='已完成'">
                                    已完成
                                </el-tag>
                                <el-tag v-if="scope.row.status=='待开始'">
                                    待开始
                                </el-tag>
                                <el-tag type="danger" v-if="scope.row.status=='待付款'">
                                    待付款
                                </el-tag>
                                <el-tag type="info" v-if="scope.row.status=='已取消'">
                                    已取消
                                </el-tag>
                            </template>
                    </el-table-column>
                    <el-table-column prop="cost" label="费用" width="90"/>
                    <el-table-column label="操作">
                        <template #default="scope">
                                <el-link type="primary" :underline="false" v-if="scope.row.status=='已完成'||scope.row.status=='待开始'">
                                    进入咨询室
                                </el-link>
                                <el-link type="primary" :underline="false" v-if="scope.row.status=='待付款'">
                                    支付
                                </el-link>
                                <el-link type="primary" :underline="false" v-if="scope.row.status=='待开始'||scope.row.status=='待付款'">
                                    取消
                                </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
  components:{
  },
  data() {
    return {
        order_info:[
            {
                start_time: '2016-05-04 13:40',
                end_time: '2016-05-04 14:12',
                consultant:'Tom',
                status:'已完成',
                cost:100,
            },
            {
                start_time: '2016-05-04 13:40',
                end_time: '2016-05-04 14:12',
                consultant:'Tom',
                status:'待开始',
                cost:100,
            },
            {
                start_time: '2016-05-04 13:40',
                end_time: '2016-05-04 14:12',
                consultant:'Tom',
                status:'待付款',
                cost:100,
            },
            {
                start_time: '2016-05-04 13:40',
                end_time: '2016-05-04 14:12',
                consultant:'Tom',
                status:'已取消',
                cost:100,
            },
]
    };
  },
  methods: {
  },
};

</script>

<style scoped>
.el-header{
    margin-left:5px;
    border-bottom: 0.6px solid rgb(174, 174, 174);
}

.el-link{
    margin-right:10px;
}
</style>