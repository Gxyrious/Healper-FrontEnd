<template>
  <el-row>
    <el-card class="ques-card" v-for="i in 15" :key="i">
      <template #header>
        <div class="ques-card-header">
            <span>问卷{{this.$route.query.scaleId}}问题{{i}}描述</span>
        </div>
      </template>
      <div class="choices">
          <span v-for="i in 5" :key="i">{{'选项' + i + '  '}}</span>
      </div>
  </el-card>
  </el-row>
</template>

<script>
import axios from 'axios';
export default {
  components: {

  },
  data() {
    return {
      scaleId: -1,
      questions: [],
    }
  },
  created() {
    this.scaleId = this.$route.query.scaleId;
    axios({
      url: "api/scale",
      method: "get",
      params: {
        id: this.scaleId,
      }
    })
    .then((res) => {
      if (res.status == 200) {
        this.questions = res.data;
      }
    })
  },
  methods: {

  }
}
</script>

<style>
  
</style>