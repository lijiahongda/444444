<template>
	<section class="app-container">
		<div class="clearfix">
			<div style="margin-bottom:20px;">
				<router-link :to="{path:'/planeTickets/order',query:{type:2}}">
					<el-button type="primary">返回列表</el-button>
				</router-link>
			</div>
			<div class="details" v-loading="orderDetailLoading" element-loading-text="拼命加载中">
				<div class="list">
					<p>订单编号：</p>
					<span>{{RefundDetailsOrder || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>支付单号：</p>
					<span>{{RefundDetailsPaymentOrder || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>航空公司：</p>
					<span>{{RefundDetailsAirlines || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>航班号：</p>
					<span>{{RefundDetailsFlightNo || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>出发城市：</p>
					<span>{{RefundDetailsDepartureCity || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>到达城市：</p>
					<span>{{RefundDetailsArriveCity || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>联系人姓名：</p>
					<span>{{RefundDetailsContactName || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>联系人电话：</p>
					<span>{{RefundDetailsContactPhone || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>机票数量：</p>
					<span>{{RefundDetailsTicketNumber || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>订单状态：</p>
					<span>{{RefundDetailsOrderStatus || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>订单总价：</p>
					<span>{{RefundDetailsOrderTotalPrice || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>支付渠道：</p>
					<span>{{RefundDetailsPaymentChannel || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>订单创建时间：</p>
					<span>{{RefundDetailsOrderCreationTime || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>支付时间：</p>
					<span>{{RefundDetailsOrderPayTime | dateFormat}}</span>
				</div>
				<div class="list">
					<p>出发时间：</p>
					<span>{{RefundDetailsTicketTime || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>退款状态：</p>
					<span>{{RefundDetailsRefundStatus || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>退款单号：</p>
					<span>{{RefundDetailsRefundNo || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>退款详情：</p>
					<span>{{RefundDetailsRefundInfo || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>取消原因：</p>
					<span>{{RefundDetailsCancelReason || '暂无数据'}}</span>
				</div>
			</div>
			<!--			乘机人信息   退款不显示乘机人信息-->
			<div class="" v-if="showPassengerInformation">
				<p class="PassengerInformationStyle">乘机人信息</p>
				<el-table
					v-loading="passengersLoading" element-loading-text="拼命加载中"
					:data="PassengerInformationData"
					style="width: 100%" border>
					<el-table-column
						prop="name"
						label="姓名">
					</el-table-column>
					<el-table-column
						prop=""
						label="证件类型">
						<template slot-scope="scope">
							{{scope.row.id_type | idCardType}}
						</template>
					</el-table-column>
					<el-table-column
						prop="id_card"
						label="证件号码">
					</el-table-column>
					<el-table-column
						prop="phone"
						label="联系电话">
					</el-table-column>
					<el-table-column
						prop=""
						label="乘机人类型"
						width="100">
						<template slot-scope="scope">
							{{scope.row.type | PassengerType}}
						</template>
					</el-table-column>
					<el-table-column
						prop=""
						label="机票价格">
						<template slot-scope="scope">
							{{scope.row.ticket_price | MoneyFormat}}
						</template>
					</el-table-column>
					<el-table-column
						prop=""
						label="实际付款价格" width="140">
						<template slot-scope="scope">
							{{scope.row.actual_ticket_price | MoneyFormat}}
						</template>
					</el-table-column>
					<el-table-column
						prop=""
						label="退改手续费"
						width="100">
						<template slot-scope="scope">
							{{scope.row.change_price | MoneyFormat}}
						</template>
					</el-table-column>
					<el-table-column
						prop=""
						label="机票状态">
						<template slot-scope="scope">
							{{scope.row.order_status | orderSonStatus}}
						</template>
					</el-table-column>
					<el-table-column
						prop=""
						label="退票类型">
						<template slot-scope="scope">
							{{scope.row.order_status | refundType}}
						</template>
					</el-table-column>
					<el-table-column
						prop="scope.row.refund_info"
						label="退票备注信息" width="140">
					</el-table-column>
				</el-table>
			</div>
			<!--			客服信息备注-->
			<div class="" v-if="showPassengerInformation">
				<!--		以往客服信息		-->
				<p class="PassengerInformationStyle">客服信息备注</p>
				<el-container style="margin-bottom: 20px;" v-for="(item,index) in PassengerInformationList" :key="index">
					<el-main class="" style="background-color:#f0f0f0;width:800px;">
						<p style="text-align: left;margin-bottom: 10px;">{{item.desc}}</p>
						<div class="" style="text-align: right;">
							<span>{{item.name}}</span>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<span>{{item.created_at}}</span>
						</div>
					</el-main>
				</el-container>
				<el-input
					type="textarea"
					:rows="2"
					placeholder="请输入内容"
					v-model="ordertExtarea">
				</el-input>
			</div>
			<!--			客服信息提交按钮-->
			<div class="floatRight" v-if="showPassengerInformation">
				<el-button type="primary" @click="serviceInformationSubmission">提交客服信息</el-button>
			</div>
			<!--			订单列表详情退款按钮-->
			<div class="floatRight" v-if="showPassengerInformationBtn">
				<el-button type="primary" @click="serviceInformationSubmissionBtn">确认退款</el-button>
			</div>
		</div>
	</section>
</template>

<script>
	import { MoneyFormat,
		parseTime ,
		orderStatus,
		idCardType,
		PassengerType,
		idType,
		refundType,
		orderSonStatus,dateFormat} from '@/utils/index.js'//过滤器
	import {
		getTicketOrderDetails ,
		getPassengerInformationList,
		getNformationSubmission,
		setrecordService,
		orderlistTicketConfirmation
	} from '@/api/financialCps' // 接口
	export default {
		name: "orderListDetail",
		data() {
			return {
				orderId:'',//订单id
				orderDetailLoading:false,//列表详情loading
				passengersLoading:false,//是否显示乘机人信息
				PassengerInformationData:[],//订单明细弹窗中乘机人信息
				PassengerInformationList:'',//客服信息list
				PassengerInformation:false,//弹框是否显示乘机人信息list
				showPassengerInformation:false,//列表退款详情不显示乘机人信息，客服信息和客服信息提交按钮
				showPassengerInformationBtn:false,//列表退款详情显示退款按钮

				RefundDetailsOrder:'',//订单编号
				RefundDetailsPaymentOrder:'',//支付单号
				RefundDetailsAirlines:'',//航空公司
				RefundDetailsFlightNo:'',//航班号
				RefundDetailsDepartureCity:'',//出发城市
				RefundDetailsArriveCity:'',//到达城市
				RefundDetailsContactName:'',//联系人姓名
				RefundDetailsContactPhone:'',//联系人电话
				RefundDetailsTicketNumber:'',//机票数量
				RefundDetailsOrderStatus:'',//订单状态
				RefundDetailsOrderTotalPrice:'',//订单总价
				RefundDetailsPaymentChannel:'',//支付渠道
				RefundDetailsOrderCreationTime:'',//订单创建时间
				RefundDetailsOrderPayTime:'',//订单支付时间
				RefundDetailsTicketTime:'',//出票时间
				RefundDetailsRefundStatus:'',//退款状态
				RefundDetailsRefundNo:'',//退款单号
				RefundDetailsRefundInfo:'',//退款详情
				RefundDetailsCancelReason:'',//取消原因
				ordertExtarea:'',//客服信息
			}
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
		created() {
			this.row = this.$route.query ? this.$route.query.row : '';
			this.type = this.$route.query ? this.$route.query.type : '';
			if (this.row) {
				this.getRefundListEdit(this.row.id);//机票订单数据详情
			}
			if(this.type == 1){//查看订单详情
				this.showPassengerInformation = true;//显示乘机人信息，客服信息和客服信息提交按钮
				this.showPassengerInformationBtn = false;//不显示退款按钮
				this.getPassengerInformationData();//get乘机人信息
				this.getPassengerInformation();//乘机人客服信息
			}else if(this.type == 2){//订单详情退票
				this.showPassengerInformation = false;//不显示乘机人信息，客服信息和客服信息提交按钮
				this.showPassengerInformationBtn = true;//显示退款按钮  自订单13可以发起退款
			}
		},
		methods: {
			//机票订单数据详情
			getRefundListEdit(orderId){
				this.orderDetailLoading = true;
				let getRefundListEditDate = {
					order_id:orderId
				};
				getTicketOrderDetails(getRefundListEditDate).then(res=>{
					this.orderDetailLoading = false;
					if(res.data.code == 200){
						let orderDetails = res.data.data.orderInfo;
						this.RefundDetailsOrder = orderDetails.order_code;//订单详情弹窗订单编号
						this.RefundDetailsPaymentOrder = orderDetails.pay_number;//订单详情弹窗支付单号
						this.RefundDetailsAirlines = orderDetails.air_company_name;//航空公司
						this.RefundDetailsFlightNo = orderDetails.flight_no;//航班号
						this.RefundDetailsDepartureCity = orderDetails.dep_city;//出发城市
						this.RefundDetailsArriveCity = orderDetails.arr_city;//到达城市
						this.RefundDetailsContactName = orderDetails.contact_name;//联系人姓名
						this.RefundDetailsContactPhone = orderDetails.mobile;//联系人电话
						this.RefundDetailsTicketNumber = orderDetails.ticketNUm;//机票数量
						this.RefundDetailsOrderStatus = orderDetails.order_status_desc;//订单状态
						this.RefundDetailsOrderTotalPrice = (orderDetails.actual_price)/100;//订单总价
						this.RefundDetailsPaymentChannel = orderDetails.pay_type_desc;//支付渠道
						this.RefundDetailsOrderCreationTime = orderDetails.create_time;//订单创建时间
						this.RefundDetailsOrderPayTime = orderDetails.pay_time;//订单支付时间
						this.RefundDetailsTicketTime = orderDetails.dep_date;//出发时间
						this.RefundDetailsRefundStatus = orderDetails.refund_status_desc;//退款状态
						this.RefundDetailsRefundNo = orderDetails.refund_no;//退款单号
						this.RefundDetailsRefundInfo = orderDetails.refund_info;//退款详情
						this.RefundDetailsCancelReason = orderDetails.cancel_reason;//取消原因
					}else{
						this.$message.error(res.data.msg)
					}
				})
			},
			//get乘机人信息
			getPassengerInformationData(){
				this.passengersLoading = true;
				let orderId = {
					order_id:this.row.id,
				};
				getPassengerInformationList(orderId).then(res=>{
					this.passengersLoading = false;
					if(res.data.code == 200){
						this.PassengerInformationData = res.data.data.ticketList;
					}else{
						this.$message.error(res.data.msg);
					}
				})
			},
			//get客服信息记录
			getPassengerInformation(){
				let getNformationSubmissionData = {
					order_code:this.row.order_code,
					order_id:this.row.id,
				};
				getNformationSubmission(getNformationSubmissionData).then(res=>{
					if(res.data.code == 200){
						this.PassengerInformationList = res.data.data;
					}else{
						this.$message.error(res.data.msg)
					}

				})
			},
			//订单详情客服信息提交
			serviceInformationSubmission(){
				if(this.ordertExtarea == ''){
					return this.$message.error('请输入客服信息');
				}
				console.log(this.ordertExtarea);
				const loading = this.$loading({
					lock: true,
					text: '信息提交中，请稍后。。。',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				let setRecordServiceData = {
					admin_id: JSON.parse(localStorage.getItem('userInfo')).adminUserId,//客服id  后台登录人员ID
					name: JSON.parse(localStorage.getItem('userInfo')).adminUserName,//	客服人员name
					member_id:this.row.member_id,//会员ID
					order_code:this.row.order_code,//订单号
					mobile:this.row.mobile,//会员手机号
					desc:this.ordertExtarea,//描述
					order_id:String(this.row.id)//订单号ID
				};
				setrecordService(setRecordServiceData).then(res=>{
					setTimeout(() => {
						loading.close();
					}, 2000);
					if(res.data.code == 200){
						this.$message.success(res.data.msg);
						this.ordertExtarea = '';//清空客服信息
						this.getPassengerInformation();//更新客服信息数据
					}else{
						this.$message.error(res.data.message);
					}
				})
			},
			//订单详情退款按钮
			serviceInformationSubmissionBtn(){
				console.log(this.row);
				const loading = this.$loading({
					lock: true,
					text: '退票提交中，请稍后。。。',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				let userId = JSON.parse(localStorage.getItem('userInfo')).adminUserId;
				let orderListTicketConfirmationdata = {
					id: this.row.id,
					order_status_type: 1,
					orderNo: this.row.order_code,
					channel_id: this.row.channel_id,
					admin_id: userId
				}
				orderlistTicketConfirmation(orderListTicketConfirmationdata).then(res=>{
					loading.close();
					if(res.data.code == 200){
						// this.$message.success(res.data.msg);
						this.$message.success('退款成功');
					}else{
						this.$message.error(res.data.msg);
					}
				})
			},
		}
	}
</script>

<style scoped>
	.app-container{
		background-color:#f0f2f4;
	}
	.clearfix {
		&:after {
			 visibility: hidden;
			 display: block;
			 font-size: 0;
			 content: " ";
			 clear: both;
			 height: 0;
		 }
	}
	.detail .title{
		font-size: 18px;
		font-weight: 800;
		margin-bottom: 10px;
	}
	.details .list{
		display: flex;
		align-items: center;
		height: 40px;
	}
	.details .list p{
		width: 200px;
		text-align: right;
		margin-right: 20px;
		font-weight: 600;
	}
	.floatRight{
		float: right;
		margin: 20px;
	}
</style>
