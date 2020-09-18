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
          type: "category",
          data: this.xdata,
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          enterable: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function () {
            var relVal = params.title + "<br/>";
            params.data.map((item,idx)=>{
              relVal += (idx+1) + '.' + item.name + " : " + item.value + item.Company + "<br/>";
            })
            return relVal;
          },
        },
        series: [
          {
            data: this.ydata,
            type: "bar",
            showBackground: true,
            color:'rgba(49, 66, 85, 0.9)'
          },
        ],
      });
    },
  },
};
</script>
