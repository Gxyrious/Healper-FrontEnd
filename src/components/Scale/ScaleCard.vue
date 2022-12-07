<!--
描述：问卷卡片
作者：张泰圣
-->
<template>
  <el-card :body-style="{ padding: '0px' }">
    <el-image :src="image_url" class="image"></el-image>
    <div style="padding: 14px">
      <div>
        <span>{{scaleName}}</span>
        <span class="summary" style="float: right;">共{{quesNum}}题目</span>
      </div>
      <div class="bottom">
        <p class="summary">{{summary}}</p>
        <el-button text class="button" @click="goScaleDetail">开始</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  props: [
    'scaleId',
    'scaleName',
    'quesNum',
    'summary',
    'image_url'
  ],
  data() {
    return {

    }
  },
  methods: {
    goScaleDetail() {
      this.$router.push({
        path: '/scaleDetail',
        query: {
          scaleId: this.scaleId
        }
      })
    }
  }
}
</script>

<style>
.summary {
  margin-right: 5px;
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 300px;
  display: block;
}

.el-card {
  margin-bottom: 15px;
}
</style>