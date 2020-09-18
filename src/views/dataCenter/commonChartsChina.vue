<template>
    <div :class="className" :id="id" :style="{height:'400px',width:'100%'}"/>
</template>

<script>
    import echarts from 'echarts'
	import '../../utils/china'
    import resize from './mixins/resize'

    let dateList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
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
            this.initChart();
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
                function randomData() {
                    return Math.round(Math.random()*500);
                }
                var geoCoordMap = {
                    "北京市": [116.378173828125, 39.90973623453719],
                    "天津市":[
                        117.19802856445311,
                        39.12366825402605
                    ],
                    "河北省": [
                        114.4830322265625,
                        38.06971703320484
                    ],
                    "山西省":[
                        112.52197265625,
                        37.89219554724437
                    ],
                    "四川省":[
                        104.07,
                        30.67
                    ],
                    "内蒙古自治区":[
                        111.67877197265624,
                        40.84706035607122
                    ],
                    "辽宁省":[
                        123.4423828125,
                        41.832735062152615
                    ],
                    "吉林省":[
                        125.3045654296875,
                        43.88997537383687
                    ],
                    "黑龙江省":[
                        126.6448974609375,
                        45.763690956618674
                    ],
                    "上海市": [
                        121.46209716796875,
                        31.228068791512136
                    ],
                    "江苏省":[
                        118.79241943359374,
                        32.05231681645636
                    ],
                    "浙江省":[
                        120.13824462890625,
                        30.300575007090888
                    ],
                    "安徽省":[
                        117.25982666015624,
                        31.861229825930895
                    ],
                    "福建省":[
                        119.30328369140624,
                        26.07652055985697
                    ],
                    "江西省": [
                        115.87005615234375,
                        28.680949728554964
                    ],
                    "山东省":[
                        117.12524414062501,
                        36.66841891894786
                    ],
                    "河南省": [
                        113.6480712890625,
                        34.77771580360469
                    ],
                    "湖北省":[
                        114.3017578125,
                        30.62373195163005
                    ],
                    "湖南省":[
                        112.99850463867188,
                        28.199136859968778
                    ],
                    "广东省":[
                        113.291015625,
                        23.14541110372829
                    ],
                    "广西壮族自治区":[
                        108.30047607421875,
                        22.842008398595794
                    ],
                    "重庆市":[
                        106.50146484374999,
                        29.592565403314087
                    ],
                    "贵州省":[
                        106.69921875,
                        26.60817437403311
                    ],
                    "云南省":[
                        102.72491455078125,
                        25.05076877966861
                    ],
                    "西藏自治区":[
                        91.131591796875,
                        29.663592747483726
                    ],
                    "甘肃省":[
                        103.83316040039062,
                        36.05742594589385
                    ],
                    "青海省":[
                        101.76567077636719,
                        36.64638529597495
                    ],
                    "新疆维吾尔自治区":[
                        87.60086059570312,
                        43.807774213873806
                    ],
                    "台湾省": [
                        121.56372070312499,
                        25.045792240303445
                    ],
                    "香港特别行政区":[
                        114.1754150390625,
                        22.32721165838893
                    ],
                    "澳门特别行政区": [
                        113.56155395507812,
                        22.151795575397756
                    ],
                };

                var mapData = [
                    {
                    "name": "北京市",
                    "value": "10"
                	},
                    {
                        "name": "天津市",
                        "count": "25"
                    },
                    {
                        "name": "河北省",
                        "count": "0"
                    },
                    {
                        "name": "山西省",
                        "count": "6"
                    },
                    {
                        "name": "内蒙古自治区",
                        "count": "1615"
                    },
                    {
                        "name": "辽宁省",
                        "count": "0"
                    },
                    {
                        "name": "吉林省",
                        "count": "0"
                    },
                    {
                        "name": "黑龙江省",
                        "count": "58"
                    },
                    {
                        "name": "上海市",
                        "count": "15377"
                    },
                    {
                        "name": "江苏省",
                        "count": "1088"
                    },
                    {
                        "name": "浙江省",
                        "count": "0"
                    },
                    {
                        "name": "安徽省",
                        "count": "0"
                    },
                    {
                        "name": "福建省",
                        "count": "1065"
                    },
                    {
                        "name": "江西省",
                        "count": "3148"
                    },
                    {
                        "name": "山东省",
                        "count": "25084"
                    },
                    {
                        "name": "河南省",
                        "count": "2885"
                    },
                    {
                        "name": "湖北省",
                        "count": "712"
                    },
                    {
                        "name": "湖南省",
                        "count": "2536"
                    },
                    {
                        "name": "广东省",
                        "count": "34"
                    },
                    {
                        "name": "广西壮族自治区",
                        "count": "0"
                    },
                    {
                        "name": "海南省",
                        "count": "0"
                    },
                    {
                        "name": "重庆市",
                        "count": "24"
                    },
                    {
                        "name": "四川省",
                        "count": "558"
                    },
                    {
                        "name": "贵州省",
                        "count": "646"
                    },
                    {
                        "name": "云南省",
                        "count": "427"
                    },
                    {
                        "name": "西藏自治区",
                        "count": "0"
                    },
                    {
                        "name": "陕西省",
                        "count": "0"
                    },
                    {
                        "name": "甘肃省",
                        "count": "0"
                    },
                    {
                        "name": "青海省",
                        "count": "0"
                    },
                    {
                        "name": "宁夏回族自治区",
                        "count": "0"
                    },
                    {
                        "name": "新疆维吾尔自治区",
                        "count": "0"
                    },
                    {
                        "name": "台湾省",
                        "count": "0"
                    },
                    {
                        "name": "香港特别行政区",
                        "count": "0"
                    },
                    {
                        "name": "澳门特别行政区",
                        "count": "0"
                    }];
                //拼接对象数组
                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];//获取坐标
                        if (geoCoord) {//如果有坐标
                            res.push({//创建对象数组，
                                name: data[i].name,
                                value: geoCoord.concat(Number(data[i].count))  //用连接数组的形式将value值加入
                            })
                        }
                    }
                    console.log(res)
                    return res;
                };
                var optionMap = {
                    backgroundColor: '#FFFFFF',
                    title: {
                        text: '全国地图大数据',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item'
                    },

                    //左侧小导航图标
                    visualMap: {
                        show : true,
                        x: 'left',
                        y: 'center',
                        splitList: [
                            {start: 500, end:600},{start: 400, end: 500},
                            {start: 300, end: 400},{start: 200, end: 300},
                            {start: 100, end: 200},{start: 0, end: 100},
                        ],
                        color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']
                    },

                    //配置属性
                    series: [{
                        name: '数据',
                        type: 'map',
                        mapType: 'china',
                        roam: true,
                        label: {
                            normal: {
                                show: true  //省份名称
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data:[
                            {name: '北京',value: '100' },{name: '天津',value: randomData() },
                            {name: '上海',value: randomData() },{name: '重庆',value: randomData() },
                            {name: '河北',value: randomData() },{name: '河南',value: randomData() },
                            {name: '云南',value: randomData() },{name: '辽宁',value: randomData() },
                            {name: '黑龙江',value: randomData() },{name: '湖南',value: randomData() },
                            {name: '安徽',value: randomData() },{name: '山东',value: randomData() },
                            {name: '新疆',value: randomData() },{name: '江苏',value: randomData() },
                            {name: '浙江',value: randomData() },{name: '江西',value: randomData() },
                            {name: '湖北',value: randomData() },{name: '广西',value: randomData() },
                            {name: '甘肃',value: randomData() },{name: '山西',value: randomData() },
                            {name: '内蒙古',value: randomData() },{name: '陕西',value: randomData() },
                            {name: '吉林',value: randomData() },{name: '福建',value: randomData() },
                            {name: '贵州',value: randomData() },{name: '广东',value: randomData() },
                            {name: '青海',value: randomData() },{name: '西藏',value: randomData() },
                            {name: '四川',value: randomData() },{name: '宁夏',value: randomData() },
                            {name: '海南',value: randomData() },{name: '台湾',value: randomData() },
                            {name: '香港',value: randomData() },{name: '澳门',value: randomData() }
                        ]  //数据
                    }]
                };
                //初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.id));

                //使用制定的配置项和数据显示图表
                myChart.setOption(optionMap);
            }
        }
    }
</script>
