<template>
  <div
    :class="className"
    :id="id"
    :style="{height:height,width:width}"
    :cdata="cdata"
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
    cdata: Array,
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
    console.log(this.tooltipData,'this.tooltipData')
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
      console.log(params,'pppp')
      this.chart.setOption({
          tooltip: {
              trigger: 'item',
              formatter: function () {
                var relVal = params.title + "<br/>";
                params.data.map((item,idx)=>{
                  relVal += (idx+1) + '.' + item.name + " : " + item.value + item.Company + "<br/>";
                })
                return relVal;
              },
          },
          
          // legend: {
          //     data: this.xdata
          // },

          series: [
              {
                  name:'漏斗图',
                  type:'funnel',
                  left: '10%',
                  top: 60,
                  //x2: 80,
                  bottom: 60,
                  width: '80%',
                  // height: {totalHeight} - y - y2,
                  min: 0,
                  max: 100,
                  minSize: '0%',
                  maxSize: '100%',
                  sort: 'descending',
                  gap: 2,
                  label: {
                      show: true,
                      position: 'inside'
                  },
                  labelLine: {
                      length: 10,
                      lineStyle: {
                          width: 1,
                          type: 'solid'
                      }
                  },
                  itemStyle: {
                      borderColor: '#fff',
                      borderWidth: 1
                  },
                  emphasis: {
                      label: {
                          fontSize: 20
                      }
                  },
                  data: this.cdata
              }
          ]
      });
    },
    
  },
};
</script>
