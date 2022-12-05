<template>
<div style="width: auto;height: 400px" id="chart">
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { onMounted } from 'vue';
export default {
    setup(props){
        onMounted(()=>{
          setTimeout(()=>{ let chart = echarts.init(document.getElementById("chart"));
          chart.setOption({
            xAxis: {
    type: 'category',
    data: props.factors,
    axisLabel:{
      interval: 0,
    }
    
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.values,
      //data: [1,2,3],
      type: 'bar'
    }
  ]})}, 1000);
          //echarts.init(document.getElementById("chart")).dispose();
         
          
      }
        )},
    props: [
    'factors',
    'values'
    ],
    data() {
    return {
    }
  },
    }
</script>