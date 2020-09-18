<template>
  <div
    :class="className"
    :id="id"
    :style="{height:height,width:width}"
    :xdata="xdata"
    :ydata="ydata"
    :tooltipData="tooltipData"
  />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    xdata: {
      type: Array,
      default: [],
    },
    ydata: Array,
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },
    tooltipData:Object,//用于鼠标经过展示内容
    // 格式
    // this.tooltipData ={
		// 		title:'123',
		// 		data:[
		// 			{
		// 				"name":'订单总金额',
		// 				value:123
		// 			},
		// 			{
		// 				"name":'订单总金额2',
		// 				value:1233
		// 			},
		// 		]
		// 	}
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {

    this.initChart(this.tooltipData);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart(params) {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
          xAxis: {
              type: 'category',
              data: this.xdata
          },
          yAxis: {
              type: 'value',
              splitLine:{show: false},//去除网格线
          },
          series: [{
              data: this.ydata,
              type: 'line',
               symbol: 'circle',     //设定为实心点
                            symbolSize: 10,   //设定实心点的大小
              itemStyle:{
                normal:{
                  lineStyle:{
                    type:'dashed',
                    color:'rgba(250,0,0,0)'
                  }
                }
              },
          }],
         
          tooltip: {
            trigger: "axis",
            show: true,
            enterable: true,
            formatter: function () {
              var relVal = params.title + "<br/>";
              params.data.map((item,idx)=>{
                relVal += (idx+1) + '.' + item.name + " : " + item.value + item.Company + "<br/>";
              })
              return relVal;
            },
          },
      });
    },
   
  },
};
</script>
