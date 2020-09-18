<template>
	<section class="app-container" id="staticWidth">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="订单统计" name="first">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="订单状态">
						<el-select v-model="orderStatusValue" placeholder="请选择">
							<el-option
								v-for="(item,index) in options"
								:key="index"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单时间">
						<el-date-picker
							v-model="orderTime"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
						>
						</el-date-picker>
					</el-form-item>
					<el-row style="float: right;margin-right: 20px;" class="clearfix">
						<el-form-item>
							<el-button type="primary" @click="OrderStatisticalOnSubmit">查询</el-button>
						</el-form-item>
					</el-row>
				</el-form>
				<!--				订单量，订单总金额，毛利-->
				<el-container v-loading="statisticalLoading" element-loading-text="拼命加载中"
							  style="width:100%;background-color:#f7f7f7;box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.2);border-radius: 5px;padding: 5px;">
					<el-header class="headerStyle" style="height: 40px;line-height: 40px;">
						<!--				<span>{{start_time}}</span>-->
						<!--				<span> - </span>-->
						<!--				<span>{{end_time}}</span>-->
					</el-header>
					<el-main class="mainStyle">
						<el-row :gutter="20">
							<el-col :span="8">
								<div class="grid-content card-item">
									<div>订单量:</div>
									<div class="money"> {{allPrice + '单' ||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="grid-content card-item">
									<div>订单总金额:</div>
									<div class="money">¥ {{orderTotalAmount + '元' ||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="8">
								<div class="grid-content card-item">
									<div>毛利:</div>
									<div class="money">¥ {{GrossProfit + '元' ||'暂无数据' }}</div>
								</div>
							</el-col>
						</el-row>
					</el-main>
				</el-container>
				<!--				柱状图-->
				<div class="SetmealList" v-loading="zhuLoading" element-loading-text="拼命加载中">
					<div v-if="TemporarilyData" class="TemporarilyDataStyle">暂无数据</div>
					<div
						v-else
						id="home_DoubleLine"
						ref="home_DoubleLine"
						style="width:100%;display:block;margin:0 auto; height:300px;">
					</div>
				</div>
				<!-- 折线 -->
				<div class="brokenLine SetmealList" v-loading="zheLoading" element-loading-text="拼命加载中">
					<div class="top_class">
						<p>
							<span :class="timeCom== -1 ?'activ':''" @click="company(-1)">以天为单位</span>
							<span :class="timeCom== 2 ?'activ':''" @click="company(2)">以周为单位</span>
						</p>
						<el-select v-model="lineChartSele" placeholder="请选择" @change="getBrokenlineData">
							<el-option
								v-for="(item,index) in brokenLineShowWay"
								:key="index"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div v-if="TemporarilyDataZhe" class="TemporarilyDataStyle">暂无数据</div>
					<div
						v-else
						id="home_DoubleLin"
						ref="home_zhebleLine"
						style="width:100%;display:block;margin:0 auto; height:300px;">
					</div>
				</div>
				<!--				漏斗图-->
				<div class="SetmealList" v-loading="louLoading" element-loading-text="拼命加载中">
					<div v-if="TemporarilyDataLou" class="TemporarilyDataStyle">暂无数据</div>
					<div
						v-else
						id="home_DoubleLi"
						ref="home_loubleLine"
						style="width:100%;display:block;margin:0 auto; height:300px;">
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="订单列表明细" name="second">
				<el-form label-width="120px" :inline="true" class="demo-form-inline">
					<el-form-item label="订单号:">
						<el-input style="width: 180px;" v-model="orderListNumber" placeholder="请输入订单号"></el-input>
					</el-form-item>
					<el-form-item label="三方单号:">
						<el-input style="width: 180px;" v-model="orderListThreeNumber" placeholder="请输入三方单号"></el-input>
					</el-form-item>
					<el-form-item label="支付单号:">
						<el-input style="width: 180px;" v-model="orderListPaymentOrder"
								  placeholder="请输入支付单号"></el-input>
					</el-form-item>
					<el-form-item label="联系人手机号:">
						<el-input style="width: 180px;" v-model="orderListMemberPhoneNumber"
								  placeholder="请输入联系人手机号"></el-input>
					</el-form-item>
					<el-form-item label="订单状态:">
						<el-select v-model="orderStatusValue1" placeholder="请选择" style="width: 180px;">
							<el-option
								v-for="(item,index) in options"
								:key="index"
								:label="item.label"
								:value="item.value"
								clearable
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单时间:">
						<el-col>
							<el-form-item prop="startTime"
										  style="margin-right:0">
								<el-date-picker v-model="start_time"
												type="datetime"
												value-format="yyyy-MM-dd HH:mm:ss"
												placeholder="起始时间"
												style="width: 210px;"/>
							</el-form-item>
							<span>至</span>
							<el-form-item prop="endTime">
								<el-date-picker v-model="end_time"
												type="datetime"
												value-format="yyyy-MM-dd HH:mm:ss"
												placeholder="截止时间"
												style="width: 210px;"
								/>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-row style="float: right;margin-right: 20px;" class="clearfix">
						<el-form-item>
							<el-button type="primary" @click="orderListOnSubmit">查询</el-button>
						</el-form-item>
					</el-row>
				</el-form>
				<div class="detail">
					<div class="title">订单列表</div>
					<el-table
						v-loading="orderListLoading"
						element-loading-text="拼命加载中"
						:data="orderListTableData.list"
						style="width: 100%" border>
						<el-table-column prop="order_code" label="订单编号" fixed></el-table-column>
						<el-table-column prop="external_no" label="三方编号"></el-table-column>
						<el-table-column prop="create_time" label="下单时间"></el-table-column>
						<el-table-column prop="pay_number" label="支付单号"></el-table-column>
						<el-table-column prop="" label="实际支付金额" width="120">
							<template slot-scope="scope">
								{{scope.row.actual_price | MoneyFormat}}
							</template>
						</el-table-column>
						<el-table-column prop="mobile" label="联系人手机号" width="120"></el-table-column>
						<el-table-column prop="contact_name" label="联系人"></el-table-column>
						<el-table-column prop="dep_date" label="出发时间"></el-table-column>
						<el-table-column prop="dep_city" label="出发城市"></el-table-column>
						<el-table-column prop="arr_city" label="到达城市"></el-table-column>
						<el-table-column prop="flight_no" label="航班号"></el-table-column>
						<el-table-column prop="" label="订单状态">
							<template slot-scope="scope">
								{{scope.row.order_status | orderStatus}}
							</template>
						</el-table-column>
						<el-table-column prop="ticketNum" label="机票数量"></el-table-column>
						<el-table-column prop="" label="支付航空管家价格" width="140">
							<template slot-scope="scope">
								{{scope.row.deduction_price | MoneyFormat}}
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right">
							<template slot-scope="scope">
								<el-button
									@click="orderListOperation(scope.row,1)"
									type="text"
									size="small">
									订单详情
								</el-button>
								<el-button
									v-if="scope.row.showBtn"
									@click="orderListOperationbtn(scope.row,2)"
									type="text"
									size="small">
									退款
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!--	分页-->
					<div class="pagination-container" style="text-align:right;margin-bottom:50px" v-if="showPage">
						<el-pagination
							:current-page="orderListTableData.page"
							:page-size="orderListTableData.pageSize"
							:total="orderListTableData.total"
							background
							layout="total, sizes, prev, pager, next, jumper"
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							@prev-click="onClickPrev"
							@next-click="onClickNext"
						/>
					</div>
				</div>
			</el-tab-pane>
<!--			<el-tab-pane label="退票退款" name="third">-->
<!--				<el-form label-width="120px" :inline="true" class="demo-form-inline">-->
<!--					<el-form-item label="订单号">-->
<!--						<el-input v-model="RefundListNumber" placeholder="请输入订单号" style="width: 180px;"></el-input>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="三方单号">-->
<!--						<el-input v-model="RefundListThreeNumber" placeholder="请输入三方单号"-->
<!--								  style="width: 180px;"></el-input>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="支付单号">-->
<!--						<el-input v-model="RefundListPaymentOrder" placeholder="请输入支付单号"-->
<!--								  style="width: 180px;"></el-input>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="退款状态">-->
<!--						<el-select v-model="orderStatusValue2" placeholder="请选择" style="width: 180px;">-->
<!--							<el-option-->
<!--								v-for="(item,index) in RefundListStatus"-->
<!--								:key="index"-->
<!--								:label="item.label"-->
<!--								:value="item.value">-->
<!--							</el-option>-->
<!--						</el-select>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="会员手机号">-->
<!--						<el-input v-model="oRefundListMemberPhoneNumber" placeholder="请输入手机号"-->
<!--								  style="width: 180px;"></el-input>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="订单时间">-->
<!--						<el-col>-->
<!--							<el-form-item prop="startTime"-->
<!--										  style="margin-right:0">-->
<!--								<el-date-picker v-model="start_time1"-->
<!--												type="datetime"-->
<!--												value-format="yyyy-MM-dd"-->
<!--												placeholder="起始时间"-->
<!--												style="width: 145px;"/>-->
<!--							</el-form-item>-->
<!--							<span>至</span>-->
<!--							<el-form-item prop="endTime">-->
<!--								<el-date-picker v-model="end_time1"-->
<!--												type="datetime"-->
<!--												value-format="yyyy-MM-dd"-->
<!--												placeholder="截止时间"-->
<!--												style="width: 145px;"/>-->
<!--							</el-form-item>-->
<!--						</el-col>-->
<!--					</el-form-item>-->
<!--					<el-row style="float: right;margin-right: 20px;" class="clearfix">-->
<!--						<el-form-item>-->
<!--							<el-button type="primary" @click="RefundListOnSubmit">查询</el-button>-->
<!--						</el-form-item>-->
<!--					</el-row>-->
<!--				</el-form>-->
<!--				<div class="detail">-->
<!--					<div class="title">订单列表</div>-->
<!--					<el-table-->
<!--						v-loading="RefundListLoading"-->
<!--						element-loading-text="拼命加载中"-->
<!--						:data="RefundListTableData.list"-->
<!--						style="width: 100%" border>-->
<!--						<el-table-column prop="order_son" label="订单编号" fixed="left"></el-table-column>-->
<!--						<el-table-column prop="external_no" label="三方编号"></el-table-column>-->
<!--						<el-table-column prop="create_time" label="下单时间"></el-table-column>-->
<!--						<el-table-column prop="pay_number" label="支付单号"></el-table-column>-->
<!--						<el-table-column prop="pay_type" :formatter="RefundListPaymentChannel" label="支付渠道"></el-table-column>-->
<!--						<el-table-column prop="flight_no" label="机票ID"></el-table-column>-->
<!--						<el-table-column prop="" label="退款金额">-->
<!--							<template slot-scope="scope">-->
<!--								{{scope.row.flight_refund_price | MoneyFormat}}-->
<!--							</template>-->
<!--						</el-table-column>-->
<!--						<el-table-column prop="" label="手续费">-->
<!--							<template slot-scope="scope">-->
<!--								{{scope.row.change_price | MoneyFormat}}-->
<!--							</template>-->
<!--						</el-table-column>-->
<!--						<el-table-column prop="m_mobile" label="会员手机号" width="100px"></el-table-column>-->
<!--						<el-table-column prop="" label="退票状态">-->
<!--							<template slot-scope="scope">-->
<!--								{{scope.row.order_status | orderSonStatus}}-->
<!--							</template>-->
<!--						</el-table-column>-->
<!--						<el-table-column label="操作" width="100px" fixed="right">-->
<!--							<template slot-scope="scope">-->
<!--								<el-button-->
<!--									@click="showOrderDetails(scope.row,1)"-->
<!--									type="text"-->
<!--									size="small">-->
<!--									查看订单详情-->
<!--								</el-button>-->
<!--								<el-button-->
<!--									v-if="scope.row.showBtn"-->
<!--									@click="showRefundDetails(scope.row,2)"-->
<!--									type="text"-->
<!--									size="small">-->
<!--									退款详情-->
<!--								</el-button>-->
<!--							</template>-->
<!--						</el-table-column>-->
<!--					</el-table>-->
<!--					&lt;!&ndash;	分页&ndash;&gt;-->
<!--					<div class="pagination-container" style="text-align:right;margin-bottom:50px" v-if="showPage1">-->
<!--						<el-pagination-->
<!--							:current-page="RefundListTableData.page"-->
<!--							:page-size="RefundListTableData.pageSize"-->
<!--							:total="RefundListTableData.total"-->
<!--							background-->
<!--							layout="total, sizes, prev, pager, next, jumper"-->
<!--							@size-change="handleSizeChange1"-->
<!--							@current-change="handleCurrentChange1"-->
<!--							@prev-click="onClickPrev1"-->
<!--							@next-click="onClickNext1"-->
<!--						/>-->
<!--					</div>-->
<!--				</div>-->
<!--			</el-tab-pane>-->
		</el-tabs>
	</section>
</template>

<script>
	import {
		MoneyFormat,
		parseTime,
		orderStatus,
		idCardType,
		PassengerType,
		idType,
		refundType,
		orderSonStatus, dateFormat
	} from '@/utils/index.js'//过滤器
	import {
		getTicketOrderList,
		getRefundList,
		getTicketOrderDetails,
		getTicketInformation,
		getHistogramData,
		getLineChart,
		getFunnelFigure,
		orderlistTicketConfirmation
	} from '@/api/financialCps' // 接口
	export default {
		name: 'dataInfo',
		data() {
			return {
				//订单统计loading
				statisticalLoading: false,//统计loading
				zhuLoading: false,//柱状图loading
				zheLoading: false,//折线图loading
				louLoading: false,//漏斗图loading
				//订单明细列表loading
				orderListLoading: false,//列表loading
				//列表详情loading
				orderDetailLoading: false,//列表详情loading
				passengersLoading: false,//乘机人信息
				//退票列表loading
				RefundListLoading: false,//列表loading
				activeName: 'first',//tab位置
				showPage: false,//订单列表先加载列表数据再加载分页
				showPage1: false,//退票列表先加载列表数据再加载分页
				dialogFormVisible3: false,//订单详情弹窗显示
				dialogFormVisible: false,//退款详情dialog
				OrderPopupTitle: '',//dialog中的title值
				options: [{
					value: '',
					label: '全部'
				}, {
					value: '1',
					label: '已付款'
				}, {
					value: '2',
					label: '已取消'
				}, {
					value: '3',
					label: '出票中'
				}, {
					value: '4',
					label: '已出票'
				}, {
					value: '5',
					label: '出票失败'
				}, {
					value: '8',
					label: '已退票'
				}, {
					value: '16',
					label: '已退款'
				}],//订单统计和订单列表中的订单状态
				allPrice: '',//订单统计订单量
				orderTotalAmount: '',//订单统计总金额
				GrossProfit: '',//订单统计毛利
				TemporarilyData: false,//柱状图无数据显示
				TemporarilyDataLou: false,//折线图无数据显示
				TemporarilyDataZhe: false,//漏斗图无数据显示
				orderStatusValue: '',//订单统计中的订单状态
				orderTime: '',//订单统计中的订单时间
				brokenLineShowWay: [{
					value: '7',
					label: '近7天'
				}, {
					value: '14',
					label: '近14天'
				}, {
					value: '30',
					label: '近30天'
				}, {
					value: '90',
					label: '近90天'
				}],//折线图时间选择
				lineChartSele: '7',//折线图的时间选择model值
				timeCom: -1,//折线图默认选择以天为单位
				PassengerInformationData: [],//订单明细弹窗中乘机人信息
				orderListNumber: '',//订单明细列表订单号
				orderListTableData: {
					list: [],
					page: 1,
					pageSize: 10,
					total: 10
				},//订单列表 明细的table
				orderListThreeNumber: '',//订单明细列表三方单号
				orderListPaymentOrder: '',//订单明细列表支付单号
				orderListMemberPhoneNumber: '',//订单明细列表会员手机号
				orderStatusValue1: '',//订单明细列表中的订单状态
				start_time: '',//订单明细列表中的订单开始时间
				end_time: '',//订单明细列表中的订单结束时间
				showBtn: false,//订单列表中是否显示退款按钮
				showPassengerInformation: false,//列表退款详情不显示乘机人信息，客服信息和客服信息提交按钮
				showPassengerInformationBtn: false,//列表退款详情显示退款按钮
				ordertExtarea: '',//客服信息
				PassengerInformationList: '',//客服信息list
				PassengerInformation: false,//弹框是否显示乘机人信息list
				RefundDetailsRefundStatus: '',//退款状态
				RefundDetailsRefundNo: '',//退款单号
				RefundDetailsRefundInfo: '',//退款详情
				RefundDetailsCancelReason: '',//取消原因
				showRefundDataBtn:false,//退票详情不显示退票备注和确认退款按钮
				RefundListTableData: {
					list: [],
					page: 1,
					pageSize: 10,
					total: 20
				},//退款列表data
				RefundListNumber: '',//退款列表订单号
				RefundListThreeNumber: '',//退款列表三方单号
				refundListStatus: '',//退款状态的sel
				RefundListPaymentOrder: '',//退款列表支付单号
				oRefundListMemberPhoneNumber: '',//退款列表会员手机号
				orderStatusValue2: '',//退款列表中的订单状态
				start_time1: '',//退款列表中的订单开始时间
				end_time1: '',//退款列表中的订单结束时间
				RefundListStatus: [{
					value: '8',
					label: '已退款'
				}, {
					value: '9',
					label: '已退票'
				}, {
					value: '10',
					label: '退票中'
				}],//订单状态
			}
		},
		created() {
			this.type = this.$route.query ? this.$route.query.type : '';
			if (this.type == 1) {
				this.activeName = 'first'; //订单统计
			} else if (this.type == 2) {
				this.activeName = 'second'; //订单列表
				this.getTicketOrderList(1, 10, this.fun_date(-7), new Date())//订单明细列表订单
			} else if (this.type == 3) {
				this.activeName = 'third'; //退票退款
				this.getRefundList(1, 10, this.fun_date(-7), new Date())//退款列表
			} else {
				this.activeName = 'first'; //订单统计
			}
		},
		mounted() {
			this.calculateEcharts();
			this.getHistogramData()//柱状图
			this.getLineChart(-1, 7)//折线图
			this.getFunnelChart()//漏斗图
			this.getOrderStatistcalList()//订单统计信息查询
		},
		filters: {
			MoneyFormat,
			parseTime,
			orderStatus,
			idCardType,
			PassengerType,
			idType,
			refundType,
			orderSonStatus,
			dateFormat
		},
		methods: {
			calculateEcharts() {
				//获取这个组件的窗口宽度
				this.initWidth = document.getElementById('staticWidth').offsetWidth;
				console.log(this.initWidth);
			},
			//取7天前后的时间
			fun_date(aa) {
				let date1 = new Date(),
				time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
				let date2 = new Date(date1);
				date2.setDate(date1.getDate() + aa);
				let time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
				// fun_date(7);//7天后的日期
				// fun_date(-7);//7天前的日期
			},
			//	tab	切换事件
			handleClick(tab, event) {
				console.log(tab, event);
				if (tab.index == '0') { //订单统计
					this.getHistogramData()//柱状图
					this.getLineChart(-1, 7)//折线图
					this.getFunnelChart()//漏斗图
					this.getOrderStatistcalList()//订单统计信息查询
				} else if (tab.index == '1') {//订单列表明细
					this.getTicketOrderList(1, 10, this.fun_date(-7), new Date())//订单明细列表订单
				} else if (tab.index == '2') {//退票退款
					this.getRefundList(1, 10, this.fun_date(-7), new Date())//退款列表
				}
			},
			//订单统计查询
			OrderStatisticalOnSubmit() {
				this.getOrderStatistcalList();
			},
			//订单统计信息查询
			getOrderStatistcalList() {
				this.statisticalLoading = true;
				let getOrderList = {
					order_status: this.orderStatusValue,//订单状态
					start_time: this.orderTime[0],//开始时间
					end_time: this.orderTime[1]//结束时间
				}
				getTicketInformation(getOrderList).then(res => {
					this.statisticalLoading = false;
					if (res.data.code === 200) {
						if (res.data.data.num == null) {
							this.allPrice = 0;
						} else {
							this.allPrice = res.data.data.num;
						}
						if (res.data.data.all_price == null) {
							this.orderTotalAmount = 0;
						} else {
							this.orderTotalAmount = res.data.data.all_price;
						}
						if (res.data.data.maoli_amount_total == null) {
							this.GrossProfit = 0;
						} else {
							this.GrossProfit = res.data.data.maoli_amount_total;
						}
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			// 柱状图
			getHistogramData() {
				this.zhuLoading = true;
				getHistogramData().then(res => {
					this.zhuLoading = false;
					if (res.data.code === 200) {
						if ((res.data.data).length == 0) {
							this.TemporarilyData = true;
						} else {
							let xLineData = [];
							let orderTotalAmount = [];//订单总金额
							let SumOrders = [];//订单量总和
							let returnedOrders = [];//退单量总和
							let GrossProfit = [];//毛利
							for (let i = 0; i < (res.data.data.length); i++) {
								xLineData.push((res.data.data)[i].month.slice(0, 4) + '年' + (res.data.data)[i].month.slice(5) + '月');
								orderTotalAmount.push((res.data.data)[i].actual_price);
								SumOrders.push((res.data.data)[i].order_num);
								if ((res.data.data)[i].refund_price == null) {
									(res.data.data)[i].refund_price = 0;
								}
								returnedOrders.push((res.data.data)[i].refund_price);
								GrossProfit.push((res.data.data)[i].maoli_price);
							}
							let myChart = this.$echarts.init(this.$refs.home_DoubleLine);
							myChart.setOption({
								color: ['#3398DB'],
								tooltip: {
									trigger: "axis",
									axisPointer: {
										type: 'shadow'
									},
									formatter: '{b0}</br>{a0}:{c0}元</br>{a1}:{c1}单<br/>{a2}:{c2}元<br/>{a3}:{c3}元' // 这里是鼠标移上去的显示数据
								},
								grid: {
									left: '3%',
									right: '4%',
									bottom: '3%',
									containLabel: true
								},
								xAxis: [
									{
										type: 'category',
										data: xLineData,
										axisTick: {
											alignWithLabel: true
										}
									}
								],
								yAxis: [
									{
										type: "value",
									}
								],
								series: [
									{
										name: '订单总金额',
										type: 'bar',
										barWidth: '60%',
										data: orderTotalAmount
									},
									{
										name: '订单量总和',
										type: 'bar',
										data: SumOrders
									},
									{
										name: '退单量总和',
										type: 'bar',
										data: returnedOrders
									},
									{
										name: '毛利',
										type: 'bar',
										data: GrossProfit
									}
								]
							})
							let resize = {
								width: this.initWidth,
								height: 270
							};
							myChart.resize(resize);
						}
					} else {
						this.$message.error(res.data.msg);
					}
				});
			},
			// 折线图 单位变化时 周/天
			company(val) {
				this.timeCom = val
				this.getLineChart(val, this.lineChartSele);
			},
			//折线图时间发生改变时
			getBrokenlineData(val) {
				this.getLineChart(this.timeCom, val);
			},
			//折线图
			getLineChart(val, date) {//参数为显示方式和时间
				this.zheLoading = true;
				let _this = this;
				let getLineChartData = {};
				if (_this.timeCom == 2) {
					getLineChartData = {
						order_status: _this.orderStatusValue,//订单状态
						start_time: (_this.orderTime)[0],//开始时间
						end_time: (_this.orderTime)[1],//结束时间
						cycle: val,//显示方式	-1天2周
						day: ''//请求多少天数据 7天，14天，30天，90天，显示方式时周时不传day值
					};
				} else if (_this.orderTime == '') {
					getLineChartData = {
						order_status: _this.orderStatusValue,//订单状态
						start_time: '',//开始时间
						end_time: '',//结束时间
						cycle: _this.timeCom,//显示方式	-1天2周
						day: _this.lineChartSele//请求多少天数据 7天，14天，30天，90天，显示方式时周时不传day值
					};
				} else {
					getLineChartData = {
						order_status: _this.orderStatusValue,//订单状态
						start_time: (_this.orderTime)[0],//开始时间
						end_time: (_this.orderTime)[1],//结束时间
						cycle: _this.timeCom,//显示方式	-1天2周
						day: _this.lineChartSele//请求多少天数据 7天，14天，30天，90天，显示方式时周时不传day值
					};
				}
				getLineChart(getLineChartData).then(res => {
					this.zheLoading = false;
					if (res.data.code === 200) {
						if (res.data.data.length == 0) {
							this.TemporarilyDataZhe = true;
						} else {
							let xLineData = [];
							for (let i = 0; i < (res.data.data.length); i++) {
								xLineData.push((res.data.data)[i].date);
								//value是echart识别折线图的key值,这里让value等于订单总金额
								(res.data.data)[i].value = (res.data.data)[i].actual_price;
								if ((res.data.data)[i].refund_price == null) {
									(res.data.data)[i].refund_price = 0;
								}
							}
							let myChart = this.$echarts.init(this.$refs.home_zhebleLine)
							myChart.setOption({
								color: ['#3398DB'],
								tooltip: {
									trigger: "axis",
									formatter: function (params) {
										let tipText = "";
										params.forEach(function (item, index) {
											tipText += item.data.date
												+ '日'
												+ '</br>'
												+ '订单总金额：'
												+ item.data.actual_price
												+ '元'
												+ '</br>'
												+ '订单量总和:'
												+ item.data.order_num
												+ '单'
												+ '</br>'
												+ '退单量总和:'
												+ item.data.refund_price
												+ '单'
												+ '</br>'
												+ '毛利:'
												+ item.data.maoli_price
												+ '元';
										});
										return tipText;
									}
								},
								xAxis: [
									{
										type: 'category',
										data: xLineData,
									}
								],
								yAxis: [
									{
										type: "value",
									}
								],
								series: [{
									name: '',
									type: 'line',
									smooth: true, //是否以弧线展示折线
									itemStyle: {
										normal: {
											color: '#3398DB',  //折线折点颜色
											lineStyle: {
												width: 2  //折线宽度
											}
										}
									},
									data: res.data.data
								}]
							})
							let resize = {
								width: this.initWidth,
								height: 270
							};
							myChart.resize(resize);
						}
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			//漏斗图
			getFunnelChart() {
				this.louLoading = true;
				getFunnelFigure().then(res => {
					this.louLoading = false;
					if (res.data.code === 200) {
						if (res.data.data.yuetao_nume == 0 && res.data.data.yt_search_num == 0 && res.data.data.order_num == 0 && res.data.data.order_pay_num == 0) {
							this.TemporarilyData = true;
						} else {
							let myChart = this.$echarts.init(this.$refs.home_loubleLine)
							myChart.setOption({
								tooltip: {},
								series: [
									{
										name: '',
										type: 'funnel',
										left: '10%',
										top: 60,
										//x2: 80,
										bottom: 60,
										width: '80%',
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
										data: [
											{value: res.data.data.yuetao_nume, name: '悦淘机票入口点击量'},
											{value: res.data.data.yt_search_num, name: '机票搜索按钮点击量'},
											{value: res.data.data.order_num, name: '机票订单量'},
											{value: res.data.data.order_pay_num, name: '订单支付量'}
										]
									}
								]
							})
							let resize = {
								width: this.initWidth,
								height: 270
							};
							myChart.resize(resize);
						}
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			//机票订单明细列表
			getTicketOrderList(page, pageSize, start_time, end_time) {
				this.orderListLoading = true;
				this.orderListTableData.list = [];
				let getTicketOrderListData = {
					order_code: this.orderListNumber,//订单号
					external_no: this.orderListThreeNumber,//三方订单号
					pay_number: this.orderListPaymentOrder,//支付订单号
					mobile: this.orderListMemberPhoneNumber,//会员手机号
					order_status: this.orderStatusValue1,//订单状态
					start_time: start_time,//开始时间
					end_time: end_time,//结束时间
					page: page,//页码
					pageSize: pageSize,//页码数量
				}
				getTicketOrderList(getTicketOrderListData).then(res => {
					this.orderListLoading = false;
					if (res.data.code === 200) {
						let newData = res.data.data.data;
						for (let i = 0; i < newData.length; i++) {
							if (newData[i].order_status == 2 || newData[i].order_status == 5) {
								newData[i].showBtn = true;
							} else {
								newData[i].showBtn = false;
							}
						}
						this.orderListTableData.list = newData;
						this.orderListTableData.page = parseInt(res.data.data.page);
						this.orderListTableData.pageSize = parseInt(res.data.data.pageSize);
						this.orderListTableData.total = parseInt(res.data.data.total);
						this.showPage = true;//数据加载完成显示分页
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			//订单明细列表查询btn
			orderListOnSubmit() {
				let start_time = this.start_time;
				let end_time = this.end_time;
				let page = this.orderListTableData.page;
				this.getTicketOrderList(page, this.orderListTableData.pageSize, start_time, end_time);
			},
			//订单列表操作按钮
			orderListOperation(row, type) {
				this.$router.push({path: '/planeTickets/orderListDetail', query: {row: row, type: type}});
			},
			//订单列表退款操作按钮
			orderListOperationbtn(row, type) {
				this.$router.push({path: '/planeTickets/orderListDetail', query: {row: row, type: type}});
			},
			//分页每页条数change
			handleSizeChange(val) {
				console.log('每页显示' + val + '条');
				this.getTicketOrderList.pageSize = val;
				let start_time = this.start_time;
				let end_time = this.end_time;
				let page = this.orderListTableData.page;
				this.getTicketOrderList(page, val, start_time, end_time);
			},
			//分页当前页发生change
			handleCurrentChange(val) {
				this.orderListTableData.page = val;
				let start_time = this.start_time;
				let end_time = this.end_time;
				this.getTicketOrderList(val, this.orderListTableData.pageSize, start_time, end_time);
			},
			//分页点击上一页change
			onClickPrev(val) {
				let start_time = this.start_time;
				this.orderListTableData.page = val;
				let end_time = this.end_time;
				this.getTicketOrderList(val, this.orderListTableData.pageSize, start_time, end_time);
			},
			//分页点击下一页change
			onClickNext(val) {
				let start_time = this.start_time;
				let end_time = this.end_time;
				this.orderListTableData.page = val;
				this.getTicketOrderList(val, this.orderListTableData.pageSize, start_time, end_time);
			},
			//get退款列表
			getRefundList(page, pageSize, start_time, end_time) {
				this.RefundListLoading = true;
				let getTicketOrderListData = {
					order_code: this.RefundListNumber,//订单号
					external_no: this.RefundListThreeNumber,//三方订单号
					pay_order_id: this.RefundListPaymentOrder,//支付订单号
					order_status: this.orderStatusValue2,//订单状态
					mobile: this.oRefundListMemberPhoneNumber,//会员手机号
					start_time: start_time,//开始时间
					end_time: end_time,//结束时间
					page: page,//页码
					pageSize: pageSize,//页码数量
				}
				getRefundList(getTicketOrderListData).then(res => {
					this.RefundListLoading = false;
					if (res.data.code === 200) {
						for (let i = 0; i < (res.data.data.data).length; i++) {
							if ((res.data.data.data)[i].order_status == 13) {
								(res.data.data.data)[i].showBtn = true;
							} else {
								(res.data.data.data)[i].showBtn = false;
							}
						}
						this.RefundListTableData.list = res.data.data.data;
						this.RefundListTableData.page = res.data.data.page;
						this.RefundListTableData.pageSize = parseInt(res.data.data.pageSize);
						this.RefundListTableData.total = parseInt(res.data.data.total);

						this.showPage1 = true;//数据加载完成显示分页
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			//退款列表按钮查询
			RefundListOnSubmit() {
				this.getRefundList(this.RefundListTableData.page, this.RefundListTableData.pageSize, this.start_time1, this.end_time1);
			},
			//分页每页条数change
			handleSizeChange1(val) {
				this.getRefundList(this.RefundListTableData.page, val, this.start_time1, this.end_time1);
			},
			//分页当前页发生change
			handleCurrentChange1(val) {
				this.RefundListTableData.page = val;
				this.getRefundList(val, this.RefundListTableData.pageSize, this.start_time1, this.end_time1);
			},
			//分页点击上一页change
			onClickPrev1(val) {
				console.log(val);
				this.RefundListTableData.page = val;
				//查询判断是否选择时间
				this.getRefundList(val, this.RefundListTableData.pageSize, this.start_time1, this.end_time1);
			},
			//分页点击下一页change
			onClickNext1(val) {
				console.log(val);
				this.RefundListTableData.page = val;
				this.getRefundList(val, this.RefundListTableData.pageSize, this.start_time1, this.end_time1);
			},
			//退款列表中支付渠道判断
			RefundListPaymentChannel(row, column) {
				if (row.state === 0) {
					return '未支付'
				} else if (row.state === 1) {
					return '微信'
				} else if (row.state === 2) {
					return '支付宝'
				} else {
					return ('渠道获取中')
				}
			},
			//退款列表查看订单详情
			showOrderDetails(row, type) {
				this.$router.push({path: '/planeTickets/RefundListDetail', query: {row: row,type: type}});
			},
			//退款列表确认退款
			showRefundDetails(row,type) {
				this.$router.push({path: '/planeTickets/RefundListDetail', query: {row: row,type: type}});
			}
		}
	}
</script>

<style scoped="scoped">
	.app-container {
		background-color: #f0f2f4;
	}

	/*	柱状图 ,折线图，漏斗图*/
	.SetmealList {
		background-color: #fff;
		margin-top: 20px;
		border-radius: 10px;
		width: 100%;
		box-shadow: 4px 4px 5px #888888;
	}

	.el-input--medium .el-input__inner {
		width: 180px !important;
	}

	.TemporarilyDataStyle {
		margin: 0 auto;
		line-height: 300px;
	}

	.PassengerInformationStyle {
		color: #000000;
		font-size: 20px;
		font-weight: 700;
	}

	.top_block {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 100px;
	}

	.el_block {
		width: 31%;
		height: 160px;
		background: #fff;
		border-radius: 8px;
		box-shadow: 4px 4px 5px #888888;
		padding: 30px;
		box-sizing: border-box;
		position: relative;
	}

	.top_block .title {
		font-size: 16px;
		font-weight: 600;
	}

	.top_block .count_num {
		font-size: 20px;
		font-weight: 600;
		position: absolute;
		bottom: 30px;
		right: 100px;
	}

	.echart {
		margin-bottom: 100px;
	}

	/* 折线 */
	.brokenLine {
		position: relative;
	}

	.top_class {
		position: absolute;
		right: 10%;
		top: 5px;
		display: flex;
		align-items: center;
		z-index: 999999;
	}

	.top_class p {
		display: flex;
		align-items: center;
		margin-right: 20px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	.top_class p span {
		height: 35px;
		line-height: 35px;
		padding: 0 10px;
		cursor: pointer;
	}

	.top_class p span.activ {
		background: #409EFF;
	}

	.detail .title {
		font-size: 18px;
		font-weight: 800;
		margin-bottom: 10px;
	}

	.details .list {
		display: flex;
		align-items: center;
		height: 40px;
	}

	.details .list p {
		width: 200px;
		text-align: right;
		margin-right: 20px;
		font-weight: 600;
	}

	/*统计卡片*/
	.mainStyle {
		padding: 20px 20px 0 20px;
	}

	.grid-content {
		min-height: 36px;
	}

	.card-item {
		min-height: 85px;
		color: rgba(80, 80, 80, 1);
		border-radius: 8px;
		border: rgba(229, 229, 229, 1) solid 1px;
		text-align: left;
		font-size: 14px;
		line-height: 150%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 15px;
	}

	.money { /* 卡片数字金额样式 */
		line-height: 30px;
		/*color: rgba(212, 48, 48, 1);*/
		font-size: 20px;
	}

	.headerStyle {
		border-bottom: 1px solid #dfdfdf;
	}

	.clearfix {
	&
	:after {
		visibility: hidden;
		display: block;
		font-size: 0;
		content: " ";
		clear: both;
		height: 0;
	}
	}
</style>
