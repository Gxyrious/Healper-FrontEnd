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
                legend: {
    // Try 'horizontal'
    orient: 'horizontal',
    //right: 10,
    top: 'bottom',
    selected:{
      '躯体化': true,
      '强迫': false,
      '人际关系敏感': false,
      '抑郁': false,
      '焦虑': false,
      '敌对': false,
      '恐怖': false,
      '偏执': false,
      '精神病性': false,
    }
  },
                //legend:[props.analysis[0].factor, props.analysis[1].factor, props.analysis[2].factor, props.analysis[3].factor, props.analysis[4].factor, props.analysis[5].factor, props.analysis[6].factor, props.analysis[7].factor, props.analysis[8].factor,],
                dataset:[{
                    dimensions: ['time', 'value'],
                    source: props.analysis[0].detail
                   
                },
                {
                    dimensions: ['time', 'value'],
                    source: props.analysis[1].detail
                   
                },
                {
                    dimensions: ['time', 'value'],
                    source: props.analysis[2].detail
                   
                },
                {
                    dimensions: ['time', 'value'],
                    source: props.analysis[3].detail
                   
                },
                {
                    dimensions: ['time', 'value'],
                    source: props.analysis[4].detail
                   
                },
                {
                    dimensions: ['time', 'value'],
                    source: props.analysis[5].detail
                   
                },
                {
                    dimensions: ['time', 'value'],
                    source: props.analysis[6].detail
                   
                },
                {
                    dimensions: ['time', 'value'],
                    source: props.analysis[7].detail
                   
                },
                {
                    dimensions: ['time', 'value'],
                    source: props.analysis[8].detail
                   
                },
              ],
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
          name: props.analysis[0].factor,
          type: 'line',
          datasetIndex: 0,
          encode:{
            x: 'time',
            y: 'value',
          }
        },
        {
          name: props.analysis[1].factor,
          type: 'line',
          datasetIndex: 1,
          encode:{
            x: 'time',
            y: 'value',
          }
        },
        {
          name: props.analysis[2].factor,
          type: 'line',
          datasetIndex: 2,
          encode:{
            x: 'time',
            y: 'value',
          }
        },
        {
          name: props.analysis[3].factor,
          type: 'line',
          datasetIndex: 3,
          encode:{
            x: 'time',
            y: 'value',
          }
        },
        {
          name: props.analysis[4].factor,
          type: 'line',
          datasetIndex: 4,
          encode:{
            x: 'time',
            y: 'value',
          }
        },
        {
          name: props.analysis[5].factor,
          type: 'line',
          datasetIndex: 5,
          encode:{
            x: 'time',
            y: 'value',
          }
        },
        {
          name: props.analysis[6].factor,
          type: 'line',
          datasetIndex: 6,
          encode:{
            x: 'time',
            y: 'value',
          }
        },
        {
          name: props.analysis[7].factor,
          type: 'line',
          datasetIndex: 7,
          encode:{
            x: 'time',
            y: 'value',
          }
        },
        {
          name: props.analysis[8].factor,
          type: 'line',
          datasetIndex: 8,
          encode:{
            x: 'time',
            y: 'value',
          }
        },
       
      ]})}, 1000);
              //echarts.init(document.getElementById("chart")).dispose();
             
              
         }
            )},
        props: [
        'analysis'
        ],
        data() {
        return {
        }
      },
      methods:{
        
      }
        }
    </script>