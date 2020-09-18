<template>
    <div :class="className" :id="id" :style="{height:'400px',width:'100%'}"/>
</template>

<script>
    import echarts from 'echarts'
    import resize from './mixins/resize'

    let dateList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    // let echartsList = [
    //     {
    //         name: '注册',
    //         dataList: [220, 182, 191, 134, 150, 120, 108, 125, 145, 122, 165, 122]
    //     },
    //     {
    //         name: '开卡',
    //         dataList: [18, 122, 131, 194, 110, 99, 110, 145, 115, 82, 235, 342]
    //     },
    //     {
    //         name: '邀请',
    //         dataList: [3, 12, 31, 64, 80, 120, 90, 94, 54, 175, 145, 208]
    //     },
    //     {
    //         name: '分配',
    //         dataList: [182, 218, 177, 145, 184, 194, 143, 87, 89, 112, 43, 234]
    //     }
    // ]
    export default {
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
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
                type: Array,
                default: []
            }
        },
        data() {
            return {
                chart: null,
                // echartsList: echartsList,//接收的数据待处理
                dataLists: [],//数据处理后的charts数据
                dataInfo:[],//处理数据后要展示的数据内容
                dateList: dateList,//处理数据后要展示的数据时间段
            }
        },
        mounted() {
            this.echartsList.map(i=>{
                this.dataLists.push(
                    {
                        name: i.name,
                        type: i.type,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#' + Math.floor( Math.random() * 0xffffff ).toString(16)
                                }, {
                                    offset: 0.8,
                                    color: '#' + Math.floor( Math.random() * 0xffffff ).toString(16)
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#' + Math.floor( Math.random() * 0xffffff ).toString(16),
                                borderColor: '#' + Math.floor( Math.random() * 0xffffff ).toString(16),
                                borderWidth: 0
                            }
                        },
                        data: i.data
                    }
                )
                this.dataInfo.push(i.name)
            })
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
                let labelOption = {
                    normal: {
                        show: true,
                        formatter: '{c}  {name|{a}}',
                        fontSize: 16,
                        rich: {
                            name: {
                                textBorderColor: '#fff'
                            }
                        }
                    }
                };
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            },
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    legend: {
                        top: 30,
                        itemWidth: 14,
                        itemHeight: 5,
                        itemGap: 13,
                        data: this.dataInfo,
                        textStyle: {
                            fontSize: 12,
                            color: '#57617B'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#' + Math.floor( Math.random() * 0xffffff ).toString(16)
                            }, {
                                offset: 0.8,
                                color: '#' + Math.floor( Math.random() * 0xffffff ).toString(16)
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                formatter: "{c}"+"人",
                                show: true,
                                position: "top",
                                textStyle: {
                                    fontWeight: "bolder",
                                    fontSize: "12",
                                    fontFamily : '微软雅黑'
                                }
                            },
                            color: '#' + Math.floor( Math.random() * 0xffffff ).toString(16),
                            borderColor: '#' + Math.floor( Math.random() * 0xffffff ).toString(16),
                            borderWidth: 0
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            axisLine: {
                                lineStyle: {
                                    color: '#57617B'
                                }
                            },
                            data: this.dateList
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '金额',
                            min: 0,
                            max: 48000,
                            interval: 8000,
                            axisLabel: {
                                formatter: '{value} 元'
                            }
                        },
                        {
                            type: 'value',
                            name: '访问人数',
                            min: 0,
                            max: 240,
                            interval: 40,
                            axisLabel: {
                                formatter: '{value} 人'
                            }
                        }
                    ],
                    series: this.echartsList
                })
            }
        }
    }
</script>
