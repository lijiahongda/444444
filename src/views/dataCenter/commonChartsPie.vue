<template>
    <div :class="className" :id="id" :style="{height:'400px',width:'100%'}"/>
</template>

<script>
    import echarts from 'echarts'
    import resize from './mixins/resize'

    export default {
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'pie'
            },
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '200px'
            },
            echartsList: {
                type: Object,
                default: []
            }
        },
        data() {
            return {
                chart: null,
                // echartsList: echartsList,//接收的数据待处理
                dataLists: [],//数据处理后的charts数据
                dataInfo:[],//处理数据后要展示的数据内容
            }
        },
        mounted() {
            this.initChart()
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id))
                this.chart.setOption({
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)",
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    title : {
                        text: this.echartsList.name,
                        x:'center'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.echartsList.dataList
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    series : this.echartsList
                })
            }
        }
    }
</script>
