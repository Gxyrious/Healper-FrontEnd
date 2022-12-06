<template>
    <div style="width: auto;height: 400px" :id="factor">
      </div>
    </template>
    <script>
    import * as echarts from 'echarts'
    import { onMounted } from 'vue';
    export default {
        setup(props){
            onMounted(()=>{
              setTimeout(()=>{ let chart = echarts.init(document.getElementById(props.factor));
              chart.setOption({
                dataset:{
                    dimensions: ['time', 'value'],
                    source: props.detail,
                    //source: [ { "time": 1679046661, "value": "2.0" }, { "time": 1670046661, "value": "2.0" }, { "time": 1669146661, "value": "2.0" }, { "time": 1669046661, "value": "2.0" }, { "time": 1668946661, "value": "2.0" }, { "time": 1668046661, "value": "2.0" }, { "time": 1667846661, "value": "2.0" }, { "time": 1667346661, "value": "2.0" }, { "time": 1667146661, "value": "2.0" }, { "time": 1666846661, "value": "2.0" } ],
                },
                title:{
                    text: props.factor
                },
                xAxis: {
        type: 'time',
        
        axisLabel:{
          rotate: 45,
        }
        
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          
          //data: [1,2,3],
          type: 'line'
        }
      ]})}, 3000);
              //echarts.init(document.getElementById("chart")).dispose();
             
              
          }
            )},
        props: [
        'detail',
        'factor'
        ],
        data() {
        return {
        }
      },
      methods:{
        
      }
        }
    </script>