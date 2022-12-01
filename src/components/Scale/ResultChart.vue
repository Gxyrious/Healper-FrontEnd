<template>
<div style="width: auto;height: 400px" id="chart">
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { onMounted } from 'vue';
export default {
    setup(props){
        onMounted(()=>{let chart = echarts.init(document.getElementById("chart"));
          chart.setOption({
        title: { text: props.dt },
        tooltip: {},
        xAxis: {
          data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
        },
        yAxis: {},
        series: [
          {
            name: "用户量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],})
          
      }
        )},
    props: [
    'dt',
    ],
    data() {
    return {
    }
  },
    }
</script>