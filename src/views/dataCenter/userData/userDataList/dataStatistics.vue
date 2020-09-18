<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item>
				<el-date-picker
					v-model="searchCondition.startTime"
					value-format="yyyy-MM-dd"
					type="date"
					placeholder="选择日期">
				</el-date-picker>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
				<!-- <div class="pan-btn ">
					<el-button type="success" @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}</el-button>
				</div> -->
			</el-form-item>
		</el-form>
		<el-table v-if="!switchChart" :data="list" border :fit="true" style="width: 100%">
			<el-table-column prop="userView" label="访客人数" align="center"></el-table-column>
			<el-table-column prop="viewNum" label="访问次数" align="center"></el-table-column>
			<el-table-column prop="orderUser" label="下单人数" align="center"></el-table-column>
			<el-table-column prop="orderNum" label="确认订单数" align="center"></el-table-column>
			<el-table-column prop="orderAmount" label="下单金额" align="center"></el-table-column>
			<el-table-column prop="rates" label="下单转化率" align="center"></el-table-column>
			<el-table-column prop="trueOrderUser" label="支付人数" align="center"></el-table-column>
			<el-table-column prop="trueOrderNum" label="成交订单数" align="center"></el-table-column>
			<el-table-column prop="trueOrderAmount" label="成交金额" align="center"></el-table-column>
			<el-table-column prop="userPrice" label="客单价" align="center"></el-table-column>
			<el-table-column prop="trueRates" label="下单支付转化率" align="center"></el-table-column>
			<el-table-column prop="payRates" label="支付转化率" align="center"></el-table-column>
		</el-table>
		<charts v-show="isShow" :echartsList="echartsList" />
		<div class="charts">
			<div class="item" v-show="isShow">
				<pie :echartsList="echartsListpie[0]" :id="pieIds[0]" />
			</div>

			<div class="item" style="border: 1px solid #ccc;border-width: 0px 1px 0px 0px;">
				<pie v-if="this.echartsListpie[1].data.length" :echartsList="echartsListpie[1]" :id="pieIds[1]" />
			</div>
			<div class="item last">
				<div class="item-title">
					<div class="item-child">销售排名TOP5</div>
					<div class="item-child">板块信息</div>
					<div class="item-child">销量</div>
				</div>
				<div class="item-main" v-for="item in productTop" :key="item.rank">
					<div class="item-child">{{item.rank}}</div>
					<div class="item-child">{{item.name}}</div>
					<div class="item-child">{{item.num}}</div>
				</div>
			</div>
		</div>
<!--		<div class="charts">-->
<!--			<div class="item">-->
<!--				<pie :echartsList="echartsListpie[2]" :id="pieIds[2]"  />-->
<!--			</div>-->
<!--			<div class="item" style="border: 1px solid #ccc;border-width: 0 1px;">-->
<!--				<pie :echartsList="echartsListpie[3]" :id="pieIds[3]"  />-->
<!--			</div>-->
<!--			<div class="item last web">-->
<!--				<div class="item-title">-->
<!--					<div class="item-child">销售排名</div>-->
<!--					<div class="item-child">板块信息</div>-->
<!--					<div class="item-child">TOP20</div>-->
<!--				</div>-->
<!--				<div class="item-main" v-for="n in 20">-->
<!--					<div class="item-child">1</div>-->
<!--					<div class="item-child">商品信息</div>-->
<!--					<div class="item-child">200</div>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
		<china v-show="isShow" :echartsList="echartsList" :id="pieIds[4]" />
	</div>
</template>
<script>
    import charts from '../../commonCharts' // 图表
    import pie from '../../commonChartsPie' // 图表
	import china from '../../commonChartsChina'
    import { getDataCount } from '@/api/order' // 接口

    export default {
        components: {
            charts,pie,china
        },
        data() {
            return {
                searchCondition: {
                    "startTime": '2019-10-03'
                },
                total: null,
                downloadLoading: false,
                switchChart: false,
                list: [],
				isShow: false,
                productTop: [],//销售商品前五
                orderToDay: [], //图一
                device: [], //访问设备
                echartsList: [
                    {
                        name:'商城成交金额',
                        type:'bar',
                        stack: '成交金额',
                        barWidth : 30,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data:[]
                    },
                    {
                        name:'大礼包成交金额',
                        type:'bar',
                        stack: '成交金额',
                        barWidth : 30,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data:[]
                    },
                    {
                        name:'酒店和线路成交金额',
                        type:'bar',
                        stack: '成交金额',
                        barWidth : 30,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data:[]
                    },
                    {
                        name:'商城订单数',
                        type:'bar',
                        stack: '订单数',
                        barWidth : 30,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data:[]
                    },
                    {
                        name:'大礼包订单数',
                        type:'bar',
                        stack: '订单数',
                        barWidth : 30,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data:[]
                    },
                    {
                        name:'酒店和线路订单数',
                        type:'bar',
                        stack: '订单数',
                        barWidth : 30,
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data:[]
                    },
                    {
                        name:'访问人数',
                        type:'line',
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        yAxisIndex: 1,
                        data:[]
                    }
                ],
				pieIds: ['source','equipment','social','search','china'],
                echartsListpie: [
                    {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    dataList:['直接访问','社交跳转','其它','搜索引擎'],
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '社交跳转'},
                        {value: 135, name: '其它'},
                        {value: 1548, name: '搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },{
                    name: '访问设备',
                    type: 'pie',
                    radius: '55%',
                        center: ['50%', '60%'],
                    dataList:['安卓','iOS'],
                    data: [

                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },{
                    name: '社交来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    dataList:['微信','微博','贴吧','QQ空间','知乎','其他'],
                    data: [
                        {value: 335, name: '微信'},
                        {value: 310, name: '微博'},
                        {value: 135, name: '贴吧'},
                        {value: 1548, name: 'QQ空间'},
                        {value: 310, name: '知乎'},
                        {value: 135, name: '其他'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },{
                    name: '搜索来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    dataList:['百度','谷歌','必应','好搜','搜狗','神马','其它'],
                    data: [
                        {value: 335, name: '百度'},
                        {value: 310, name: '谷歌'},
                        {value: 135, name: '必应'},
                        {value: 1548, name: '好搜'},
                        {value: 335, name: '搜狗'},
                        {value: 310, name: '神马'},
                        {value: 135, name: '其它'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            }
        },
        created() {
            this.getList()
        },
        methods: {
            // 列表数据
            getList() {
                getDataCount(this.searchCondition).then(res => {
                    if (res.data.code === 200){
                        this.list.push(res.data.list.statistics)
						this.productTop = res.data.list.productTop;
                        this.device = res.data.list.device;
                        this.orderToDay = res.data.list.orderToDay;
                        this.echartsListpie[1].data.push({value: this.device.android, name: '安卓'},
                            {value: this.device.ios, name: 'iOS'})
                        this.orderToDay.forEach(item=>{
                            this.echartsList[0].data.push(item.mallAmount); //商城成交金额
                            this.echartsList[1].data.push(item.giftAmount); //大礼包
                            this.echartsList[2].data.push(item.hotelLineAmount); //酒店线路成交金额
                            this.echartsList[3].data.push(item.mallNum); //商城订单数
                            this.echartsList[4].data.push(item.giftNum); //大礼包
                            this.echartsList[5].data.push(item.hotelLineNum); //酒店线路成交金额
                            this.echartsList[6].data.push(item.view); //访问人数
						})
                    }
                })
            },
            onSubmit() {
                this.searchCondition.page = 1
                this.getList()
            },
            // 导出
            handleDownload() {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
                    const filterVal = [
                        'id',
                        'title',
                        'author',
                        'pageviews',
                        'display_time'
                    ]
                    const list = this.list
                    const data = this.formatJson(filterVal, list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename,
                        autoWidth: this.autoWidth,
                        bookType: this.bookType
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v =>
                    filterVal.map(j => {
                        if (j === 'timestamp') {
                            return parseTime(v[j])
                        } else {
                            return v[j]
                        }
                    })
                )
            },
            // 查看详情
            handleClick(orderNo) {
                // this.$router.push({ path: '/hotel-detail', query: { orderNo: orderNo }})
            },
            handleCurrentChange(val) {
                this.searchCondition.page = val
                this.getList()
            }
        }
    }
</script>
<style type="scss">
	.charts{
		display: flex;
		align-items: center;
		margin-top: 40px;
	}
	.charts .item{
		display: flex;
		flex: 1;
	}
	.charts .item.last{
		display: flex;
		height: 300px;
		flex-direction: column;
	}
	.charts .item.last div{
		display: flex;
		justify-content: space-around;
		flex: 1;
		height: 50px;
		align-items: center;
	}
	.charts .item.last .item-title{
		font-weight: bold;
		color: #666;
		font-size: 14px;
	}
	.charts .item.last div:first-child,.charts .item.last div:last-child{
		flex: 0.5;
	}
	.charts .item.web{
		height: 400px;
	}
</style>
