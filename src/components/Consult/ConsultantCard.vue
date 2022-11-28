<template>
    <div class="card-field">
        <el-card shadow="hover">
            <el-row>
                <el-col :span="14">
                    <el-avatar shape="square" :size=150 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </el-col>
                <el-col :span="10">
                    <div style="font-size:30px;font-weight:500;display:flex;justify-content: flex-end;padding-right:20px;padding-top:15px">
                        美女
                    </div>
                    <div style="font-size:13px;font-weight:300;display:flex;justify-content: flex-end;padding-right:25px;margin-top:2px">
                        女 | 20
                    </div>
                    <div style="display:flex;justify-content: flex-end;margin-top:50px;padding-right:20px">
                        <el-tag class="ml-2" size="medium" style="margin-left:10px">Tag 1</el-tag>
                        <el-tag class="ml-2" type="success" size="medium" style="margin-left:10px">Tag 2</el-tag>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-top:20px;margin-left:15px;font-size:17px;font-weight:400">
                <el-col :span="6">
                    648￥
                </el-col>
                <el-col :span="18">
                    预计 11/11 11:11 开始
                </el-col>
            </el-row>
            <el-row style="margin-top:15px;font-size:13px;font-weight:300;margin-left:15px">
                <el-col :span="20">
                    <div>
                        正在排队人数12
                    </div>
                    <div style="margin-top:5px">
                        最大排队人数30
                    </div>
                </el-col>
                <el-col :span="3">
                    <el-button type="text">预约</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'ConsultantCard',
  props:{
    consultant_info:Object,
  },
  computed: {
  },
  methods:{
  }
}
</script>

<style scoped>
.el-card{
    height:300px;
}

.card-field{
    margin-left:30px;
    margin-right:40px;
    margin-bottom:40px;
}
</style>