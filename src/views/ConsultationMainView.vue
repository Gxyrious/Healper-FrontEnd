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
                <el-col :span="12" v-for="i in consultant_info" :key=i>
                    <consultation-card :info="i">
                    </consultation-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import ConsultationCard from "../../src/components/Consult/ConsultantCard.vue"
export default {
  components:{
    ConsultationCard
  },
  data() {
    return {
        consultant_info:[{
            name:"美女",
            sex:"女",
            age:20,
            price:648,
            tagList:[
                {tag:"焦虑"}
            ],
            curNum:12,
            maxNum:30,
            time:"11/11 11:11",
        },
        {   name:"超级美女",
            sex:"女",
            age:20,
            price:648,
            tagList:[
                {tag:"焦虑"}
            ],
            curNum:14,
            maxNum:20,
            time:"11/11 11:11",
        },
        {   name:"普通美女",
            sex:"女",
            age:20,
            price:648,
            tagList:[
                {tag:"焦虑"},
                {tag:"抑郁"}
            ],
            curNum:14,
            maxNum:20,
            time:"11/11 11:11",
        },
        {   name:"无敌美女",
            sex:"女",
            age:20,
            price:648,
            tagList:[
                {tag:"焦虑"},
                {tag:"抑郁"}
            ],
            curNum:14,
            maxNum:20,
            time:"11/11 11:11",
        },
        ]
    };
  },
  created(){
    console.log(this.consultant_info);
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
</style>