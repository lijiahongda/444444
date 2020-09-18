<template>
	<section class="app-container">
		<div class="clearfix">
			<div style="margin-bottom:20px;">
				<router-link :to="{path:'/planeTickets/order',query:{type:3}}">
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
					<p>退票状态：</p>
					<span>{{RefundDetailsTicketNumber || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>三方退款状态：</p>
					<span>{{RefundDetailsOrderStatus || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>订单总价：</p>
					<span>{{RefundDetailsOrderTotalPrice || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>退款金额：</p>
					<span>{{RefundDetailsPaymentChannel || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>支付渠道：</p>
					<span>{{RefundDetailsOrderCreationTime || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>订单创建时间：</p>
					<span>{{RefundDetailsOrderPayTime || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>支付时间：</p>
					<span>{{RefundDetailsOrderPayTime1 | dateFormat}}</span>
				</div>
				<div class="list">
					<p>出票时间：</p>
					<span>{{RefundDetailsTicketTime || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>退票申请时间：</p>
					<span>{{RefundDetailsOrderPayTime2 || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>退票时间：</p>
					<span>{{RefundDetailsOrderPayTime3 || '暂无数据'}}</span>
				</div>
				<div class="list" v-if="showRefundDataBtn">
					<p>退票备注：</p>
					<span>
						<el-input
							type="textarea"
							:autosize="{ minRows: 2, maxRows: 4}"
							style="width: 500px"
							placeholder="请输入退票备注"
							v-model="RefundDetailsNote">
						</el-input>
					</span>
				</div>
			</div>
			<div class="floatRight" v-if="showRefundDataBtn">
				<el-button type="primary" @click="TicketConfirmation()">确认退款</el-button>
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
		getRefundData
	} from '@/api/financialCps' // 接口
    export default {
        name: "RefundListDetail",
		data(){
        	return {
				orderDetailLoading:false,//列表详情loading
				RefundDetailsOrder:'',//订单详情弹窗订单编号
				RefundDetailsPaymentOrder:'',//订单详情弹窗支付单号
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
				RefundDetailsNote:'',//退票备注
				RefundDetailsOrderPayTime1:'',//支付时间
				RefundDetailsOrderPayTime2:'',//退票申请时间
				RefundDetailsOrderPayTime3:'',//退票时间
				showRefundDataBtn:false,//确认退票显示退票备注和按钮
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
				this.getRefundListEdit(this.row.id);//退票订单数据详情
			}
			if(this.type == 1){
				this.showRefundDataBtn = false;//退票详情不显示退票备注和按钮
			}else if(this.type == 2){
				this.showRefundDataBtn = true;//确认退票显示退票备注和按钮
			}
		},
		mounted() {

		},
		methods:{
        	//退票详情
			getRefundListEdit(orderId){
				this.orderDetailLoading = true;
				let _this = this;
				this.orderId = orderId;
				let getRefundListEditDate = {
					order_id:orderId
				};
				getRefundData(getRefundListEditDate).then(res=>{
					this.orderDetailLoading = false;
					let orderDetails = res.data.data.orderInfo;
					if(res.data.code == 200){
						this.RefundDetailsOrder = orderDetails.external_no;//订单详情弹窗订单编号
						this.RefundDetailsPaymentOrder = orderDetails.pay_number;//订单详情弹窗支付单号
						this.RefundDetailsAirlines = orderDetails.air_company_name;//航空公司
						this.RefundDetailsFlightNo = orderDetails.flight_no;//航班号
						this.RefundDetailsDepartureCity = orderDetails.dep_city;//出发城市
						this.RefundDetailsArriveCity = orderDetails.arr_city;//到达城市
						this.RefundDetailsContactName = orderDetails.name;//联系人姓名
						this.RefundDetailsContactPhone = orderDetails.phone;//联系人电话
						this.RefundDetailsTicketNumber = orderDetails.order_status_desc;//退票状态
						this.RefundDetailsOrderStatus = orderDetails.flight_refund_price_status;//三方退款状态
						this.RefundDetailsOrderTotalPrice = orderDetails.total_price/100;//订单总价
						this.RefundDetailsPaymentChannel =orderDetails.flight_refund_price/100;//退款金额
						this.RefundDetailsOrderCreationTime = orderDetails.pay_type_desc;//支付渠道
						this.RefundDetailsOrderPayTime = orderDetails.create_time;//订单创建时间
						this.RefundDetailsOrderPayTime1 = orderDetails.pay_time;// 支付时间
						this.RefundDetailsTicketTime = orderDetails.end_issue_time;//出票时间
						this.RefundDetailsOrderPayTime2 = orderDetails.flight_refund_create_time;//退票申请时间
						this.RefundDetailsOrderPayTime3 = orderDetails.flight_refund_create_time;//退票申请时间

						this.RefundDetailsNote = orderDetails.refund_info;//退票备注

						this.channel_id =orderDetails.channel_id

						//判断是否显示退款按钮
						if(orderDetails.order_status == 8 || orderDetails.order_status == 13){
							this.showBtn = true;
						}else{
							this.showBtn = false;
						}
					}else{
						this.$message.error(res.data.msg)
					}
				})
			},
			//确认退票
			TicketConfirmation() {
				const loading = this.$loading({
					lock: true,
					text: '退票中，请稍后。。。',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.3)'
				});
				let userId = JSON.parse(localStorage.getItem('userInfo')).adminUserId;
				let TickeConfirmationData = {
					"order_id": this.row.id,
					"order_status_type": 1,
					"ticket_id": this.row.ticket_id,
					"channel_id": this.channel_id,
					"refund_info": this.RefundDetailsNote,
					"admin_id": userId
				};
				console.log(TickeConfirmationData);
				TicketConfirmation(TickeConfirmationData).then(res => {
					setTimeout(() => {
						loading.close();
					}, 2000);
					if (res.data.code === 200) {
						this.$message.success(res.data.msg)
					} else {
						this.$message.error(res.data.msg)
					}
				})
				this.dialogFormVisible = false;
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
